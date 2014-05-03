//-------------------------------------------INDIVIDUAL PARTICLE CLASS----------------------------------------//

/**
* Object representing a particle in a 3D area with some (or 0) force acting upon it
* and with possible constraints.  Currently mass is assumed to be identical (1) for each
* particle so a=p;
*
* @param position Vector3 object for the position of the particle
* @param force Vector3 object for the force acting upon the particle
* @param lastPosition Vector3 object for the last position of the particle
*/
var Particle = function(position, velocity, mass, fixed){
	this.fixed = fixed;
	this.position = position;
	this.force = CONSTANTS.ZEROVECTOR.deepClone();
	this.lastPosition = Vector3Ops.addVectors(position, Vector3Ops.invertVector(velocity));
	this.mass = mass;
}

/**
* Gets the position of the vector in arbitrary units
* @return The position of the vector
**/
Particle.prototype.getPosition = function(){
	return this.position;
}

/**
* Returns of the particle has no movement
* @return Whether the particle is fixed
**/
Particle.prototype.isFixed = function(){
	return this.fixed;
}

/**
* Fixes the particle in space
**/
Particle.prototype.setFixed = function(){
	this.fixed = true;
}

/**
* Unfixes the particle from space
**/
Particle.prototype.setUnfixed = function(){
	this.fixed = false;
}

/**
* Gets the mass of the particle
* @return The mass of the vector
**/
Particle.prototype.getMass = function(){
	return this.mass;
}

/**
* Gets the force acting upon the vector in arbitrary units
* @return The force acting upon the vector
**/
Particle.prototype.getForce = function(){
	return this.force;
}

/**
* Gets the force acting upon the vector in arbitrary units
* @return The force acting upon the vector
**/
Particle.prototype.setVelocity = function(velocity){
	this.lastPosition = Vector3Ops.addVectors(this.position, Vector3Ops.invertVector(velocity));
}


/**
* Gets the force acting upon the vector in arbitrary units
* @return The force acting upon the vector
**/
Particle.prototype.getVelocity = function(velocity){
	this.lastPosition = Vector3Ops.addVectors(this.position, Vector3Ops.invertVector(this.lastPosition));
}

/**
* Sets the mass of the particle
**/
Particle.prototype.setMass = function(){
	this.mass = mass;
}

/**
* Gets the last position of the vector in arbitrary units - used for verlet integration
* @return The last position of the vector
**/
Particle.prototype.getLastPosition = function(){
	return this.lastPosition;
}

/**
* Sets the position of the vector in arbitrary units
* @positionVector The new position of the vector
**/
Particle.prototype.setPosition = function(positionVector){
	this.position = positionVector;
}

/**
* Sets the force acting upon the vector in arbitrary units
* @forceVector The new force upon the vector
**/
Particle.prototype.setForce = function(forceVector){
	this.force = forceVector;
}

/**
* Sets the force acting upon the vector in arbitrary units
* @positionVector The new last position of the vector
**/
Particle.prototype.setLastPosition = function(positionVector){
	this.lastPosition = positionVector;
}

/**
* Adds a force to this particle
* @force Force to add to this vector
**/
Particle.prototype.addForce = function(force){
	this.force = Vector3Ops.addVectors(this.force, force);
}

