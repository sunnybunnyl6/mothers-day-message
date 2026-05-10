    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const msg = document.getElementById('message');
    const bgMusic = document.getElementById('bgMusic');
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 1. YOUR PHOTO LIST (Must match GitHub filenames exactly)
    const photoFiles = ['mom.1.jpg', 'mom.2.jpg', 'mom.3.jpg', 'mom.4.jpg', 'mom.5.jpg', 'mom.6.jpg'];

    // 2. PHOTO SPAWNING LOGIC
    function spawnPhoto() {
        const img = document.createElement('img');
        img.src = photoFiles[Math.floor(Math.random() * photoFiles.length)];
        img.className = 'mom-photo';
        
        // Random placement avoiding edges
        img.style.left = `${Math.random() * (window.innerWidth - 250)}px`;
        img.style.top = `${150 + Math.random() * (window.innerHeight - 400)}px`;
        img.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg)`;

        document.body.appendChild(img);

        // Animation sequence: Fade in -> Wait -> Fade out -> Delete
        setTimeout(() => { img.style.opacity = '1'; }, 100);    
        setTimeout(() => { img.style.opacity = '0'; }, 4000);   
        setTimeout(() => { img.remove(); }, 6500);              
    }

    // 3. START BUTTON ACTION
    function startShow() {
        document.getElementById('overlay').style.display = 'none';
        msg.style.visibility = 'visible';
        bgMusic.play(); // Starts the music.mp3
        
        setInterval(spawnPhoto, 3000);   // New photo every 3 seconds
        setInterval(createFirework, 700); // New firework every 0.7 seconds
        animate();
    }

    // 4. FIREWORK PARTICLE CLASS
    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            this.velocity = { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 };
            this.alpha = 1; 
            this.friction = 0.95; // Slows down particles over time
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color; ctx.fill();
        }
        update() {
            this.velocity.x *= this.friction; this.velocity.y *= this.friction;
            this.x += this.velocity.x; this.y += this.velocity.y;
            this.alpha -= 0.015; // Makes particles fade
        }
    }

    // 5. ANIMATION LOOP
    let particles = [];
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Creates the "trail" effect
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
