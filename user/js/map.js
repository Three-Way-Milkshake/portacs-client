class Map {
    /*
    0 = spazio non transitabile
    1 = spazio transitabile
    2 = ^
    3 = >
    4 = v
    5 = <
    6 = POI
    */
    map = [];
  
    setMap(m) {
      this.map = m;
      console.log(this.map);
    }

    getMap() {
      console.log(this.map);
      return this.mapToString();
    }
    
    createMap(r, c, seq) {
      let counter=0;
      for (let i = 0; i < r; i++) {
        this.map[i] = [];
        for (let j = 0; j < c; j++) {
          this.map[i][j] = seq[counter++];
        }
      }
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
      out += "]";
      return out;
    }
  }
  
  module.exports = Map;