const Map = require('./../js/map');
const ListManager = require('./../js/listManager');
const UserInformation = require('./../js/user-information');
const UnitsList = require('./../js/unitsList');
const CommandsToJava = require('./../js/commandsToJava');

let assert = require('assert');

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