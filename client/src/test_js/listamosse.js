class Listamosse {

    /* serve per spostare il muletto
        ad ogni mossa si aggiorna la mappa cambiando il muletto
    */
    moves = [];

    createMosse(seq){
        this.moves = [];
        for (let i = 0; i < seq.length; i++) {
            this.moves.push(seq[i]);
        }
    }

    deleteAllMoves() {
        this.moves=[];
    }

    getLastInsertMove() {
        return this.moves.pop();
    }
    
    isEmpty() {
        return (this.moves.length == 0 || this.moves === undefined);
    }

    getMove() {
        return this.moves.shift();
    }

    addMove(moves){
        this.moves.unshift(moves);
    }
}
module.exports = Listamosse;