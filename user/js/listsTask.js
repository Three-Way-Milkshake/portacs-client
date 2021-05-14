class ListsTask {
    ass = [];
    notAss = [];
    listJustAdded = "";
    
    
    
    getAss(){
        return this.ass;
    }

    getNotAss(){
        return this.notAss;
    }

    removeListNotAss(list) {
        // idMuletto, idPOI, idPOI, idPOI, ....
        if (typeof list !== 'undefined') {
            let tmpStr = list.split(',');
            for (let j = 0; j < this.notAss.length; j++) {
                // id, [tipo, idPOI, nome], [tipo, idPOI, nome], ...
                let tmpNAss = this.notAss[j].split(',');
                let c = 0;
                for (let k = 1, i = 2; i < tmpNAss.length && k < tmpStr.length; i+=3, k++) {
                    if (tmpNAss[i] == tmpStr[k]) {
                        c++;
                    }
                }
                if (c == (tmpStr.length-1) && c != 0) {
                    this.notAss.splice(j, 1);
                    break;
                }
            }
        }
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