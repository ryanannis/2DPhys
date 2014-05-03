//----------------------------------------------CONSTRAINT SYSTEM CLASS----------------------------------------//
/*
* A particle constraint acting as a spring
*/
var Constraint = function(springConstant, relaxedDist, friction, particleA, particleB){
	this.constant = springConstant;
	this.dist = relaxedDist;
	this.a = particleA;
	this.b = particleB;
}

/**
* Gets particle A
*/
Constraint.prototype.getParticleA = function(){
	return this.a;
}

/**
* Gets particle B
*/
Constraint.prototype.getParticleB = function(){
	return this.b;
}

/**
* Gets particle A
*/
Constraint.prototype.particleDistance = function(){
	return this.a;
}

/**
* Gets particle A
*/
Constraint.prototype.getSpringConstant = function(){
	return this.constant;
}

/**
* Gets the relaxed distance of the constraint
*/
Constraint.prototype.getRelaxed = function(){
	return this.dist;
}
