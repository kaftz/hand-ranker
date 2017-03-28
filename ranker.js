exports.bestHand = bestHand;

// returns best hand, hand type, value
function bestHand (cards) {
    // order cards by value
    cards = cards.sort(function (a, b) { return a.v - b.v; });

    var hand, type, val;

    if (hand = isStraightFlush(cards)) {
        type = 'straight flush';
        val = 8;
    } else if (hand = isXOfKind(cards, 4)) {
        type = 'four of a kind';
        val = 7;
    } else if (hand = isFullHouse(cards)) {
        type = 'full house';
        val = 6;
    } else if (hand = isFlush(cards)) {
        type = 'flush';
        val = 5;
    } else if (hand = isStraight(cards)) {
        type = 'straight';
        val = 4;
    } else if (hand = isXOfKind(cards, 3)) {
        type = 'three of a kind';
        val = 3;
    } else if (hand = isTwoPair(cards)) {
        type = 'two pair';
        val = 2;
    } else if (hand = isXOfKind(cards, 2)) {
        type = 'two of a kind';
        val = 1;
    } else {
        hand = cards.slice(-5);
        if (cards[0] == 1) hand = hand.slice(1).concat(cards[0]);
        type = 'high card';
        val = 0;
    }

    return {
        hand: hand,
        type: type,
        val: val
    };
}

function isFlush (cards) {
    if (cards.length < 5) return false;

    var isFlush = false;
    var count = { s: 0, h: 0, c: 0, d: 0 };
    for (var i = 0; i < cards.length; i++) count[cards[i].s]++;
    for (var key in count) if (count[key] > 4) {
        var suited = cards.filter(function (c) { return c.s == key; });

        if (suited[0].v == 1) suited = suited.concat(suited[0]).slice(1);
        var isFlush = suited.slice(-5);
        break;
    }

    return isFlush;
}

// suit optional
function isStraight (cards, suit) {
    if (suit) cards = cards.filter(function (card) { return card.s == suit; });
    if (cards.length < 5) return false;

    var isStraight = false;
    var length = 1;
    var bestLength = 1;
    var start = 0;
    var bestStart = 0;
    var last = cards[start].v;
    var i = 1;

    while (i < cards.length) {
        var current = cards[i].v;
        if (current != last) {
		    if (current != last + 1) {
              start = i;
              length = 1;
            } else {
                length++;
                if (length > bestLength) {
                    bestStart = start;
                    bestLength = length;
                }
            }		
	    }
        last = cards[i].v;
        i++;
    }

    // add ace
    if (bestLength >= 4 && cards[bestStart + bestLength - 1].v == 13 && cards[0].v == 1) {
        isStraight = cards.slice(-4).concat(cards[0]);
    } else if (bestLength > 4) {
        isStraight = cards.slice(bestStart + bestLength - 5, bestStart + bestLength);
    }

    return isStraight;
}

function isStraightFlush (cards) {
    var flush = isFlush(cards);
    return flush ? isStraight(cards, flush[0].s) : false;
}

// returns greatest possible set of x
function containsXOfKind (cards, x, filter) {
    if (filter) cards = cards.filter(filter);
    if (cards.length < x) return false;

    var xOfKind = x == 1 ? cards[0].v : false;
    var count = 1;
    var prevVal = cards[0].v;

    for (var i = 1; i < cards.length; i++) {
        if (cards[i].v == prevVal) {
            count++;
        } else {
            count = 1;
            prevVal = cards[i].v;
        }

        if (count >= x && xOfKind != cards[i].v && xOfKind != 1) xOfKind = cards[i].v;
    }

    return xOfKind;
}

function highCard (cards, filter) {
    if (filter) cards = cards.filter(filter);
    if (cards.length && cards[0] == 1) return cards[0];
    return cards.length ? cards[cards.length - 1] : null;
}

function isXOfKind (cards, x) {
    var isXOfKind = false;
    var matchX = containsXOfKind(cards, x);

    if (matchX) {
        isXOfKind = cards.filter(function (c) { return c.v == matchX; });
        var added = {};
        added[matchX] = true;

        while (isXOfKind.length < 5) {
            var nextCard = highCard(cards, function (c) { return !added[c.v]; });
            isXOfKind.unshift(nextCard);
            added[nextCard.v] = true;
        }
    }

    return isXOfKind;
}

function isFullHouse (cards) {
    var isFullHouse = false;
    var matchThree = containsXOfKind(cards, 3);

    if (matchThree) {
        var matchTwo = containsXOfKind(cards, 2, function (c) { return c.v != matchThree; });
        
        if (matchTwo) {
            // not checking for matching four
            isFullHouse = cards.filter(function (c) { return c.v == matchTwo; }).slice(-2);
            isFullHouse = isFullHouse.concat(cards.filter(function (c) { return c.v == matchThree; }));
        }
    }

    return isFullHouse;
}

function isTwoPair (cards) {
    var isTwoPair = false
    var matchTwo = containsXOfKind(cards, 2);

    if (matchTwo) {
        var matchTwoMore = containsXOfKind(cards, 2, function (c) { return c.v != matchTwo; });

        if (matchTwoMore) {
            // not checking for matching three or more
            isTwoPair = cards.filter(function (c) { return c.v == matchTwo || c.v == matchTwoMore; });
            isTwoPair.unshift(highCard(cards, function (c) { return c.v != matchTwo && c.v != matchTwoMore; }));
        }
    }

    return isTwoPair;
}
