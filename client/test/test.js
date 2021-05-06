const POIlist = require('./../src/test_js/poiList');

let assert = require('assert');

//------------------------ CLASS POILIST ------------------------//
describe('POIlist', function() {

  describe('#addPOI(x, y, t, id, name)', function() {
      it('should inizialize two POIs', function() {
          let p = new POIlist();
          p.addPOI(0, 1, 2, 0, 'poi0');
          p.addPOI(1, 1, 2, 1, 'poi1');
          assert.deepStrictEqual(p.x, [0, 1]);
          assert.deepStrictEqual(p.y, [1, 1]);
          assert.deepStrictEqual(p.t, [2, 2]);
          assert.deepStrictEqual(p.id, [0, 1]);
          assert.deepStrictEqual(p.name, ['poi0','poi1']);
      });
  });

  describe('#getListMap()', function() {
      it('should return two POIs', function() {
          let p = new POIlist();
          p.addPOI(0, 1, 2, 0, 'poi0');
          p.addPOI(1, 1, 2, 1, 'poi1');
          assert.strictEqual(p.getListMap(), '0,1,2,0,poi0;1,1,2,1,poi1;');
      });
  });
  
/*
  describe('#getListString()', function() {
      it('should return two POIs (type, id, name)', function() {
          let p = new POIlist();
          p.addPOI(0, 1, 2, 0, 'poi0');
          p.addPOI(1, 1, 2, 1, 'poi1');
          assert.deepStrictEqual(p.getListString(), ['2,0,poi0', '2,1,poi1']);
      });
  });
*/
  describe('#delete()', function() {
      it('should return nothing', function() {
          let p = new POIlist();
          p.addPOI(0, 1, 2, 0, 'poi0');
          p.addPOI(1, 1, 2, 1, 'poi1');
          p.delete();
          assert.deepStrictEqual(p.x, []);
          assert.deepStrictEqual(p.y, []);
          assert.deepStrictEqual(p.t, []);
          assert.deepStrictEqual(p.id, []);
          assert.deepStrictEqual(p.name, []);
      });
  });
});