package it.unipd.threewaymilkshake.portacs.server;

import java.io.PrintWriter;
import java.util.Deque;
import java.util.LinkedList;

enum Move{TURNLEFT,TURNRIGHT,GOSTRAIGHT,TURNBACK,STOP;}

public class Muletto {
    public int id;
    public Point position;
    LinkedList<Move> nextMoves;
    Deque<Character> pathToNextTask;
    public PrintWriter out;
    
    public Muletto(Connection con) {
        this.id = con.getId();
        this.position = con.getPosition();
        this.nextMoves = con.getFirstTwoMoves();
        this.pathToNextTask = con.pathToNextTask;
        this.out = con.out;
    }


    public Muletto(int id, Point position) {
        this.id = id;
        this.position = position;
    }

    public Muletto(int id, Point position, LinkedList<Move> nextMoves) {
        this.id = id;
        this.position = position;
        this.nextMoves = nextMoves;
    }

    public int getID() {
        return id;
    }

    @Override
    public int hashCode() {
        return id;
    }

    @Override
    public boolean equals(Object obj) {
        if (getClass() != obj.getClass())
            return false;
        Muletto other = (Muletto) obj;
        if (id != other.id)
            return false;
        return true;
    }

    public void printMuletto() {
        System.out.println(id + " " + position.getX() + position.getY());
    }

    public void printNextMoves() {
        for (Move m : nextMoves) {
            System.out.printf(m.toString() + " ");
        }
        System.out.printf("\n");
    }

    Move getMove(Integer i) {
        if(nextMoves.isEmpty()) return Move.STOP;
        try{
            return nextMoves.get(i);
        } catch(IndexOutOfBoundsException e){
            return Move.STOP;
        }
    }
}
