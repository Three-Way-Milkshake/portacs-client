class ListManager{
    listM = ["patrick,jane", "red,john", "teresa,lisbon"];    
    add(s) {
        this.listM.push(s);
    }
/*
    setlistM(l){
        this.listM = l;
    }
*/
}
module.exports = ListManager;