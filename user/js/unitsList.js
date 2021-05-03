class UnitsList{
    listU = [];

    delete() {
        this.listU = [];
    }   
    add(s) {
        this.listU.push(s);
    }
    getListUnit() {
        return this.listU;
    }
    
    
}
module.exports = UnitsList;