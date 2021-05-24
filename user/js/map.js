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
            poiArr[k] = i + "," + j + ",6,0,1," + this.map[i][j];
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
      return 0;
    }

    setMap(m) {
      this.map = [];
      this.map = m;
    }  

    getMap() {
      return this.mapToString();
    }

    getMapDeepCopy(){
      return this.map.slice(0);
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

    getMapForServer() {
      let strMap = "";
      for (let i = 0; i < this.getR(); i++) {
        for (let j = 0; j < this.getC(); j++) {
          switch(this.map[i][j]){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
              strMap += this.map[i][j];
              break;
            default:
              strMap+="6";
          }
        }
      }
      return strMap;
    }

    getPoisWellMapped() {
      let pois={}
      for (let i = 0; i < this.getR(); i++) {
        for (let j = 0; j < this.getC(); j++) {
          switch(this.map[i][j]){
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
              //do nothing, not a POI
              break;
            default:
              let name=this.map[i][j]
              pois[name]={
                "name": name,
                "x": i,
                "y": j
              }
          }
        }
      }
      return pois;
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
        if (this.map.length - i > 1) {
          out += ", "
        }
      }
      out += "]";
      return out;
    }
  }
  
  module.exports = Map;