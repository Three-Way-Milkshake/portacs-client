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

    getPOIonMap() {
      let poiArr = [];
      let k = 0;
      for (let i = 0; i < this.map.length; i++){
        for(let j = 0; j < this.map[i].length; j++) {
          if (isNaN(parseInt(this.map[i][j]))) {
            poiArr[k] = i + "," + j + ",6,1," + this.map[i][j];
            this.map[i][j] = "6";
            k++;
          }
        }
      }
      return poiArr;
    }

    getR() {
      return this.map.length;
    }

    getC() {
      if (this.map.length > 0) {
        return this.map[0].length;
      }
    }

    setMap(m) {
      this.map = [];
      this.map = m;
    }  

    getMap() {
      return this.mapToString();
    }
    
    createMap(r, c, seq) {
      let counter=0;
      for (let i = 0; i < r; i++) {
        this.map[i] = [];
        for (let j = 0; j < c; j++) {
          this.map[i][j] = seq[counter];
          counter++;
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