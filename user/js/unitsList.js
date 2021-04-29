class UnitsList{
    listU = ["0000,token1", "0001,token2", "0002,token3"];

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