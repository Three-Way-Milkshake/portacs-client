class Map {
    /*
    0 = spazio non transitabile
    1 = spazio transitabile
    2 = ^ yes
    3 = v nope >  
    4 = > nope v
    5 = < yes
    'character' = POI
    */
    map = [];
    
    row = 0;
    col = 0;
    
    constructor() {}
  
    setMap(m) {
      this.map = m;
      console.log(this.map);
    }

    getCell(x, y) {
      if (x < this.getCol() && y < this.getRow()) { 
        return this.map[x][y];
      }
      return '-1';
    }

    getMap() {
      return this.mapToString();
    }
    
    getRow() {
      return this.row;
    }
   
    getCol() {
      return this.col;
    }
    
    createMap(r, c, seq) {
      this.map = [];
      this.row = parseInt(r);
      this.col = parseInt(c);
      let counter=0;
      for (let i = 0; i < r; i++) {
        this.map[i] = [];
        for (let j = 0; j < c; j++) {
          //this.map[i][j] = seq[i*r + j];
          this.map[i][j] = seq[counter++];
        }
      }
      console.log();
    }
    
    mapToString() { //per angular
      let out = "[";
      for (let i = 0; i < this.map.length; i++) {
        out += "[";
        for (let j = 0; j < this.map[i].length; j++) {
          out += this.map[i][j];
          if (this.map[i].length - j > 1) {
            out += ", ";
          }
        }
        out += "]";
        if (this.map.length - i > 0) {
          out += ", "
        }
      }
      return (out += "]");
    }
  }
  
  module.exports = Map;
