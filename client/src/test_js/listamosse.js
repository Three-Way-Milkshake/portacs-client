class Listamosse {

    /* serve per spostare il muletto
        ad ogni mossa si aggiorna la mappa cambiando il muletto
    */
    moves = [];
    
    getMoves() {
        return this.moves;
    }
    createMosse(seq){
        this.moves = [];
        for (let i = 0; i < seq.length; i++) {
            this.moves.push(seq[i]);
        }
    }
    addMoveTail(mossa){
        this.moves.push(mossa);
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
    getLastMove() {
        return this.moves[this.moves.length-1];
    }

    addMove(moves){
        this.moves.unshift(moves);
    }
}
module.exports = Listamosse;