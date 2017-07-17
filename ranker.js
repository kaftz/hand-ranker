exports.bestHand = bestHand;

// returns best hand, type, value
function bestHand(cards) {
    cards = cards.sort((a, b) => a.v - b.v);
    var hand, type, val;

    hand = getStraightFlush(cards);
    if (hand) return { hand: hand, type: 'straight flush', val: 8 };

    hand = getNOfKindHand(cards, 4);
    if (hand) return { hand: hand, type: 'four of a kind', val: 7 };

    hand = getFullHouse(cards);
    if (hand) return { hand: hand, type: 'full house', val: 6 };
    
    hand = getFlush(cards);
    if (hand) return { hand: hand, type: 'flush', val: 5 };

    hand = getStraight(cards);
    if (hand) return { hand: hand, type: 'straight', val: 4 };

    hand = getNOfKindHand(cards, 3);
    if (hand) return { hand: hand, type: 'three of a kind', val: 3 };

    hand = getTwoPair(cards);
    if (hand) return { hand: hand, type: 'two pair', val: 2 };

    hand = getNOfKindHand(cards, 2);
    if (hand) return { hand: hand, type: 'two of a kind', val: 1 };

    hand = [];
    if (cards[0].v == 1) hand.push(cards.shift());
    hand = hand.concat(cards.slice(hand.length - 5).reverse());
    return { hand: hand, type: 'high card', val: 0 };
}

function getFlush(cards) {
    if (cards.length < 5) return null;
    var count = { s: 0, h: 0, c: 0, d: 0 };
    for (var i = 0; i < cards.length; i++) count[cards[i].s]++;
    for (var key in count) {
        if (count[key] > 4) {
            var suited = cards.filter(c => c.s == key);
            if (suited[0].v == 1) suited = suited.concat(suited[0]).slice(1);
            return suited.slice(-5);
        }
    }
    return null;
}

// suit optional
function getStraight(cards, suit) {
    if (suit) cards = cards.filter(c => c.s == suit);
    if (cards.length < 5) return null;
    if (cards[0].v == 1) {
        cards = cards.concat(clone(cards[0]));
        cards[cards.length - 1].v = 14;
    }
    var series = [cards[cards.length - 1]];
    var prev = cards[cards.length - 1];
    for (var i = cards.length - 2; i >= 0; i--) {
        var current = cards[i];
        if (current.v == prev.v) continue;
        if (current.v == prev.v - 1) {
            series.unshift(current);
            if (series.length == 5) {
                if (series[4].v == 14) series[4].v = 1;
                return series;
            }
        } else {
            series = [current];
        }
        prev = current;
    }
    return null;
}

function getStraightFlush(cards) {
    var flush = getFlush(cards);
    if (!flush) return null;
    return getStraight(cards, flush[0].s);
}

function getNOfKind(cards, n) {
    if (n < 2 || n > 4) throw new Error('invalid n');
    if (cards.length < n) return null;
    cards = clone(cards);
    cards.forEach(c => { if (c.v == 1) c.v = 14; });
    cards = cards.sort((a, b) => a.v - b.v);
    var prev = cards[cards.length - 1];
    var count = 1;
    for (var i = cards.length - 2; i >= 0; i--) {
        var current = cards[i];
        if (current.v == prev.v) {
            count++;
            if (count == n) {
                var hand = cards.filter(c => c.v == prev.v);
                hand.forEach(c => { if (c.v == 14) c.v = 1; });
                return hand;
            }
        } else {
            prev = current;
            count = 1;
        }
    }
    return null;
}

function getNOfKindHand(cards, n) {
    if (cards.length < 5) return null;
    var hand = getNOfKind(cards, n);
    if (!hand) return null;
    var remaining = cards.filter(c => c.v != hand[0].v);
    if (remaining[0].v == 1) hand.push(remaining.shift());
    hand = hand.concat(remaining.slice(hand.length - 5).reverse());
    return hand;
}

function getFullHouse(cards) {
    var three = getNOfKind(cards, 3);
    if (!three) return null;
    var two = getNOfKind(cards.filter(c => c.v != three[0].v), 2);
    if (!two) return null;
    return three.concat(two);
}

function getTwoPair(cards) {
    if (cards.length < 5) return null;
    var firstTwo = getNOfKind(cards, 2);
    if (!firstTwo) return null;
    var secondTwo = getNOfKind(cards.filter(c => c.v != firstTwo[0].v), 2);
    if (!secondTwo) return null;
    var hand = firstTwo.concat(secondTwo);
    var remaining = cards.filter(c => c.v != firstTwo[0].v && c.v != secondTwo[0].v);
    hand.push(remaining[0].v == 1 ? remaining[0] : remaining[remaining.length - 1]);
    return hand;
}


// utils
function clone(o) {
    return JSON.parse(JSON.stringify(o));
}
