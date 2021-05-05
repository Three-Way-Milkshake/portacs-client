class ListManager{
    listM = [/*"0000,patrick,jane", "0001,red,john", "0002,teresa,lisbon"*/];

    delete() {
        this.listM = [];
    }   
    add(s) {
        this.listM.push(s);
    }
    getListManager() {
        return this.listM;
    }

    removeOne(id) {
        let index = -1;
        for (let i = 0; i<this.listM.length; i++){
            let tmp= this.listM[i].split(",");
            if (tmp[0] == id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.listM.splice(index, 1);
        }
    }
    
}
module.exports = ListManager;