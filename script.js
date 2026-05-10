const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const msg = document.getElementById('message');
const bgMusic = document.getElementById('bgMusic');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// FILENAMES: Must match your GitHub names exactly
const photoFiles = ['Mom.1.jpg', 'Mom.2.jpg', 'Mom.3.jpg', 'Mom.4.jpg', 'Mom.5.jpg', 'Mom.6.jpg'];

function spawnPhoto() {
    const img = document.createElement('img');
    const randomFile = photoFiles[Math.floor(Math.random() * photoFiles.length)];
    img.src = './' + randomFile; 
    img.className = 'mom-photo';
    
    // Random placement around the center
    let x = Math.random() < 0.5 ? Math.random() * (window.innerWidth * 0.2) : (window.innerWidth * 0.75) + Math.random() * (window.innerWidth * 0.1);
    let y = Math.random() * (window.innerHeight - 300);

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;

    document.body.appendChild(img);

    // Fade in and out
    setTimeout(() => { img.style.opacity = '1'; }, 100);    
    setTimeout(() => { img.style.opacity = '0'; }, 5500);   
    setTimeout(() => { img.remove(); }, 9000);              
}

function startShow() {
    document.getElementById('overlay').style.display = 'none';
    msg.style.visibility = 'visible';
    bgMusic.play().catch(e => console.error("Music error:", e));

    // Spawn first photo immediately
    spawnPhoto(); 
    
    // Set intervals
    setInterval(spawnPhoto, 4000); 
    setInterval(createFirework, 700);
    
    animate();
}

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 12, y: (Math.random() - 0.5) * 12 };
        this.alpha = 1; this.friction = 0.96;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
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
    
    // Clear canvas every frame to keep the sunset ombre visible
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, i) => {
        if (p.alpha > 0) { p.update(); p.draw(); } 
        else { particles.splice(i, 1); }
    });
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height; // FULL SCREEN
    const color = `hsl(${Math.random() * 360}, 100%, 80%)`;
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, color));
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


