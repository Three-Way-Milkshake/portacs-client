package it.unipd.threewaymilkshake.portacs.server;
import com.google.gson.annotations.SerializedName;

/* enum CellType {
	@SerializedName("0")
	OBSTACLE,

	@SerializedName("1")
	POI,
	
	@SerializedName("2")
	UP,
	
	@SerializedName("3")
	DOWN,
	
	@SerializedName("4")
	RIGHT,
	
	@SerializedName("5")
	LEFT,
	
	@SerializedName("6")
	NEUTRAL
	
}; */

public class Cell {
    CellType type;
    int numMuletti = 0;
    int IDmuletto = 0;

    public Cell(CellType type) {
        this.type = type;
    }

    public void copy(Cell cell) {
        this.type = cell.type;
        this.numMuletti = cell.numMuletti;
        this.IDmuletto = cell.IDmuletto;
    }

    public void incrementNumMuletti() {
        this.numMuletti++;
    }

    public void setIDmuletto(int iDmuletto) {
        IDmuletto = iDmuletto;
    }

	public int getNumMuletti() {
		return numMuletti;
	}

	public int getIDmuletto() {
		return IDmuletto;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + IDmuletto;
		result = prime * result + numMuletti;
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cell other = (Cell) obj;
		if (IDmuletto != other.IDmuletto)
			return false;
		if (numMuletti != other.numMuletti)
			return false;
		if (type != other.type)
			return false;
		return true;
	}

    
}

