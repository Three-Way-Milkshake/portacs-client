class CommandsToJava {
    contenitore = [];

    constructor() {}
    //
    //---------------------------------------------------------------
    //["param:valore"; "param:valore"]
    //---------------------------------------------------------------
    //"COMANDO,var,var;COMANDO2,VAR;"
    
    
    aggiungiComando(parametro) { 
        this.contenitore.push(parametro.toString());
    }

    getContainer() {
        let out = this.contenitore.length < 1? "" : this.contenitore[0];
        for (let i = 1; i < this.contenitore.length; i++) {
            out += ";" + this.contenitore[i];
        }
        return out;
    }

    getDatiESvuota() {
        let str = this.getContainer();
        delete this.contenitore;
        this.contenitore = [];
        return str;
    }
}
module.exports = CommandsToJava;