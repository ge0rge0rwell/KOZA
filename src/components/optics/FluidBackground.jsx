'use client';
import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 15;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 200 + 100;
                this.alpha = 0;
                this.targetAlpha = Math.random() * 0.08 + 0.02;
                this.color = Math.random() > 0.5 ? '#bde5ff' : '#e0f2ff';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.alpha < this.targetAlpha) this.alpha += 0.001;

                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
            }

            draw() {
                // Better color handling:
                const rgb = this.color === '#bde5ff' ? '189, 229, 255' : '224, 242, 255';
                const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                grad.addColorStop(0, `rgba(${rgb}, ${this.alpha})`);
                grad.addColorStop(1, `rgba(${rgb}, 0)`);

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = Array.from({ length: particleCount }, () => new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-50 contrast-125"
            style={{ filter: 'blur(60px)' }}
        />
    );
};

export default FluidBackground;
