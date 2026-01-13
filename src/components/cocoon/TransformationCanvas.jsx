import React, { useRef, useEffect } from 'react';

const TransformationCanvas = ({ color = '#9333EA', intensity = 1, active = true }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const particles = [];
        const particleCount = 60 * intensity;

        class ShardParticle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = initial ? Math.random() * canvas.width : (Math.random() > 0.5 ? -10 : canvas.width + 10);
                this.y = initial ? Math.random() * canvas.height : Math.random() * canvas.height;
                this.size = Math.random() * 6 + 2;
                this.baseSpeedX = (Math.random() - 0.5) * 2;
                this.baseSpeedY = (Math.random() - 0.5) * 2;
                this.vx = this.baseSpeedX;
                this.vy = this.baseSpeedY;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.05;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.life = Math.random() * 300 + 200;
                this.sides = Math.random() > 0.5 ? 3 : 4;
                this.history = [];
                this.maxHistory = 10;
            }

            update() {
                // Liquid forces towards/away from mouse
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const forceRange = 150;

                if (dist < forceRange) {
                    const force = (forceRange - dist) / forceRange;
                    this.vx += (dx / dist) * force * 0.5;
                    this.vy += (dy / dist) * force * 0.5;
                }

                // Friction and base velocity
                this.vx *= 0.95;
                this.vy *= 0.95;
                this.vx += this.baseSpeedX * 0.05;
                this.vy += this.baseSpeedY * 0.05;

                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotSpeed;
                this.life -= 1;

                // Add to history for trails
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) {
                    this.history.shift();
                }

                if (this.life <= 0 || this.x < -100 || this.x > canvas.width + 100 || this.y < -100 || this.y > canvas.height + 100) {
                    this.reset();
                }
            }

            draw() {
                // Draw trails
                if (this.history.length > 2) {
                    ctx.beginPath();
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                    ctx.strokeStyle = `hsla(${(this.rotation * 50) % 360}, 70%, 70%, ${this.opacity * 0.3})`;
                    ctx.lineWidth = this.size / 2;
                    ctx.stroke();
                }

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

                const hue = (this.rotation * 50) % 360;
                ctx.fillStyle = `hsla(${hue}, 85%, 60%, ${this.opacity})`;
                ctx.fill();

                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new ShardParticle());
            }
        };

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            init();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
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
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [color, intensity, active]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: 'normal' }}
        />
    );
};

export default TransformationCanvas;
