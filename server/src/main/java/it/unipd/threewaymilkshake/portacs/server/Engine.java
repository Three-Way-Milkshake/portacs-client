package it.unipd.threewaymilkshake.portacs.server;

import java.util.Deque;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Collector;
import java.util.stream.Collectors;


class Engine implements Runnable {
  private ConcurrentLinkedQueue<Connection> connections;
  private WareHouseMap map;
  private Deque<Deque<Character>> tasksList;
  private Set<Connection> managers=new HashSet<>();

  Engine(ConcurrentLinkedQueue<Connection> c, WareHouseMap map, Deque<Deque<Character>> tasksList) {
    this.connections = c;
    this.map=map;
    this.tasksList=tasksList;
  }

  @Override
  public void run() {
    while (true) {
      if (!connections.isEmpty()) {
        
        for (Connection c : connections) {
          if(!c.isManager()){
              c.send("ALIVE");
            if (!c.isAlive()) {
              connections.remove(c);
              System.out.println("Found a closed connection, removing it from list...");
            } else {
              System.out.println("Received: " + c.getLastMessage());
              c.process();
            }
          }
          else{
            managers.add(c);
          }
        }

        //TODO: commented because broken
        /********************/
        if(!connections.isEmpty()){
          LinkedList<Muletto> incomingConnections = new LinkedList<Muletto>();
          connections.stream().filter(conn->!conn.isManager()).forEach(zzz->{
            incomingConnections.add(new Muletto(zzz));
          });
          ServerCentrale serverCentrale = new ServerCentrale(incomingConnections);
          serverCentrale.organizer();
        }
        /********************/        


        sendAllPositionsToManagers();
        System.out.println("Doing sth, there are: " + connections.size());
      } else {
        System.out.println("No unit connected...");
      }

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  private void sendAllPositionsToManagers(){
    StringBuilder b=new StringBuilder();
    b.append("UNI");
    List<Connection> units=connections.stream()
      .filter(c->!c.isManager())
      .collect(Collectors.toList());

    units.stream().forEach(u->{
      b.append(u.getPosition().toNodeString());
    });
    b.append(";");
    String positions=b.toString();
    managers.stream().forEach(m->{
      m.send(positions);
    });
  }
}