const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

window.onresize = () => {
    location.reload();
}

ctx.fillStyle = "pink";
ctx.fillRect(24, 12, 40, 40);

let particlesArray = [];


let mouse = {
    x: 0,
    y: 0,
    radius: 50
}

window.addEventListener('mousemove', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    //console.log(mouse.x, mouse.y);
})

class Particle{
    constructor(canvas){
        this.canvas = {height: canvas.height, width: canvas.width};
        this.radius = 7;
        this.init_radius = 7;
        this.color = 'rgb('+Math.random()*255+',' + Math.random()*255+','+ Math.random()*255+')';
        this.speed = Math.random()*6+2;
        this.direction = {x: 1, y: 1};
        this.position = {x: Math.random()*canvas.width, y: Math.random()*canvas.height};
        this.gravity = 1;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        //console.log("Updating");
        if (this.position.x >= this.canvas.width) this.direction.x = -1;
        else if (this.position.x <= 0) this.direction.x = 1;

        if (this.position.y >= this.canvas.height) this.direction.y = -1;
        else if (this.position.y <= 0) this.direction.y = 1;

        this.position.x += this.speed*this.direction.x;
        this.position.y += this.speed*this.direction.y;

        let dx = mouse.x - this.position.x;
        let dy = mouse.y - this.position.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        //console.log(distance);

        if (distance <= mouse.radius){
            this.radius = 10;
        }
        else{
            this.radius = this.init_radius;
        }
        
    }
}

const particle = new Particle(canvas);

const createParticles = () => {
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle(canvas));
    }
}



const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].draw(ctx);
        particlesArray[i].update();
    }
    
    requestAnimationFrame(animate);
}
/*
function drawPointerRadius(){
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
    requestAnimationFrame(drawPointerRadius);
}
*/
createParticles();
animate();
//drawPointerRadius();
