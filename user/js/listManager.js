class ListManager{
    listM = ["0000,patrick,jane", "0001,red,john", "0002,teresa,lisbon"];

    delete() {
        this.listM = [];
    }   
    add(s) {
        this.listM.push(s);
    }
    getListManager() {
        return this.listM;
    }
    
}
module.exports = ListManager;