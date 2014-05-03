//-----------------------------------------"STATIC" VECTOR OPERATIONS CLASS --------------------------------------------//

/**
* Allows for various operations upon the vector.  Only a single instance of thsi is created; equivilent to a 
* 'static' class in Java
**/
var Vector3Ops = {
	addVectors : function(vectorA, vectorB){
		return new Vector3(vectorA.getX() + vectorB.getX(), vectorA.getY() + vectorB.getY(), vectorA.getZ() + vectorB.getZ());
	},
	scale : function(vector, scalar){
		return new Vector3(vector.getX() * scalar, vector.getY() * scalar, vector.getZ() * scalar);
	},
	invertVector : function(vector){
		return new Vector3(-vector.getX(), -vector.getY(), -vector.getZ());
	},
	max : function(a, b){ // gets the component wise maximum of a vector
		return new Vector3(Math.max(a.getX(), b.getX()), Math.max(a.getY(), b.getY()),Math.max(a.getY(), b.getY()));
	},
	min : function(a, b){ // gets the component wise maximum of a vector
		return new Vector3(Math.min(a.getX(), b.getX()), Math.min(a.getY(), b.getY()),Math.min(a.getY(), b.getY()));
	},
	dot : function(a, b){ // Returns the dot product of the vector
		return (a.getX()*b.getX() + a.getY() * b.getY() + a.getZ() * b.getZ());
	},
	diff : function(a, b){ // Returns Vector A - Vector B
		return new Vector3(a.getX() - b.getX(), a.getY() - b.getY(), a.getZ() - b.getZ()); 
	},
	distanceBetween : function(a, b){ // Retuns the distance between the two vectors
		return Math.sqrt((a.getX() - b.getX()) * (a.getX() - b.getX())
					+ (a.getY() - b.getY()) * (a.getY() - b.getY())
					+ (a.getZ() - b.getZ()) * (a.getX() - b.getX()));
	}
}
