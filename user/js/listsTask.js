class ListsTask {
    ass = [];
    notAss = [/* "ciao" */];
    listJustAdded = "";
    
    
    getAss(){
        return this.ass;
    }

    getNotAss(){
        return this.notAss;
    }

    addTemporaryList(l){
        this.listJustAdded = l;
    }

    addListnotAss(id) {
        this.notAss.push(id + "," + this.listJustAdded);
        this.listJustAdded = "";
    }

    addListAss(list) {
        this.ass.push(list);
    }

    removeList(id){
        let index = -1;
        for (let i = 0; i<this.notAss.length; i++){
            let tmp= this.notAss[i].split(",");
            if (tmp[0] == id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.notAss.splice(index, 1);
        }
    }

    remove(){
        this.ass = [];
    }

    
}
module.exports = ListsTask;