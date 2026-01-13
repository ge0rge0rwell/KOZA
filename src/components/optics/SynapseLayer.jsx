import React, { useEffect, useRef, useState } from 'react';

const SynapseLayer = () => {
    const canvasRef = useRef(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const signals = useRef([]); // Pulse signals traveling along threads

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const draw = () => {
            const width = canvas.width = window.innerWidth;
            const height = canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, width, height);

            const elements = document.querySelectorAll('.uiverse-card, button, input');

            elements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);

                if (dist < 400) {
                    const alpha = (1 - dist / 400) * 0.15;

                    // Bezier Path
                    const cpX = (mouse.x + centerX) / 2 + (Math.sin(Date.now() / 1000 + index) * 50);
                    const cpY = (mouse.y + centerY) / 2 + (Math.cos(Date.now() / 1000 + index) * 50);

                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.quadraticCurveTo(cpX, cpY, centerX, centerY);
                    ctx.strokeStyle = `rgba(0, 122, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Neural Signal (Pulsar)
                    if (Math.random() < 0.02) {
                        signals.current.push({
                            t: 0,
                            speed: 0.02 + Math.random() * 0.02,
                            p1: { x: mouse.x, y: mouse.y },
                            p2: { x: cpX, y: cpY },
                            p3: { x: centerX, y: centerY },
                            alpha: alpha * 2
                        });
                    }

                    // Node
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 122, 255, ${alpha * 2})`;
                    ctx.fill();
                }
            });

            // Update and draw signal pulses
            signals.current = signals.current.filter(s => s.t < 1);
            signals.current.forEach(s => {
                const t = s.t;
                const x = (1 - t) ** 2 * s.p1.x + 2 * (1 - t) * t * s.p2.x + t ** 2 * s.p3.x;
                const y = (1 - t) ** 2 * s.p1.y + 2 * (1 - t) * t * s.p2.y + t ** 2 * s.p3.y;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 6);
                grad.addColorStop(0, `rgba(0, 122, 255, ${s.alpha})`);
                grad.addColorStop(1, 'rgba(0, 122, 255, 0)');
                ctx.fillStyle = grad;
                ctx.fill();

                s.t += s.speed;
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, [mouse]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9997]"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default SynapseLayer;
