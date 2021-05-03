class POIlist{
    id = [];
    y = [];
    x = [];
    t = [];
    name = [];
    getListString(){
      return this.id; 
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
    
}
module.exports = POIlist;