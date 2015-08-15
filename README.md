## hand-ranker

Returns the best possible 5-card poker hand from an array of N >=5 cards.

## installation

```
npm install hand-ranker
```

## usage

A card is represented by an object with properties 's' and 'v', where 's' describes the suit (s = spade, h = heart, c = club, d = diamond) and 'v' describes the value (1:ace - 13:king).

`bestHand(cards)` - returns a results object with the best 5-card hand (sorted), a string describing the hand, an integer hand value (8 - straight flush, 0 - high card)

```javascript
var ranker = require('hand-ranker');

var cards = [
  { s: 's', v: 10 },
  { s: 'c', v: 1 },
  { s: 's', v: 13 },
  { s: 's', v: 1 },
  { s: 'd', v: 1 },
  { s: 's', v: 12 },
  { s: 's', v: 11 }
];

var result = ranker.bestHand(cards);

/*
result:
{
  hand: [
    { s: 's', v: 10 },
    { s: 's', v: 11 },
    { s: 's', v: 12 },
    { s: 's', v: 13 },
    { s: 'c', v: 1 }
  ],
  type: 'straight flush',
  val: 8
}
*/
```

## license

MIT
