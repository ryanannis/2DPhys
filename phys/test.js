var canvas;
var testInstance;

//-------------------------------------------------WEB BROWSER INTERFACING----------------------------------------//


/*
* Gets a scheduler for ticking the game from the web browser
*/
var frame = window.requestAnimationFrame 
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| function(callback) { window.setTimeOut(callback, 1000/60); };

window.onload = function() {
	canvas = document.getElementById("phys");
	canvas.width = 800;
	canvas.height = 800;
	testInstance = new Test(canvas.getContext('2d'));
	tick(); //Initial tick for the game
	
	//One-run testing stuff

};

/*
* Rendering loop
*/
var tick = function() {
	frame(tick);
	testInstance.update();
}

//-----------------------------------------TESTING/IMPLEMENTATION CLASS----------------------------------------//

var Test = function(context){
	var scale = 1;
	this.ctx = context;
	this.CollidableList = new Array();
	this.sys = new ParticleSystem(this.ctx.canvas.width-5, this.ctx.canvas.height-5, 0, 0.97); //2d
	var a = new Particle(new Vector3(200,200,50), new Vector3(0,0,0), 1, true);
	var b = new Particle(new Vector3(250,180,50), new Vector3(0,0,0), 1, false);
	var c = new Particle(new Vector3(150,250,50), new Vector3(0,0,0), 1, false);
	
	var c1 = new Constraint(1, 200, 0.95, a, b);
	var c2 = new Constraint(1, 200, 0.95, b, c);
	var c3 = new Constraint(1, 200, 0.95, a, c);
	this.sys.addConstraint(c1);
	this.sys.addConstraint(c2);
	this.sys.addConstraint(c3);


	this.sys.addParticle(a);
	this.sys.addParticle(b);
	this.sys.addParticle(c);
}

Test.prototype.update = function(){
	this.sys.step(1/60);
	this._render();
	var particleList = this.sys.getParticleList();
	for(var i = 0; i< particleList.length; i++){
	}
}

Test.prototype._render = function(){
	this._renderBG();
	this._drawAllParticles();
	this._drawAllConstraints();
	this._renderButtons();
}

Test.prototype._drawAllParticles = function(){
	var particleList = this.sys.getParticleList();
	for(var i = 0; i< particleList.length; i++){
		this.drawParticle(particleList[i]);
	}
}

Test.prototype._drawAllConstraints = function(){
	var constraintList = this.sys.getConstraintList();
	for(var i = 0; i< constraintList.length; i++){
		this.drawConstraint(constraintList[i]);
	}
}

Test.prototype.drawParticle = function(particle){	
	var x = particle.position.getX();	
	var y = particle.position.getY();	
	var z = particle.position.getZ();	
	this.ctx.beginPath();	
	this.ctx.arc(x, y, 5, 0, 2 * Math.PI, false);	
	if(particle.isFixed()){	
		this.ctx.fillStyle = "#B20000";	
	}else{	
		this.ctx.fillStyle = "#3366FF";	
	}	
	this.ctx.fill();	
}

Test.prototype.drawConstraint = function(constraint){
	var x = constraint.getParticleA().position.getX();
	var y = constraint.getParticleA().position.getY();
	var z = constraint.getParticleA().position.getZ();
	var sx = constraint.getParticleB().position.getX();
	var sy = constraint.getParticleB().position.getY();
	var sz = constraint.getParticleB().position.getZ();
	this.ctx.beginPath();
	this.ctx.moveTo(x,y);
	this.ctx.lineTo(sx,sy);
	this.ctx.stroke();
}


Test.prototype._renderBG = function(){
	this.ctx.fillStyle = "#e8e8e8";
	this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Test.prototype._renderButtons = function(){
	this.ctx.fillStyle = "#B20000";
	this.ctx.fillRect(this.ctx.canvas.width-40, 20, 20, 20);
}