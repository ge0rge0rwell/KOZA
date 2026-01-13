import React, { useEffect, useState } from 'react';

const StatusWaveform = () => {
    const [bars, setBars] = useState(Array.from({ length: 12 }, () => 20));

    useEffect(() => {
        const interval = setInterval(() => {
            setBars(prev => prev.map(() => Math.random() * 30 + 10));
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-1 h-8 px-4 py-2 liquid-glass rounded-full border-none opacity-50">
            {bars.map((height, i) => (
                <div
                    key={i}
                    className="w-0.5 bg-primary-500/60 rounded-full transition-all duration-150"
                    style={{ height: `${height}%` }}
                />
            ))}
        </div>
    );
};

export default StatusWaveform;
