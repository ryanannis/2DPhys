//-----------------------------------------------------VECTOR CLASS--------------------------------------------//


/**
* 3D Vector class containing absolute cardinal coordinates and various vector operations.
*
* @param x X-Coordinate for the new vector
* @param y Y-Coordinate for the new vector
* @param z Z-Coordinate for the new vector
**/
var Vector3 = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
}

/**
* Gets the X-coordinate of this vector
* @return X coordinate as numerical value
**/
Vector3.prototype.getX = function(){
	return this.x;
}

/**
* Gets the Y-coordinate of this vector
* @return Y coordinate as numerical value
**/
Vector3.prototype.getY = function(){
	return this.y;
}

/**
* Gets the Z-coordinate of this vector
* @return Z coordinate as numerical value
**/
Vector3.prototype.getZ = function(){
	return this.z;
}

/**
* Gets the magnitude of this vector
**/
Vector3.prototype.getMagnitude = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
}

/**
* Gets the unit vector of this vector; a vector where the direction is the same but the magnitude is equal to one.
* Returns a new instance of the zero vector if this vector is the zero vector;
* @return Unit vector in Vector3 format
**/
Vector3.prototype.getUnitVector = function(){
	var magnitude = this.getMagnitude;

	if(magnitude == 0){
		return this.deepClone();
	}
	else{
		return new Vector(this.x/magnitude, this.y/magnitude, this.z/magnitude);
	}
}

/*
* Returns a new instance indentical to this vector
*/
Vector3.prototype.deepClone = function(){
	return new Vector3(this.x, this.y, this.z);
}

