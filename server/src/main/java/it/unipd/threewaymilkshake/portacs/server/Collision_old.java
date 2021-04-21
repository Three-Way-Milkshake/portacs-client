package it.unipd.threewaymilkshake.portacs.server;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.Map.Entry;

public class Collision_old {

    static void printCollisionDetected(HashMap<Point, LinkedList<Muletto>> prova) {
        if(!prova.isEmpty()) System.out.println("RILEVATA COLLISIONE: ");
        for (HashMap.Entry<Point, LinkedList<Muletto>> entry : prova.entrySet()) {
            System.out.print("(" + entry.getKey().getX() + "," + entry.getKey().getY() + ")" + ": ");
            LinkedList<Muletto> tmp = entry.getValue();
            LinkedList<Muletto> tmp1 = new LinkedList<Muletto>(tmp);
            for (Muletto i : tmp1) {
                System.out.print("(" + i.id + "," + i.position.printPosition() + "," + i.nextMoves + ")");
            }
            System.out.println();
        }
    }

    static HashMap<Point, LinkedList<Muletto>> CollisionDetector(HashSet<Muletto> muletti) {
        HashMap<Point, HashSet<Muletto>> tmp = new HashMap<Point, HashSet<Muletto>>();

        for (Muletto e1 : muletti) {
            for (Muletto e2 : muletti) {
                if (e1.id < e2.id) {
                    Set<Muletto> mul = new LinkedHashSet<Muletto>();
                    // pos coincidente
                    Point pos1 = new Point(e1.position.getX(), e1.position.getY(), e1.position.getOrientation());
                    Point pos2 = new Point(e2.position.getX(), e2.position.getY(), e2.position.getOrientation());
                    // pos prossime mosse
                    Point pos1m1 = e1.position.TellNewPosition(e1.getMove(0));
                    Point pos1m2 = e1.position.Tell2NewPosition(e1.getMove(1), pos1m1);

                    Point pos2m1 = e2.position.TellNewPosition(e2.getMove(0));

                    Point pos2m2 = e2.position.Tell2NewPosition(e2.getMove(1), pos2m1);

                    if (pos1.equals(pos2)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1, s);
                    }
                    if (pos1.equals(pos2m1)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1, s);
                    }
                    if (pos1.equals(pos2m2)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1, s);
                    }
                    if (pos1m1.equals(pos2)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1m1, s);
                    }
                    if (pos1m1.equals(pos2m1)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1m1, s);
                    }
                    if (pos1m1.equals(pos2m2)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1m1, s);
                    }
                    if (pos1m2.equals(pos2)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1m2, s);
                    }
                    if (pos1m2.equals(pos2m1)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1m2, s);
                    }
                    if (pos1m2.equals(pos2m2)) {

                        mul.add(e1);
                        mul.add(e2);
                        HashSet<Muletto> s = new HashSet<Muletto>(mul);
                        tmp.put(pos1m2, s);
                    }
                }

            }
        }

        for (HashMap.Entry<Point, HashSet<Muletto>> entry1 : tmp.entrySet()) {
            for (HashMap.Entry<Point, HashSet<Muletto>> entry2 : tmp.entrySet()) {
                if ((entry1.getKey() != entry2.getKey()) && (entry1.getKey().getX() == entry2.getKey().getX())
                        && (entry1.getKey().getY() == entry2.getKey().getY())) {
                    entry1.getValue().addAll(entry2.getValue());
                    /*
                     * for (Muletto t : entry2.getValue()) {
                     * 
                     * for (Muletto t1 : entry1.getValue()) {
                     * 
                     * entry1.getValue().addLast(t); } }
                     */
                    entry2.getValue().clear();
                }
            }
        }

        /*
         * for (HashMap.Entry<Point, HashSet<Muletto>> entry : tmp.entrySet()) { for
         * (Muletto temp0 : entry.getValue()) { for (Muletto temp1 :
         * entry.getValue()) { if (temp0 != temp1) { System.out.println(temp0.id + "," +
         * temp1.id); if (temp0.id == temp1.id) { System.out.println("Y"); } } } } }
         */
        Iterator<Entry<Point, HashSet<Muletto>>> it = tmp.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<Point, HashSet<Muletto>> pair = (Map.Entry<Point, HashSet<Muletto>>) it.next();
            if (pair.getValue().isEmpty())
                it.remove(); // avoids a ConcurrentModificationException
        }

        HashMap<Point, LinkedList<Muletto>> finale = new HashMap<Point, LinkedList<Muletto>>();
        for (HashMap.Entry<Point, HashSet<Muletto>> entry1 : tmp.entrySet()) {
            LinkedList<Muletto> s = new LinkedList<Muletto>(entry1.getValue());
            finale.put(entry1.getKey(), s);

        }
        return finale;
    }
}