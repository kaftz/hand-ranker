var r = require('./ranker.js');

var a = r.cardsFactory(1).sort(function (a, b) { return a.v - b.v; });
console.log(r.isFlush(a));

a = r.cardsFactory(61).sort(function (a, b) { return a.v - b.v; });
console.log(r.isTwoPair(a));

a = r.cardsFactory(62).sort(function (a, b) { return a.v - b.v; });
console.log(r.isTwoPair(a));

a = r.cardsFactory(7).sort(function (a, b) { return a.v - b.v; });
console.log(r.isFullHouse(a));

console.log('*****');

a = r.cardsFactory(6).sort(function (a, b) { return a.v - b.v; });
console.log(r.isXOfKind(a, 4));

a = r.cardsFactory(1).sort(function (a, b) { return a.v - b.v; });
console.log(r.isXOfKind(a, 3));

a = r.cardsFactory(81).sort(function (a, b) { return a.v - b.v; });
console.log(r.isXOfKind(a, 2));

a = r.cardsFactory(82).sort(function (a, b) { return a.v - b.v; });
console.log(r.isXOfKind(a, 3));
