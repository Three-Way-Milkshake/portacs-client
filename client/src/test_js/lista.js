class Lista {
    
    lista;
    constructor() {
      this.lista = [];
    }
  
    getLista() {
      return this.listaToString();
    }
    
    addPOI(p) {
      this.lista.push(p);
    }

    getFirstPOI() {
      return this.lista[0];
    }

    removeFirstPOI() {
      this.lista.shift();
      //aggiungere un return
    }
    
    listaToString() {
      let out = "";
      for (let i = 0; i < this.lista.length; i++) {
        out += this.lista[i];
      }
      return out += "";
    }
  }
  
  module.exports = Lista;
