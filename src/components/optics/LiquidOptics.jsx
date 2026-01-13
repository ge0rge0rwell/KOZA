import React from 'react';

const LiquidOptics = () => {
    return (
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true" focusable="false">
            <defs>
                <filter id="liquid-refraction">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="3" result="noise" seed="2" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
                </filter>

                <filter id="organic-morph">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="morph">
                        <animate attributeName="baseFrequency" values="0.015;0.025;0.015" dur="10s" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="morph" scale="15" xChannelSelector="R" yChannelSelector="B" />
                </filter>
            </defs>
        </svg>
    );
};

export default LiquidOptics;
