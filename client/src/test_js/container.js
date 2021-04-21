class Container {
    contenitore = [];

    constructor() {}
    //
    //---------------------------------------------------------------
    //["param:valore"; "param:valore"]
    //---------------------------------------------------------------
    //"COMANDO,var,var;COMANDO2,VAR;"
    //"POS,X,Y,DIR;POS,X,Y,DIR;POS,X,Y,DIR;POS,X,Y,DIR;POS,X,Y,DIR;"
    //STOP,2;
    //START;
    //PATH,M,M,R,M,M,L,M,M //prossima task
    //MAP,4,8,102410z0101010c020010b10a

    
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

    getDatiESvuota(posizione) {
        this.contenitore.push(posizione.toString());
        let str = this.getContainer();
        delete this.contenitore;
        this.contenitore = [];
        return str;
    }
}
module.exports = Container;



/*
comand,x,y,z;command,i,j;

*/
