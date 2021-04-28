class ListManager{
    listM = ["patrick,jane,0000", "red,john,000005", "teresa,lisbon,00001"];

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