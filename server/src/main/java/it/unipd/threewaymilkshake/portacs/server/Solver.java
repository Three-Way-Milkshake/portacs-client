package it.unipd.threewaymilkshake.portacs.server;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Random;

class Action {
    public LinkedList<String> actions; //STOP o RICALCOLO
    public Point obstacle;

    public void add(String toAdd) {
        actions.add(toAdd);
    }

    public Action(LinkedList<String> actions) {
        this.actions = actions;
        this.obstacle = null;
    }


    public boolean isInStop() {
        boolean found = false;
        for(String action : actions) 
        {
            if(action == "STOP")
                found = true;
        }
        return found;
    }

    public boolean isCalculatingAgaing() {
        boolean found = false;
        for(String action : actions) 
        {
            if(action == "RICALCOLO")
                found = true;
        }
        return found;
    }

    public void printList() {
        for(String action : actions) 
        {
            System.out.printf(action + " ");

        }
        System.out.printf(((obstacle == null) ? " / " : obstacle.printPosition()));
    }

    
}

public class Solver {
    
    HashMap<Muletto,Action> response; //responso
    HashMap<Point,LinkedList<Muletto>> collisions; //input: signalled collisions

    public Solver(HashMap<Point, LinkedList<Muletto>> collisions) {
        this.response = new HashMap<Muletto,Action>();
        this.collisions = collisions;
    }

    public void printResponse() {
        for(Muletto key : response.keySet()) 
        {
            System.out.printf(key.id + ": ");
            response.get(key).printList();
            System.out.printf("\n");
        }
    }

    public void checkNumberOfCollisions() {
        HashMap<Muletto,Integer> numberOfCollision = new HashMap<Muletto,Integer>();
        for(Point key : collisions.keySet()) 
        {
            for(Muletto unit : collisions.get(key)) 
            {
                Integer j = numberOfCollision.get(unit);
                numberOfCollision.put(unit,(j == null) ? 1 : j + 1);
            }
            
        }


        for(Muletto key : numberOfCollision.keySet()) 
        {
            //System.out.println(key.id + ":" + numberOfCollision.get(key));
            
            response.put(key,new Action(new LinkedList<String>()));

            if(numberOfCollision.get(key) > 1) {
                response.get(key).add("STOP");
            }
                
        }


    }

    public void setCollisions(Muletto a, Muletto b) {
        if(a.position.headOnRisk(b.position)) { // c'è rischio frontale
            if(response.get(a).isInStop()) {
                response.get(a).add("STOP");
                response.get(a).add("STOP");
                response.get(b).add("RICALCOLO");
                response.get(b).obstacle = a.position;
            }
            else if(response.get(b).isInStop()) {
                response.get(b).add("STOP");
                response.get(b).add("STOP");
                response.get(a).add("RICALCOLO");
                response.get(a).obstacle = b.position;
            }
            else {
                Random rand = new Random(); 
                int random = rand.nextInt(1); 
                if(random == 0) {
                    response.get(a).add("STOP");
                    response.get(a).add("STOP");
                    response.get(a).add("STOP");
                    response.get(b).add("RICALCOLO");
                    response.get(b).obstacle = a.position;
                }
                else {
                    response.get(b).add("STOP");
                    response.get(b).add("STOP");
                    response.get(b).add("STOP");
                    response.get(a).add("RICALCOLO");
                    response.get(a).obstacle = b.position;
                }
            }
        }
    }

    public void checkHeadOnCollision() {
        for(Point key : collisions.keySet()) 
        {
            for(int i = 0; i < collisions.get(key).size() - 1; i++)
            {
                for(int j = i + 1; j < collisions.get(key).size(); j++)
                {
                    //System.out.println(collisions.get(key).get(i).id + " " + collisions.get(key).get(j).id);
                    setCollisions(collisions.get(key).get(i),collisions.get(key).get(j));
                }
            }

        }
    }

    public void setNearest() {
        for(Point key : collisions.keySet()) 
        {
            int min = Integer.MAX_VALUE;
            for(Muletto unit : collisions.get(key)) 
            {
                int distance = unit.position.calculateDistance(key);
                    if(distance == 0 || !response.get(unit).isInStop() && !response.get(unit).isCalculatingAgaing()) {
                    if(distance <= min)
                        min = distance;
                }
            }
            LinkedList<Muletto> equals = new LinkedList<Muletto>();
            for(Muletto unit : collisions.get(key)) 
            {             
                int distance = unit.position.calculateDistance(key);
                    if(!response.get(unit).isInStop() && !response.get(unit).isCalculatingAgaing()) {
                        if(distance > min) {
                            
                            response.get(unit).add("STOP");
                        }
                        else if(distance == min) {
                            equals.add(unit);
                        }
                }
            }
            if(equals.size() > 1) {
                
                Random rand = new Random(); 
                int random = rand.nextInt(equals.size());
                for(int i = 0; i < equals.size(); i++) {
                    if(i != random)
                        response.get(equals.get(i)).add("STOP");
                }
            
            }
        }
    }

    HashMap<Muletto,Action> collisionSolver()
    {
        checkNumberOfCollisions();
        checkHeadOnCollision();
        setNearest();

        return response;
    }

    





}
