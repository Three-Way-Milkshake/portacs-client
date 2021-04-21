package it.unipd.threewaymilkshake.portacs.server;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

class ConnectionAccepter implements Runnable {
  private ConcurrentLinkedQueue<Connection> connectionList;
  private WareHouseMap map;
  private Deque<Deque<Character>> tasksList;
  private ServerSocket ssocket;
  private final static int PORT = 1723;

  ConnectionAccepter(ConcurrentLinkedQueue<Connection> connectionList, WareHouseMap map, Deque<Deque<Character>> tasksList) {
    this.connectionList = connectionList;
    this.map=map;
    this.tasksList=tasksList;
    try {
      ssocket = new ServerSocket(PORT);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public void run() {
    Socket s;
    try {
      while (true) {
        s = ssocket.accept();
        connectionList.add(new Connection(s, map, tasksList.removeFirst()));
        System.out.println("New connection");

      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}