var assert = require('assert');
var ranker = require('..');

var straight_flush = [{s:'h',v:1},{s:'s',v:13},{s:'h',v:13},{s:'h',v:11},{s:'h',v:10},{s:'h',v:12},{s:'h',v:9}];
var four_of_a_kind = [{s:'h',v:1},{s:'s',v:2},{s:'h',v:2},{s:'h',v:11},{s:'c',v:2},{s:'d',v:2},{s:'h',v:9}];
var full_house = [{s:'h',v:2},{s:'s',v:5},{s:'h',v:5},{s:'h',v:11},{s:'c',v:2},{s:'d',v:2},{s:'s',v:11}];
var flush = [{s:'h',v:4},{s:'s',v:5},{s:'h',v:10},{s:'h',v:11},{s:'h',v:2},{s:'s',v:6},{s:'h',v:7}];
var straight = [{s:'c',v:4},{s:'s',v:5},{s:'c',v:3},{s:'h',v:11},{s:'h',v:2},{s:'s',v:6},{s:'h',v:7}];
var straight_2 = [{s:'c',v:1},{s:'s',v:10},{s:'c',v:13},{s:'h',v:11},{s:'h',v:9},{s:'s',v:12},{s:'h',v:8}];
var three_of_a_kind = [{s:'c',v:6},{s:'s',v:6},{s:'c',v:3},{s:'h',v:11},{s:'d',v:2},{s:'d',v:6},{s:'h',v:7}];
var two_pair = [{s:'h',v:9},{s:'s',v:5},{s:'h',v:4},{s:'h',v:11},{s:'c',v:2},{s:'d',v:2},{s:'s',v:11}];

describe('bestHand()', function() {
    it('should return the best possible hand type', function() {
        assert.equal('straight flush', ranker.bestHand(straight_flush).type);
        assert.equal('four of a kind', ranker.bestHand(four_of_a_kind).type);
        assert.equal('full house', ranker.bestHand(full_house).type);
        assert.equal('flush', ranker.bestHand(flush).type);
        assert.equal('straight', ranker.bestHand(straight).type);
        assert.equal('three of a kind', ranker.bestHand(three_of_a_kind).type);
        assert.equal('two pair', ranker.bestHand(two_pair).type);
    });

    it('should return the best possible straight', function() {
        assert.equal(7, ranker.bestHand(straight).hand.pop().v);
        assert.equal(1, ranker.bestHand(straight_2).hand.pop().v);
    });
});
