class ListsTask {
    ass = ["1,ab,cd,efe", "2,ad,ef,re", "3,sdf,sd,fd"];
    notAss = ["a,c,v,d", "s,a"];

    getAss(){
        let out = [];
        for (let i = 0; i < this.ass.length; i++){
            out += "[";
            out += this.ass[i];
            out += "]"
        }
        return out;
    }

    getNotAss(){
        let out = [];
        for (let i = 0; i < this.notAss.length; i++){
            out += this.notAss[i] + ";"
        }
        return out
    }
}
module.exports = ListsTask;