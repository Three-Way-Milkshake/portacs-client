package it.unipd.threewaymilkshake.portacs.server;

public class Point{
  private int x;
  private int y;
  private Orientation orientation;
  
  Point(int x, int y){
    this.x=x;
    this.y=y;
    this.orientation=Orientation.UP;
  }

  Point(int x, int y, Orientation orientation){
    this(x, y);
    this.orientation=orientation;
  }

  /* Point(Move m){

  } */

  Point(){
    orientation=Orientation.UP;
  }

  public int getX(){
    return x;
  }
  
  public int getY(){
    return y;
  }

  public Orientation getOrientation(){
    return orientation;
  }

  public void set(int x, int y, Orientation orientation){
    this.x=x;
    this.y=y;
    this.orientation=orientation;
  }

  public boolean equals(Point p){
    return x==p.x && y==p.y;
  }

  public String toString(){
		return "("+x+","+y+";"+orientation+")";
	}

  public String toNodeString(){
    return String.valueOf(","+x+","+y+","+orientation);
  }

  public char setNext(int xn, int yn){
    char r='n';
    if(xn<x){
      //up
      r=switch(orientation){
        case UP -> {
          --x;
          yield 'M';
        }
        case DOWN -> 'T';
        case LEFT -> 'R';
        case RIGHT -> 'L';
      };
      orientation=Orientation.UP;
    }
    else if(xn>x){
      //down
      r=switch(orientation){
        case UP -> 'T';
        case DOWN -> {
          ++x;
          yield 'M';
        }
        case LEFT -> 'L';
        case RIGHT -> 'R';
      };
      orientation=Orientation.DOWN;
    }
    else if(yn<y){
      //left
      r=switch(orientation){
        case UP -> 'L';
        case DOWN -> 'R';
        case LEFT -> {
          --y;
          yield 'M';
        }
        case RIGHT -> 'T';
      };
      orientation=Orientation.LEFT;
    }
    else{
      //right
      r=switch(orientation){
        case UP -> 'R';
        case DOWN -> 'L';
        case LEFT -> 'T';
        case RIGHT -> {
          ++y;
          yield 'M';
        }
      };
      orientation=Orientation.RIGHT;
    }

    return r;
  }

  public boolean isNext(int xn, int yn){
    return switch(orientation){
      case UP -> x-1==xn;
      case DOWN -> x+1==xn;
      case LEFT -> y-1==yn;
      case RIGHT -> y+1==yn;
    };
  }

  public boolean isClose(Point p2){
    boolean r=true;
    if(x!=p2.x){
      if(x+1!=p2.x && x-1!=p2.x){
        r=false;
      } 
    }
    if(r && y!=p2.y){
      if(y+1 != p2.y && y-1 != p2.y){
        r=false;
      }
    }
    return r;
  }

  public int calculateDistance(Point destination) {
        if(this.x == destination.x)
            return Math.abs(this.y-destination.y);
        else if(this.y == destination.y)
            return Math.abs(this.x-destination.x);
        else 
            return 0;
  }

  public Point goIntoNewPosition(Move move) {

        if(move == Move.GOSTRAIGHT) {
            if(this.orientation == Orientation.UP)
                x--;
            else if(this.orientation == Orientation.DOWN)
                x++;
            else if(this.orientation == Orientation.LEFT)
                y--;
            else //right
                y++;
        }
        else if(move == Move.TURNLEFT) {
            if(this.orientation == Orientation.UP)
                orientation = Orientation.LEFT;
            else if(this.orientation == Orientation.DOWN)
                orientation = Orientation.RIGHT;
            else if(this.orientation == Orientation.LEFT)
                orientation = Orientation.DOWN;
            else //right
                orientation = Orientation.UP; 
        }
        else if(move == Move.TURNRIGHT) {
            if(this.orientation == Orientation.UP)
                orientation = Orientation.RIGHT;
            else if(this.orientation == Orientation.DOWN)
                orientation = Orientation.LEFT;
            else if(this.orientation == Orientation.UP)
                orientation = Orientation.LEFT;
            else //right
                orientation = Orientation.DOWN; 
        }
        else { //TURNBACK
            if(this.orientation == Orientation.UP)
                orientation = Orientation.DOWN;
            else if(this.orientation == Orientation.DOWN)
                orientation = Orientation.UP;
            else if(this.orientation == Orientation.LEFT)
                orientation = Orientation.RIGHT;
            else //right
                orientation = Orientation.LEFT; 
        }
        return this;
    }

    public boolean headOnRisk(Point b) {
        if(x == b.x) {
            if(y < b.y) {
                return orientation == Orientation.RIGHT && b.orientation == Orientation.LEFT;
            }
            else if(y > b.y) {
                return orientation == Orientation.LEFT && b.orientation == Orientation.RIGHT;
            }
        }
        else if(y == b.y) {
            if(x < b.x) {
                return orientation == Orientation.DOWN && b.orientation == Orientation.UP;
            }
            else if(x > b.x) {
                return orientation == Orientation.UP && b.orientation == Orientation.DOWN;
            }
        }
        return false;
    }

    public Point TellNewPosition(Move move) {
      return switch(move){
        case GOSTRAIGHT -> {
          yield switch(orientation){
            case UP -> new Point((x-1), y, orientation);
            case RIGHT -> new Point(x, y+1, orientation);
            case DOWN -> new Point(x+1, y, orientation);
            case LEFT -> new Point(x, y-1, orientation);
          };
        }

        case TURNLEFT -> {
          yield switch(orientation){
            case UP -> new Point(x, y, Orientation.LEFT);
            case RIGHT -> new Point(x, y, Orientation.UP);
            case DOWN -> new Point(x, y, Orientation.RIGHT);
            case LEFT -> new Point(x, y, Orientation.DOWN);
          };
        }
        case TURNRIGHT -> {
          yield switch(orientation){
            case UP -> new Point(x, y, Orientation.RIGHT);
            case RIGHT -> new Point(x, y, Orientation.DOWN);
            case DOWN -> new Point(x, y, Orientation.LEFT);
            case LEFT -> new Point(x, y, Orientation.UP);
          };
        }
        case TURNBACK -> {
          yield switch(orientation){
            case UP -> new Point(x, y, Orientation.DOWN);
            case RIGHT -> new Point(x, y, Orientation.LEFT);
            case DOWN -> new Point(x, y, Orientation.UP);
            case LEFT -> new Point(x, y, Orientation.RIGHT);
          };
        }
        case STOP -> new Point (x,y,orientation);
      };/*
         if(move == null) {
           System.out.println("POSITION IS NULL");
           return null;
         }
         else if (move == Move.GOSTRAIGHT) {
            if (this.orientation == Orientation.UP)
                return new Point((x - 1), y, orientation);
            else if (this.orientation == Orientation.DOWN)
                return new Point((x + 1), y, orientation);
            else if (this.orientation == Orientation.LEFT)
                return new Point(x, (y - 1), orientation);
            else // right
                return new Point(x, (y + 1), orientation);
        } else if (move == Move.TURNLEFT) {
            if (this.orientation == Orientation.UP)
                return new Point(x, y, Orientation.LEFT);
            else if (this.orientation == Orientation.DOWN)
                return new Point(x, y, Orientation.RIGHT);
            else if (this.orientation == Orientation.LEFT)
                return new Point(x, y, Orientation.UP);
            else // right
                return new Point(x, y, Orientation.DOWN);
        } else if (move == Move.TURNRIGHT) {
            return new Point(x, y, Orientation.RIGHT);

        } else if (move == Move.TURNBACK) {
            // TURNBACK
            if (this.orientation == Orientation.UP)
                return new Point(x, y, Orientation.DOWN);
            else if (this.orientation == Orientation.DOWN)
                return new Point(x, y, Orientation.UP);
            else if (this.orientation == Orientation.LEFT)
                return new Point(x, y, Orientation.RIGHT);
            else // right
                return new Point(x, y, Orientation.LEFT);
        }
        return new Point(0, 0, Orientation.DOWN); */
    }

    public Point Tell2NewPosition(Move move, Point p) {
      return p.TellNewPosition(move);
         /*if(move == null) {
           System.out.println("POSITION IS NULL");
           return null;
         }
         else if (move == Move.GOSTRAIGHT) {
            if (p.orientation == Orientation.UP)
                return new Point((p.x - 1), p.y, p.orientation);
            else if (p.orientation == Orientation.DOWN)
                return new Point((p.x + 1), p.y, p.orientation);
            else if (p.orientation == Orientation.LEFT)
                return new Point(p.x, (p.y - 1), p.orientation);
            else // right
                return new Point(p.x, (p.y + 1), p.orientation);
        } else if (move == Move.TURNLEFT) {
            if (p.orientation == Orientation.UP)
                return new Point(p.x, p.y, Orientation.LEFT);
            else if (p.orientation == Orientation.DOWN)
                return new Point(p.x, p.y, Orientation.LEFT);
            else if (p.orientation == Orientation.LEFT)
                return new Point(p.x, p.y, Orientation.LEFT);
            else // right
                return new Point(p.x, p.y, Orientation.LEFT);
        } else if (move == Move.TURNRIGHT) {
            return new Point(p.x, p.y, Orientation.RIGHT);

        } else if (move == Move.TURNBACK) {
            // TURNBACK
            if (p.orientation == Orientation.UP)
                return new Point(p.x, p.y, Orientation.DOWN);
            else if (p.orientation == Orientation.DOWN)
                return new Point(p.x, p.y, Orientation.UP);
            else if (p.orientation == Orientation.LEFT)
                return new Point(p.x, p.y, Orientation.RIGHT);
            else // right
                return new Point(p.x, p.y, Orientation.LEFT);
        }
        return new Point(0, 0, Orientation.DOWN); */
    }


    public String printPosition() {
        return "< " + x + "," + y + "," + orientation.toString() + " >";
    }
}