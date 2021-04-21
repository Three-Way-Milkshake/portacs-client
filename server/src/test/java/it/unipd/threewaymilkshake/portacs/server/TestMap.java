package it.unipd.threewaymilkshake.portacs.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Deque;

// import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.Test;

// import org.junit.jupiter.api.Test;

public class TestMap {
  @Test
  public void testPath(){
    int[][] arr = new int[][] { 
      { 1, 1, 1, 1, 1, 0, 0, 1}, 
      { 1, 0, 1, 0, 1, 0, 0, 1 }, 
      { 1, 0, 1, 1, 1, 1, 0, 0 },
      { 1, 1, 1, 0, 1, 1, 1, 1} 
    };
    WareHouseMap m=new WareHouseMap(arr);
    
    Deque<Character> l=m.getPath(2, 0, 3, 7, Orientation.UP); // T, R, M, M, M, L, M
    String s="";
    for(char c:l)
      s+=c+" ";
    
    assertEquals("T M L M M L M R M M R M L M M M ", s); //...;PATH,T,M,L,M,M;
  }

  @Test
  public void testReadFile() throws FileNotFoundException{
    //String path="src/main/java/it/unipd/threewaymilkshake/portacs/server/Map.json";
    String path=System.getProperty("user.dir")+"/resources/Map.json";
    FileReader f=new FileReader(path);
  }

  @Test
  public void testMapWithChar(){
    char[][] arr = new char[][] { 
      { '1', '1', '1', '1', '1', '0', '0', '1'}, 
      { '1', '0', '1', '0', '1', '0', '0', '1' }, 
      { '1', '0', '1', '1', '1', '1', '0', '0' },
      { 'a', '1', '1', '0', '1', '1', '1', 'b'} 
    };

    WareHouseMap m=new WareHouseMap(arr);

    assertEquals("111110011010100110111100a110111b", m.toString());
    // assertEquals("a(3,0)b(3,7)", m.getPOIList());
  }

  @Test
  public void TestPath2(){
    char[][] arr = new char[][] { 
      { '1', '1', '1', '1', '1', '0', '0', '1'}, 
      { '1', '0', '1', '0', '1', '0', '0', '1' }, 
      { '1', '0', '1', '1', '1', '1', '0', '0' },
      { 'a', '1', '1', '0', '1', '1', '1', 'b'} 
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point(1,0,Orientation.DOWN), m.getPOIPosition('b')).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("TMRMMRMMLMMRMLMMM", res);
  }

  @Test
  public void TestPathFindingDirection1(){
    int[][] arr=new int[][]{
      {1, 2, 2, 1},
      {4, 0, 0, 1},
      {4, 1, 1, 1},
      {1, 3, 3, 1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,0,Orientation.DOWN), new Point(0,3,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("MMLMMMLMM", res);
  }

  @Test
  public void TestPathFindingDirection2(){
    int[][] arr=new int[][]{
      {1,5,5,5,5,1,1,1,1},
      {1,5,5,5,5,1,3,1,1},
      {1,1,4,4,4,5,5,5,1},
      {2,1,1,1,4,1,1,1,1},
      {1,2,2,1,4,1,1,1,1},
      {1,1,1,1,1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,0,Orientation.DOWN), new Point(0,5,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("MMLMRMLMMRMMLMMLMMRMMMLMMMLMMM", res);
  }

  @Test
  public void TestPathFindingDirection3(){
    int[][] arr=new int[][]{
      {1,1,1,1,1,1,1,1,1},
      {1,5,5,5,5,1,3,1,1},
      {1,1,4,4,4,5,5,5,1},
      {2,1,1,1,4,1,1,1,1},
      {1,2,2,1,4,1,1,1,1},
      {1,1,1,1,1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,0,Orientation.DOWN), new Point(0,5,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("LMMMMM", res);
  }

  @Test
  public void TestPathFindingDirection4(){
    int[][] arr=new int[][]{
      {1,1,1,1,5,1,1,1,1},
      {1,5,5,4,0,1,3,1,1},
      {1,1,4,4,3,1,5,5,1},
      {2,1,1,1,4,1,1,1,1},
      {1,2,2,1,4,1,1,1,1},
      {1,1,1,1,1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,0,Orientation.DOWN), new Point(0,5,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("LMMMRMMLMMLMM", res);
  }

  @Test
  public void TestPathFindingDirection5ComingFromRight(){
    int[][] arr=new int[][]{
      {1,1,1,0,1},
      {1,0,1,0,1},
      {1,0,1,0,1},
      {1,1,1,5,1},
      {1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,4,Orientation.DOWN), new Point(0,2,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("MMMRMMRMMM", res);
  }

  @Test
  public void TestPathFindingDirection5ComingFromLeft(){
    int[][] arr=new int[][]{
      {1,0,1,0,1},
      {1,0,1,0,1},
      {1,0,1,0,1},
      {1,3,1,5,1},
      {1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,0,Orientation.DOWN), new Point(0,2,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    assertEquals("MMMLMMLMMM", res);
  }

  @Test
  public void TestPathFindingDirection6FromLeft(){
    int[][] arr=new int[][]{
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,0,Orientation.DOWN), new Point(0,5,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    //assertEquals("MMMLMMLMMM", res);
    assertEquals("MMMMMLMMMMMLMMMMM", res);
  }

  @Test
  public void TestPathFindingDirection6FromRight(){
    int[][] arr=new int[][]{
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,5,5,5,5,1},
      {1,1,1,1,1,1}
    };

    WareHouseMap m=new WareHouseMap(arr);
    String res=m.getPath(new Point (0,5,Orientation.DOWN), new Point(0,0,Orientation.UP)).toString().replaceAll("(,| |\\[|\\])", "");
    //assertEquals("MMMLMMLMMM", res);
    assertEquals("RMMMMM", res);
  }
}
