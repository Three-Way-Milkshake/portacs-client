package it.unipd.threewaymilkshake.portacs.server;
import java.util.Arrays;
import java.util.LinkedList;


/*class Path {
     // for test purpose

    public Path(LinkedList<Move> moves) {
        this.moves = moves;
    }
    
    
}
*/
public class Unit {
    public int id;
    public Point actualPosition; // posizione ricevuta dal muletto
    public LinkedList<Move> moves;

    public Unit(int id, Point actualPosition, LinkedList<Move> moves) {
        this.id = id;
        this.actualPosition = actualPosition;
        this.moves = moves;
    }

    Point makeMove() {
        return actualPosition.goIntoNewPosition(moves.removeFirst());
    }

    /*public LinkedList<Move> getFirstTwoMoves() {
        LinkedList<Move> toReturn = new LinkedList<Move>();
        if(moves.size() >= 2) {
            toReturn.add(moves.get(0));
            toReturn.add(moves.get(1));
        }
        else if(moves.size() == 1) {
            toReturn.add(moves.get(0));
                
        }
        return toReturn;
    }*/

    

}
