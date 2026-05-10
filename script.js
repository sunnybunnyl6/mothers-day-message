const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const msg = document.getElementById('message');
const bgMusic = document.getElementById('bgMusic');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const photoFiles = [
    'Mom.1.jpg', 
    'Mom.2.jpg', 
    'Mom.3.jpg', 
    'Mom.4.jpg', 
    'Mom.5.jpg', 
    'Mom.6.jpg'
];

function spawnPhoto() {
    const img = document.createElement('img');
    // Ensure variety by picking a truly random index
    const randomFile = photoFiles[Math.floor(Math.random() * photoFiles.length)];
    img.src = randomFile;
    img.className = 'mom-photo';
    
    // Placement: Randomly around the edges of the screen
    let x = Math.random() < 0.5 ? Math.random() * (window.innerWidth * 0.2) : (window.innerWidth * 0.75) + Math.random() * (window.innerWidth * 0.15);
    let y = Math.random() * (window.innerHeight - 300);

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;

    document.body.appendChild(img);

    // BOLDER: Set opacity to 1 (full strength) and make it stay longer
    setTimeout(() => { img.style.opacity = '1'; }, 100);    
    setTimeout(() => { img.style.opacity = '0'; }, 6000);   // Stays for 6 seconds
    setTimeout(() => { img.remove(); }, 9000);              
}

function startShow() {
    document.getElementById('overlay').style.display = 'none';
    msg.style.visibility = 'visible';
    bgMusic.play().catch(e => console.error("Audio error:", e));
    
    // IMMEDIATE PHOTO: Spawn one right away so the screen isn't empty
    spawnPhoto(); 
    
    // Create new photos every 4 seconds
    setInterval(spawnPhoto, 4000); 
    // Create new fireworks every 0.6 seconds
    setInterval(createFirework, 600);
    
    animate();
}

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 12 };
        this.alpha = 1; this.friction = 0.95;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.fill();
    }
    update() {
        this.velocity.x *= this.friction; this.velocity.y *= this.friction;
        this.x += this.velocity.x; this.y += this.velocity.y;
        this.alpha -= 0.01; // Slower fade for firework particles
    }
}

let particles = [];
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        if (p.alpha > 0) { p.update(); p.draw(); } 
        else { particles.splice(i, 1); }
    });
}

function createFirework() {
    const x = Math.random() * canvas.width;
    // FULL SCREEN: Removed the division by 2 so fireworks appear everywhere
    const y = Math.random() * canvas.height; 
    const color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, color));
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


