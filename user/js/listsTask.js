class ListsTask {
    ass = ["unita1,0000,ab,cx,sd", "unita2,0001,ab,cx,sd", "unita3,0003,ab,cx,sd"];
    notAss = ["1, abc, df", "3, abc, df"];
    listJustAdded;
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
        this.listJustAdded = ""
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

    
}
module.exports = ListsTask;