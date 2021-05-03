class POIlist{
    id = ["ab", "cv", "sdf"];
    y = ["1","3","3"];
    x = ["1","3","4"];
    t = ["s","s","s"];
    name = [];
    getListString(){
      return this.poi;
    }
    delete(){
      this.poi = [];
      this.y = [];
      this.x = [];
      this.t = [];
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
        str[i] = this.x[i] + "," + this.y[i] + "," + this.t[i] + "," + this.id[i] + ","+ this.name[i];
      }
      return str;
    }
    
}
module.exports = POIlist;