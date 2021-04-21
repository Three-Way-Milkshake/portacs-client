class POIlist{
    poi = ["AB", "sf", "sdf"];
    getListString(){
      return this.poi;
    }

    addPOI(p){
        this.poi.push(p);
    }
    
}
module.exports = POIlist;