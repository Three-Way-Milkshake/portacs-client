class POIlist{
    id = [];
    y = [];
    x = [];
    t = [];
    name = [];

    getListString(){
      let str = [];
      for (let i = 0; i < this.id.length; i++) {
        str[i] = this.t[i] + "," + this.id[i] + "," + this.name[i];
      }
      return str;
    }

    turnIdToName(strArray) {
      let arr = []
      for (let k = 0; k < strArray.length; k++) {
        let tmp = String(strArray[k]).split(',');
        arr[k] = tmp[0]
        for (let l = 1; l < tmp.length; l++) {
          arr[k] += "," + this.getNameFromId(tmp[l]);
        }
      }
      return arr;
    }

    getNameFromId(id) {
      for (let i = 0; i < this.id.length; i++) {
        if (id == this.id[i]) {
          return this.name[i]; 
        }
      }
      return "";
    }
    
    delete(){
      this.id = [];
      this.y = [];
      this.x = [];
      this.t = [];
      this.name = [];
    }
    
    addPOI(x, y, t, id, name){
        this.id.push(id);
        this.y.push(y);
        this.x.push(x);
        this.t.push(t);
        this.name.push(name);
    }
    
    getListMap(){
      let str = [];
      for (let i = 0; i < this.id.length; i++) {
        str[i] = this.x[i] + "," + this.y[i] + "," + this.t[i] + "," + this.id[i] + "," + this.name[i];
      }
      return str;
    }
    
    getListForCell(){
      let str = [];
      for (let i = 0; i < this.id.length; i++) {
        str[i] = this.x[i] + "," + this.y[i] + ",6," + this.id[i] + "," + this.t[i] + "," + this.name[i];
      }
      return str;
    }
    
    contains(sth){
      return this.name.includes(sth)
    }
    
}
module.exports = POIlist;