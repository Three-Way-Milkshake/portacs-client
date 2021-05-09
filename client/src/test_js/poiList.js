class POIlist{
    id = [];
    y = [];
    x = [];
    t = [];
    name = [];
    
    //Ma quando viene usato questo metodo?
    getListString(){
      return this.poi;
    }
    
    delete(){
      this.id = [];
      this.y = [];
      this.x = [];
      this.t = [];
      this.name = [];
    }
    getNameFromId(id) {
      for (let i = 0; i < this.id.length; i++) {
        if (id == this.id[i]) {
          return this.name[i]; 
        }
      }
      return "";
    }
    getPosfromId(id){
      for (let i = 0; i < this.id.length; i++) {
        if (id == this.id[i]) {
          return this.x[i]+ "," + this.y[i]; 
        }
      }
      return "";
    }
    addPOI(x, y, t, id, name){
        this.id.push(id);
        this.y.push(y);
        this.x.push(x);
        this.t.push(t);
        this.name.push(name);
    }
    getListMap(){
      let str = "";
      for (let i = 0; i < this.id.length; i++) {
        str +=  this.x[i] + "," + this.y[i] + "," + this.t[i] + "," + this.id[i] + ","+ this.name[i] + ";" ;
      }
      console.log(str);
      return str;
    }
    
}
module.exports = POIlist;