const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const msg = document.getElementById('message');
const bgMusic = document.getElementById('bgMusic');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 1. List your 6 filenames (must match exactly on GitHub)
const photoFiles = [
    'mom.1.jpg', 
    'mom.2.jpg', 
    'mom.3.jpg', 
    'mom.4.jpg', 
    'mom.5.jpg', 
    'mom.6.jpg'
];

function spawnPhoto() {
    const img = document.createElement('img');
    img.src = photoFiles[Math.floor(Math.random() * photoFiles.length)];
    img.className = 'mom-photo';
    
    // Logic to place photos around the centered title
    let x, y;
    const side = Math.random();
    
    if (side < 0.25) { // Left side
        x = Math.random() * (window.innerWidth * 0.25);
        y = Math.random() * (window.innerHeight - 250);
    } else if (side < 0.5) { // Right side
        x = (window.innerWidth * 0.7) + (Math.random() * (window.innerWidth * 0.2));
        y = Math.random() * (window.innerHeight - 250);
    } else if (side < 0.75) { // Top area
        x = Math.random() * (window.innerWidth - 250);
        y = Math.random() * (window.innerHeight * 0.25);
    } else { // Bottom area
        x = Math.random() * (window.innerWidth - 250);
        y = (window.innerHeight * 0.7) + (Math.random() * (window.innerHeight * 0.2));
    }

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;

    document.body.appendChild(img);

    // Fade animation
    setTimeout(() => { img.style.opacity = '1'; }, 100);
    setTimeout(() => { img.style.opacity = '0'; }, 4000); 
    setTimeout(() => { img.remove(); }, 6500);
}

function startShow() {
    document.getElementById('overlay').style.display = 'none';
    msg.style.visibility = 'visible';
    bgMusic.play();
    
    setInterval(spawnPhoto, 2500); // New photo every 2.5 seconds
    setInterval(createFirework, 700);
    animate();
}

// Firework Particle Logic
class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 };
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
        this.alpha -= 0.015;
    }
}

let particles = [];
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        if (p.alpha > 0) { p.update(); p.draw(); } 
        else { particles.splice(i, 1); }
    });
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, color));
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
