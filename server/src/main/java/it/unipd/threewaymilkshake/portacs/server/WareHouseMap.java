package it.unipd.threewaymilkshake.portacs.server;

import java.util.Arrays;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

class WareHouseMap {
  private CellType[][] map;
  private char[][] map2;
  private Map<Character, Point> poi=new HashMap<>(); 
  private int rows, cols;

  WareHouseMap(int[][] arr) {
    rows=arr.length;
    cols=arr[0].length;
    map = new CellType[rows][cols];

    for (int i = 0; i < rows; ++i) {
      for (int j = 0; j < cols; ++j) {
        map[i][j] = CellType.values()[arr[i][j]];
      }
    }
  }

  WareHouseMap(char[][] arr){
    rows=arr.length;
    cols=arr[0].length;
    map = new CellType[rows][cols];
    map2 = new char[rows][cols];

    for (int i = 0; i < rows; ++i) {
      for (int j = 0; j < cols; ++j) {
        map2[i][j]=arr[i][j];
        map[i][j] = arr[i][j]-'0'<7?CellType.values()[arr[i][j]-'0']:CellType.POI;
        if(map[i][j]==CellType.POI){
          map[i][j]=CellType.OBSTACLE;
          poi.put(arr[i][j], new Point(i, j));
        }
      }
    }
  }

  public int getRows(){
    return rows;
  }

  public int getColumns(){
    return cols;
  }

  public void printMap(){
    Arrays.stream(map).forEach((i) -> {
      Arrays.stream(i).forEach((j) -> System.out.print(j + " \t"));
      System.out.println();
    });
  }

  public void printNumericMap(){
    Arrays.stream(toIntMatrix()).forEach((i) -> {
      Arrays.stream(i).forEach((j) -> System.out.print(j + " "));
      System.out.println();
    });
  }

  public String toString(){
    StringBuilder b=new StringBuilder();
		Arrays.stream(map2)
			.forEach(r->{
				b.append(String.valueOf(r));
		});
		return b.toString();
  }

  public String getPOIList(){
    StringBuilder b=new StringBuilder();
    poi.forEach((k, v)->{
      b.append(k+v.toString());
    });

    return b.toString();
  }

  public Point getPOIPosition(char c){
    return poi.get(c);
  }

  public LinkedList<Character> getPath(Point start, Point end){
    System.out.println("From: "+start.toNodeString()+" to "+end.toNodeString());
    return getPath(start.getX(), start.getY(), end.getX(), end.getY(), start.getOrientation());
    // return getPath(start.getY(), start.getX(), end.getX(), end.getY(), start.getOrientation()); //TODO fix coordinate storte
  }

  public LinkedList<Character> getPath(int startX, int startY, int endX, int endY, Orientation dir) {
    int[][] arr=toIntMatrix();

    arr[startX][startY]=9;
    arr[endX][endY]=10;

    PathFinder p=new PathFinder(arr);
    List<Node> pathList = p.shortestPath();
    if(!isClose(pathList.get(0).getX(), pathList.get(0).getY(), startX, startY)){
      System.out.println("Need reverse");
      Collections.reverse(pathList);
    }
    else{
      System.out.println("Ok");
    }

    Node[] path=pathList.stream().toArray(Node[]::new);
    Point current=new Point(startX, startY, dir);
    LinkedList<Character> moves=new LinkedList<>();
    char nextMove='n', tmp;
    for(int i=0; i<path.length-1; ++i){ // creates moves from start (excluded) to end (included)
      //int x=path[i].getX(), y=path[i].getY();
      int xn=path[i+1].getX(), yn=path[i+1].getY();

      /* tmp=current.setNext(xn, yn);
      if(Character.isDigit(tmp)){
        nextMove=nextMove=='n'?'1':++nextMove;
      }
      else{
        if(Character.isDigit(nextMove)){
          moves.add(nextMove);
          nextMove='n';
        }
        moves.add(tmp);
        --i;
      } */
      tmp=current.setNext(xn, yn);
      if(tmp!='M') --i;
      moves.add(tmp);
    }
    // if(Character.isDigit(nextMove)) moves.add(nextMove);

    return moves;

    /* moves=moves.stream()
      .filter(m-> m!='n')
      .collect(Collectors.toList()); */
  }

  public boolean isClose(int x1, int y1, int x2, int y2){
    boolean r=true;
    if(x1!=x2){
      if(x1+1!=x2 && x1-1!=x2){
        r=false;
      } 
    }
    if(r && y1!=y2){
      if(y1+1 != y2 && y1-1 != y2){
        r=false;
      }
    }
    return r;
  }

  public int[][] toIntMatrix(){
    int[][] res = new int[rows][cols];
    
    for (int i = 0; i < rows; ++i) {
      for (int j = 0; j < cols; ++j) {
        res[i][j] = map[i][j].ordinal();
        
      }
    }

    return res;
  }
}

enum CellType {
  // OBSTACLE, NEUTRAL, UP, DOWN, RIGHT, LEFT, POI
  OBSTACLE, NEUTRAL, UP, RIGHT, DOWN, LEFT, POI
};

enum Orientation{
  UP, RIGHT, DOWN, LEFT; //0 1 2 3

  /* public static char turnLeft(Orientation d){
    return switch(d){
      case UP -> 'L';
      case DOWN -> 'R';
      case RIGHT -> 'T';
      case LEFT -> '0';
    };
  } */
}