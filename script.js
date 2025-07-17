document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat, aktifkan
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Hentikan observasi setelah muncul
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Opsional: Efek partikel sederhana (tanpa library eksternal)
    // Jika Anda ingin efek partikel yang lebih canggih, pertimbangkan library seperti particles.js
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        let particles = [];
        const numParticles = 50;
        const colors = ['#38bdf8', '#fbbf24', '#f87171', '#a78bfa']; // Warna partikel

        function resizeCanvas() {
            particleCanvas.width = particleCanvas.parentElement.clientWidth;
            particleCanvas.height = particleCanvas.parentElement.clientHeight;
        }

        class Particle {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.vx = (Math.random() - 0.5) * 1; // Kecepatan horizontal
                this.vy = (Math.random() - 0.5) * 1; // Kecepatan vertikal
                this.alpha = 1;
                this.decay = 0.005; // Kecepatan memudar
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;

                if (this.alpha <= 0) {
                    // Reset partikel jika sudah memudar
                    this.x = Math.random() * particleCanvas.width;
                    this.y = Math.random() * particleCanvas.height;
                    this.radius = Math.random() * 2 + 1;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                    this.alpha = 1;
                    this.vx = (Math.random() - 0.5) * 1;
                    this.vy = (Math.random() - 0.5) * 1;
                }
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                const x = Math.random() * particleCanvas.width;
                const y = Math.random() * particleCanvas.height;
                const radius = Math.random() * 2 + 1;
                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, radius, color));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        // Inisialisasi
        resizeCanvas();
        initParticles();
        animateParticles();

        // Responsiivitas canvas
        window.addEventListener('resize', resizeCanvas);
    }
});

