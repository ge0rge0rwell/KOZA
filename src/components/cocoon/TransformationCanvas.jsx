import React, { useRef, useEffect } from 'react';

const TransformationCanvas = ({ color = '#9333EA', intensity = 1, active = true }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const particles = [];
        const particleCount = 40 * intensity;

        class ShardParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 8 + 2;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.1;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.life = Math.random() * 200 + 100;
                this.sides = Math.random() > 0.5 ? 3 : 4;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                this.life -= 1;
                if (this.life <= 0) this.reset();
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.beginPath();

                const step = (Math.PI * 2) / this.sides;
                ctx.moveTo(this.size, 0);
                for (let i = 1; i <= this.sides; i++) {
                    ctx.lineTo(this.size * Math.cos(step * i), this.size * Math.sin(step * i));
                }
                ctx.closePath();

                // Prismatic flash based on rotation
                const hue = (this.rotation * 50) % 360;
                ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${this.opacity})`;
                ctx.fill();

                // Edge highlight
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 2})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();

                ctx.restore();

                // Bloom
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new ShardParticle());
            }
        };

        const resize = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            init(); // Re-init on resize to match new dimensions
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [color, intensity, active]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default TransformationCanvas;
