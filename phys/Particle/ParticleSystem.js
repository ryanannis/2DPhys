//----------------------------------------------PARTICLE SYSTEM CLASS----------------------------------------//

/**
* System containing all the interations of particles in the system.
  @height - Width of the simulation container
  @height - Height of the simulation container
  @depth - Depth of the simulation container
  @drag - Amount of drag to apply to teh 
**/
var ParticleSystem = function(width, height, depth, drag){
	this.particles = new Array();
	this.constraints = new Array();
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.drag = drag;
}

ParticleSystem.prototype.addParticle = function(particle){
	this.particles.push(particle);
}

/**
* Adds a constraint to the system, given particles as reference
*/
ParticleSystem.prototype.addConstraint = function(constraint){
	this.constraints.push(constraint);
}

/**
* Returns all constraints in the system
*/
ParticleSystem.prototype.getConstraintList = function(constraint){
	return this.constraints;
}

/**
* Returns an array of all the particles in the system
*/
ParticleSystem.prototype.getParticleList = function(particle){
	return this.particles;
}


/*
* Updates the state of the particle system.
*/
ParticleSystem.prototype.step = function(timeStep){
	this.timeStep = timeStep;
	for(var i = 0; i < this.particles.length; i++){
		if(!this.particles[i].isFixed()){
			this._verlet(this.particles[i]);
			this._addForces(this.particles[i]);
			this._solveGlobalConstraints(this.particles[i]);
		}
	}
	for(var i = 0; i < this.constraints.length; i++){
		this._solveLocalConstraints(this.constraints[i]);
	}
}

/*
* Uses verlet integration to update the position and forces acting upon the particles.
*/
ParticleSystem.prototype._verlet = function(particle){
	var curPosition = particle.getPosition();
	var accel = particle.getForce();
	var oldPosition = particle.getLastPosition();

	/*Create updated particle position with verlet integration
	* Formula:  x' = 2x - x_last + a * deltat^2
	*/
	var newPosition = 	Vector3Ops.addVectors(
						Vector3Ops.addVectors(
							Vector3Ops.scale(curPosition, 1+this.drag), //2x
							Vector3Ops.scale(Vector3Ops.invertVector(oldPosition), this.drag) // - _last
						),
						Vector3Ops.scale(accel, this.timeStep)
					);

	particle.setPosition(newPosition);
	particle.setLastPosition(curPosition);
}

/*
* Adds forces that are global to each particle
* eg. Gravity, EM field - only supports gravity thusfar
*/
ParticleSystem.prototype._addForces = function(particle){
	particle.setForce(CONSTANTS.GRAVITY); //adds gravity to the particle
}

ParticleSystem.prototype._solveGlobalConstraints = function(particle){
	//Use a spring to prevent particle from leaving the main area
	//var pos = particle.getPosition();
	//var newVector = Vector3Ops.min(Vector3Ops.max(pos, new Vector3(0,0,0)), new Vector3(this.width, this.height, this.depth));
	//particle.setPosition(newVector);

}

ParticleSystem.prototype._solveLocalConstraints = function(constraint){
	var a = constraint.getParticleA();
	var b = constraint.getParticleB();

	var delta = Vector3Ops.diff(a.getPosition(), b.getPosition()); //Vector of particle differences
	
	var scaleFactor = constraint.getSpringConstant() * this.timeStep *  (delta.getMagnitude() - constraint.getRelaxed()); //Magnitude of vector differences

	delta = Vector3Ops.scale(delta, scaleFactor);
	b.addForce(delta);
	a.addForce(Vector3Ops.invertVector(delta));

}

