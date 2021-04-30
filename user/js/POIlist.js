class POIlist{
    poi = ["ab", "cv", "sdf"];
    y = ["1","3","3"];
    x = ["1","3","4"];
    t = ["s","s","s"];
    getListString(){
      return this.poi;
    }
    delete(){
      this.poi = [];
      this.y = [];
      this.x = [];
      this.t = [];
    }
    addPOI(x, y, t, id){
        this.poi.push(id);
        this.y.push(y);
        this.x.push(x);
        this.t.push(t);
    }
    getListMap(){
      let str = [];
      for (let i = 0; i < this.poi.length; i++) {
        str[i] = this.x[i] + "," + this.y[i] + "," + this.t[i] + "," + this.poi[i];
      }
      return str;
    }
    
}
module.exports = POIlist;