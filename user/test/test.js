const CommandsToJava = require('./../js/commandsToJava');
const ListManager = require('./../js/listManager');
const ListsTask = require('./../js/listsTask');
const Map = require('./../js/map');
const POIlist = require('./../js/POIlist');
const UnitsList = require('./../js/unitsList');
const UserInformation = require('./../js/user-information');

let assert = require('assert');

//------------------------ CLASS COMMANDSTOJAVA ------------------------//
describe('CommandsToJava', function() {
    describe('#aggiungiComando(parametro)', function() {
        it('should insert a command', function() {
            let c = new CommandsToJava();
            c.aggiungiComando('CMD,0,1');
            assert.deepStrictEqual(c.contenitore, ['CMD,0,1']);
        });
        it('should return no one command', function() {
            let c = new CommandsToJava();
            c.aggiungiComando('');
            assert.deepStrictEqual(c.contenitore, ['']);
        });
    });

    describe('#getContainer()', function() {
      it('should return a list of commands', function() {
          let c = new CommandsToJava();
          c.aggiungiComando('CMD0,0,1');
          c.aggiungiComando('CMD1,1');
          c.aggiungiComando('CMD2,0,1,2');
          assert.strictEqual(c.getContainer(), 'CMD0,0,1;CMD1,1;CMD2,0,1,2');
      });      
    });

    describe('#getDatiESvuota()', function() {
      it('should return a list of commands and should delete the list', function() {
          let c = new CommandsToJava();
          c.aggiungiComando('CMD0,0,1');
          c.aggiungiComando('CMD1,1');
          c.aggiungiComando('CMD2,0,1,2');
          assert.strictEqual(c.getDatiESvuota(), 'CMD0,0,1;CMD1,1;CMD2,0,1,2');
          assert.deepStrictEqual(c.contenitore, []);
      });      
    });
});

//------------------------ CLASS LISTMANAGER ------------------------//
describe('ListManager', function() {

    describe('#getListManager()', function() {
        it('should return a list', function() {
            let l = new ListManager();
            l.add('00,A,A');
            l.add('01,B,B');
            assert.deepStrictEqual(l.getListManager(), ['00,A,A','01,B,B']);
        });
        it('should return empty list', function() {
            let l = new ListManager();
            assert.deepStrictEqual(l.getListManager(), []);
        });
    });

    describe('#add(s)', function() {
        it('should return 2 items', function() {
            let l = new ListManager();
            l.add('00,A,A');
            l.add('01,B,B');
            assert.deepStrictEqual(l.getListManager(), ['00,A,A','01,B,B']);
        });
        it('should return an empty item', function() {
            let l = new ListManager();
            l.add('');
            assert.deepStrictEqual(l.getListManager(), ['']);
        });
    });

    describe('#delete()', function() {
        it('should return 0 items', function() {
            let l = new ListManager();
            l.add('00,A,A');
            l.add('01,B,B');
            l.delete();
            assert.deepStrictEqual(l.getListManager(), []);
        });
    });

    describe('#removeOne(id)', function() {      
        it('should delete one item', function() {
            let l = new ListManager();
            l.add('00,A,A');
            l.add('01,B,B');
            l.removeOne('00');
            assert.deepStrictEqual(l.getListManager(), ['01,B,B']);
        });
        it('should not delete item', function() {
            let l = new ListManager();
            l.add('00,A,A');
            l.add('01,B,B');
            l.removeOne('02');
            assert.deepStrictEqual(l.getListManager(), ['00,A,A','01,B,B']);
        });
    });
});

//------------------------ CLASS LISTSTASK ------------------------//
describe('ListsTask', function() {

    describe('#getAss()', function() {
        it('should return an empty list ass', function() {
            let t = new ListsTask();
            assert.deepStrictEqual(t.getAss(), []);
        });
        it('should return a list with task ass', function() {
            let t = new ListsTask();
            t.addListAss('0,0,aaa');
            t.addListAss('1,1,bbb');
            assert.deepStrictEqual(t.getAss(), ['0,0,aaa','1,1,bbb']);
        });
    });

    describe('#getNotAss()', function() {
        it('should return an empty list not-ass', function() {
            let t = new ListsTask();
            assert.deepStrictEqual(t.getNotAss(), []);
        });
        it('should return a list with task not-ass', function() {
            let t = new ListsTask();
            t.addTemporaryList('ciao');
            t.addListnotAss('0');
            assert.deepStrictEqual(t.getNotAss(), ['0,ciao']);
        });
    });

    describe('#addListAss(list)', function() {
        it('should return an empty list with task ass', function() {
            let t = new ListsTask();
            t.addListAss('');
            t.addListAss('');
            assert.deepStrictEqual(t.ass, ['', '']);
        });
        it('should return a list with task ass', function() {
            let t = new ListsTask();
            t.addListAss('0,1,p1');
            t.addListAss('0,5,p5');
            t.addListAss('0,9,p9');
            assert.deepStrictEqual(t.ass, ['0,1,p1', '0,5,p5', '0,9,p9']);
        });
    });
   
    describe('#addListnotAss(id)', function() {
        it('should return an empty list with task not-ass', function() {
            let t = new ListsTask();
            t.addTemporaryList('');
            t.addListnotAss('');
            assert.deepStrictEqual(t.notAss, [',']);
        });
        it('should return a list with task not-ass', function() {
            let t = new ListsTask();
            t.addTemporaryList('try');
            t.addListnotAss('0');
            assert.deepStrictEqual(t.notAss, ['0,try']);
        });
    });

    describe('#addTemporaryList(l)', function() {
        it('should return an empty string with task to add in a temporary list', function() {
            let t = new ListsTask();
            t.addTemporaryList('');
            assert.strictEqual(t.listJustAdded, '');
        });
        it('should return a string with task to add in a temporary list', function() {
            let t = new ListsTask();
            t.addTemporaryList('try');
            assert.strictEqual(t.listJustAdded, 'try');
        });
    });

    describe('#remove()', function() {
        it('should return an empty list', function() {
            let t = new ListsTask();
            t.addListAss('0,5,p5');
            t.addListAss('0,9,p9');
            t.remove();
            assert.deepStrictEqual(t.ass, []);
        });
    });

    describe('#removeList(id)', function() {
        it('should return a list with one task', function() {
            let t = new ListsTask();
            t.addTemporaryList('3,p2');
            t.addListnotAss('0');
            t.addTemporaryList('9,p9')
            t.addListnotAss('1');
            t.removeList('0');
            assert.deepStrictEqual(t.notAss, ['1,9,p9']);
        });
        it('should return a list with one task', function() {
            let t = new ListsTask();
            t.addTemporaryList('3,p2');
            t.addListnotAss('0');
            t.addTemporaryList('9,p9')
            t.addListnotAss('1');
            t.removeList('3');
            assert.deepStrictEqual(t.notAss, ['0,3,p2','1,9,p9']);
        });
    });
});

//------------------------ CLASS MAP ------------------------//
describe('Map', function() { 
       
    describe('#getR()', function() {
      it('should return 2', function() {
            let m = new Map();
            let tmp = [['0','0','2'], ['1','1','3']];
            m.setMap(tmp);
            assert.strictEqual(m.getR(), 2);
      });
      it('should return 0', function() {
            let m = new Map();
            assert.strictEqual(m.getR(), 0);
      });
    });  

    describe('#getC()', function() {
      it('should return 3', function() {
            let m = new Map();
            let tmp = [['0','0','2'], ['1','1','3']];
            m.setMap(tmp);
            assert.strictEqual(m.getC(), 3);
        });
        it('should return 0', function() {
            let m = new Map();
            assert.strictEqual(m.getC(), 0);
        });      
    });   

    describe('#mapToString()', function() {
        it('should return map to string array', function() {
            let m = new Map();
            let tmp = [['0','0','2'], ['1','1','3']];
            m.setMap(tmp);
            assert.strictEqual(m.mapToString(), "[[0, 0, 2], [1, 1, 3]]");
        });
        it('should return empty map', function() {
            let m = new Map();
            assert.strictEqual(m.mapToString(), "[]");
        });
    });

    describe('#getMap()', function() {
        it('should return map to string array', function() {
            let m = new Map();
            let tmp = [['0','0','2'], ['1','1','3']];
            m.setMap(tmp);
            assert.strictEqual(m.getMap(), "[[0, 0, 2], [1, 1, 3]]");
        });
        it('should return empty map', function() {
            let m = new Map();
            assert.strictEqual(m.getMap(), "[]");
        });
      });
    
    describe('#getPoisWellMapped()', function() {
        it('should return poi on map', function() {
            let m = new Map();
            let tmp = [['0','0','aaa'], ['1','bbb','3']];
            m.setMap(tmp);
            assert.notDeepStrictEqual(m.getPoisWellMapped(), "{aaa: {name: 'aaa', x: 0, y: 2},bbb: {name: 'bbb', x: 1, y: 1}}");
        });
        it('should return empty structure', function() {
            let m = new Map();
            assert.deepStrictEqual(m.getPoisWellMapped(), {});
        });
    }); 

    describe('#getMapForServer()', function() {
        it('should transform map with poi on a map without poi', function() {
            let m = new Map();
            let tmp = [['0','0','aaa'], ['1','bbb','3']];
            m.setMap(tmp);
            assert.notDeepStrictEqual(m.getPoisWellMapped(), "006163");
        });
        it('should return empty map', function() {
            let m = new Map();
            assert.strictEqual(m.getMapForServer(), "");
        });
    });
    
    describe('#createMap(r, c, seq)', function() {
        it('should return map to string', function() {
            let m = new Map();
            m.createMap(2, 3, "002113");
            assert.strictEqual(m.mapToString(), "[[0, 0, 2], [1, 1, 3]]");
        });
        it('should return empty map', function() {
            let m = new Map();
            m.createMap(0, 0, "");
            assert.strictEqual(m.mapToString(), "[]");
        });
    });
    
    describe('#setMap(m)', function() {
        it('should return map to string', function() {
            let m = new Map();
            let tmp = [['0','0','2'], ['1','1','3']];
            m.setMap(tmp);
            assert.strictEqual(m.mapToString(), "[[0, 0, 2], [1, 1, 3]]");
        });
        it('should return empty map', function() {
            let m = new Map();
            let tmp = [];
            m.setMap(tmp);
            assert.strictEqual(m.mapToString(), "[]");
        });
    });
});

//------------------------ CLASS UNITSLIST ------------------------//
describe('UnitsList', function() {
    
    describe('#getListUnit()', function() {
        it('should return a list', function() {
            let ul = new UnitsList();
            ul.add('1234');
            ul.add('5678');
            assert.deepStrictEqual(ul.getListUnit(), ['1234','5678']);
        });
        it('should return empty information', function() {
            let ul = new UnitsList();
            ul.add('');
            ul.add('');
            assert.deepStrictEqual(ul.getListUnit(), ['','']);
        });
    });    
    
    describe('#add(s)', function() {
        it('should return a list', function() {
            let ul = new UnitsList();
            ul.add('1234');
            ul.add('5678');
            assert.deepStrictEqual(ul.listU, ['1234','5678']);
        });
        it('should return empty information', function() {
            let ul = new UnitsList();
            ul.add('');
            ul.add('');
            assert.deepStrictEqual(ul.listU, ['','']);
        });
    });

    describe('#delete()', function() {
        it('should return a empy list', function() {
            let ul = new UnitsList();
            ul.add('1234');
            ul.add('5678');
            ul.delete();
            assert.deepStrictEqual(ul.listU, []);
        });
    });

});


//------------------------ CLASS USERINFORMATION ------------------------//
describe('UserInformation', function() {

    describe('#getInformation()', function() {
        it('should return a list', function() {
            let u = new UserInformation();
            u.setId('0101');
            u.setInfo('Patrick','Jane');
            u.setPassword('redJohnIsLove');
            assert.strictEqual(u.getInformation(), 'Patrick,Jane,redJohnIsLove');
        });
        it('should return empty information', function() {
            let u = new UserInformation();
            assert.strictEqual(u.getInformation(), ',,');
        });
    });

    describe('#setId(id)', function() {
        it('should return an id', function() {
            let u = new UserInformation();
            u.setId('0101');
            assert.strictEqual(u.id, '0101');
        });
        it('should return empty id', function() {
            let u = new UserInformation();
            u.setId('');
            assert.strictEqual(u.id, '');
        });
    });

    describe('#setPassword(p)', function() {
        it('should return a password', function() {
            let u = new UserInformation();
            u.setPassword('redJohnIsLove');
            assert.strictEqual(u.password, 'redJohnIsLove');
        });
        it('should return empty password', function() {
            let u = new UserInformation();
            u.setPassword('');
            assert.strictEqual(u.password, '');
        });
    });

    describe('#setInfo(n, c)', function() {
        it('should return name and surname', function() {
            let u = new UserInformation();
            u.setInfo('Patrick','Jane');
            assert.strictEqual(u.getInformation(), 'Patrick,Jane,');
        });
        it('should return empty information', function() {
            let u = new UserInformation();
            u.setInfo('','');
            assert.strictEqual(u.getInformation(), ',,');
        });
    });
});

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
            assert.deepStrictEqual(p.getListMap(), ['0,1,2,0,poi0', '1,1,2,1,poi1']);
        });
    });
    
    describe('#getListForCell()', function() {
        it('should return two POIs with the cell type (number 6)', function() {
            let p = new POIlist();
            p.addPOI(0, 1, 2, 0, 'poi0');
            p.addPOI(1, 1, 2, 1, 'poi1');
            assert.deepStrictEqual(p.getListForCell(), ['0,1,6,0,2,poi0', '1,1,6,1,2,poi1']);
        });
    });

    describe('#getListString()', function() {
        it('should return two POIs (type, id, name)', function() {
            let p = new POIlist();
            p.addPOI(0, 1, 2, 0, 'poi0');
            p.addPOI(1, 1, 2, 1, 'poi1');
            assert.deepStrictEqual(p.getListString(), ['2,0,poi0', '2,1,poi1']);
        });
    });

    describe('#contains(sth)', function() {
        it('should return true', function() {
            let p = new POIlist();
            p.addPOI(0, 1, 2, 0, 'poi0');
            p.addPOI(1, 1, 2, 1, 'poi1');
            assert.ok(p.contains('poi1'));
        });
        it('should return false', function() {
            let p = new POIlist();
            p.addPOI(0, 1, 2, 0, 'poi0');
            p.addPOI(1, 1, 2, 1, 'poi1');
            assert.ok(!p.contains('poi2'));
        });
    });

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