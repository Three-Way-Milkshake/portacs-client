package it.unipd.threewaymilkshake.portacs.server;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.google.gson.Gson;

//import com.google.gson.Gson;

public class Server {
  //private final static String MAP_FILENAME="src/main/java/it/unipd/threewaymilkshake/portacs/server/Map.json";
  private final static String MAP_FILENAME=System.getProperty("user.dir")+"/resources/Map.json";
  /*
   * private List<Socket> connections;
   * 
   * Server(){ connections=new ArrayList<>(); }
   */

  public static void main(String args[]) {

    /*
     * int port = 1723;
     * 
     * System.out.println("Listening on localhost:"+port); try ( ServerSocket
     * serverSocket = new ServerSocket(port); Socket socket = serverSocket.accept();
     * PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
     * BufferedReader in = new BufferedReader(new
     * InputStreamReader(socket.getInputStream())); ) { String inputLine;
     * System.out.println("Received data."); while ((inputLine = in.readLine()) !=
     * null) { System.out.println("Received: " + inputLine); out.println("Hello " +
     * inputLine); } System.out.println("Server closing."); } catch(IOException e){
     * System.out.println("Sth went wrong: "); e.printStackTrace(); }
     */
    /*
     * CellType[] t=new CellType[]{CellType.values()[1], CellType.DOWN}; for(int
     * i=0; i<t.length; ++i) System.out.println(t[i]);
     */

    /* int[][] arr2 = new int[][] { 
      { 1, 1, 1, 1, 1, 0, 0, 1}, 
      { 1, 0, 1, 0, 1, 0, 0, 1 },  
      { 1, 0, 1, 1, 1, 1, 0, 0 },
      { 1, 1, 1, 0, 1, 1, 1, 1} 
    }; */

    /* char[][] arr = new char[][] { 
      { 'f', 'c', '1', 'd', '1', 'e', '0', '1'}, 
      { 'g', '0', '1', '0', '1', '0', '0', '1' }, 
      { 'h', '0', '1', '1', '1', '1', '0', '0' },
      { 'a', '1', '1', '0', '1', '1', '1', 'b'} 
    }; */

    /* char[][] arr = new char[][] { 
      { '1', 'c', '1', 'd', '1', 'e', '0', '1'}, 
      { '1', '0', '1', '0', '1', '0', '0', '1' }, 
      { '1', '0', '1', '1', '1', '1', '0', '0' },
      { '1', '1', '1', '1', '1', '1', '1', 'b'} 
    }; */

    Gson gson=new Gson();
    char[][] arr=null;
    try{
      arr=gson.fromJson(new FileReader(MAP_FILENAME), char[][].class);
    }
    catch(FileNotFoundException e){
      System.out.println("The file "+MAP_FILENAME+" does not exist!");
      e.printStackTrace();
      System.exit(1);
    }

    WareHouseMap m=new WareHouseMap(arr);
    // m.getPath(2, 0, 3, 7, Direction.UP).forEach(i->System.out.print(i+" "));
    // Arrays.stream(m.toIntMatrix())
    //   .forEach(r->{
    //     Arrays.stream(r).forEach(System.out::print);
    //   });

    // original
    /*Deque<Deque<Character>> tasksLists=new LinkedList<>();
    tasksLists.add(new LinkedList<>(List.of('a', 'b', 'c')));
    tasksLists.add(new LinkedList<>(List.of('d', 'e', 'f')));
    tasksLists.add(new LinkedList<>(List.of('b', 'a', 'd')));
    IntStream.range(0,100).forEach(i->{
      tasksLists.add(new LinkedList<>(List.of('d', 'b', 'c')));
    });
    //tasksLists.add(new LinkedList<>(List.of('b', 'b', 'c')));
    //tasksLists.add(new LinkedList<>(List.of('d', 'g')));
    /* IntStream.range(0,100).forEach(i->{
      tasksLists.add(new LinkedList<>(List.of('f', 'h', 'e')));
    }); */
    //System.out.println("there are: "+tasksLists.size()+" lists");*/

     Deque<Deque<Character>> tasksLists=new LinkedList<>();
    // tasksLists.add(new LinkedList<>(List.of('a', 'b', 'c')));
    // tasksLists.add(new LinkedList<>(List.of('d', 'e', 'f')));
    // tasksLists.add(new LinkedList<>(List.of('b', 'a', 'd')));
    IntStream.range(0,100).forEach(i->{
      tasksLists.add(new LinkedList<>(List.of('d', 'b', 'c')));
    });
    //tasksLists.add(new LinkedList<>(List.of('b', 'b', 'c')));
    //tasksLists.add(new LinkedList<>(List.of('d', 'g')));
    /* IntStream.range(0,100).forEach(i->{
      tasksLists.add(new LinkedList<>(List.of('f', 'h', 'e')));
    }); */
    //System.out.println("there are: "+tasksLists.size()+" lists");
    
    ConcurrentLinkedQueue<Connection> connections = new
      ConcurrentLinkedQueue<>(); 
    new Thread(new
      ConnectionAccepter(connections, m, tasksLists)).start(); 
    new Thread(new Engine(connections, m, tasksLists)).start(); 
    
    System.out.println("Server started...");
  }
}

