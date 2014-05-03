add = function(url) {
    var header = document.getElementsByTagName("head")[0];         
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    header.appendChild(script);
}

add("phys/Vector3/Vector3.js");
add("phys/Utility/Constants.js");
add("phys/Vector3/Vector3Ops.js");
add("phys/Particle/Particle.js");
add("phys/Particle/Constraint.js");
add("phys/Particle/ParticleSystem.js");