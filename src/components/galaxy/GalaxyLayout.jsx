import React, { forwardRef } from 'react';
import './GalaxyLayout.css';

const createLayout = (className) => forwardRef(({ as: Tag = 'div', ...props }, ref) => (
    <Tag ref={ref} {...props} className={`${className} ${props.className || ''}`} />
));

export const GalaxyBox = createLayout('galaxy-box');
export const GalaxyCenter = createLayout('galaxy-center');
export const GalaxyContainer = createLayout('galaxy-container');
export const GalaxySpacer = () => <div className="galaxy-spacer" />;

export const GalaxyFlex = forwardRef(({ direction = 'row', align, justify, wrap, gap, ...props }, ref) => (
    <div ref={ref} {...props} className={`galaxy-flex ${props.className || ''}`} style={{
        flexDirection: direction, alignItems: align, justifyContent: justify, flexWrap: wrap,
        gap: gap !== undefined ? `${gap * 0.25}rem` : undefined, ...props.style
    }} />
));

export const GalaxyStack = forwardRef(({ spacing = 2, ...props }, ref) => (
    <GalaxyFlex ref={ref} gap={spacing} {...props} className={`galaxy-stack ${props.className || ''}`} />
));

export const GalaxyGrid = forwardRef(({ templateColumns, gap = 4, ...props }, ref) => (
    <div ref={ref} {...props} className={`galaxy-grid ${props.className || ''}`} style={{
        gridTemplateColumns: templateColumns, gap: gap !== undefined ? `${gap * 0.25}rem` : undefined, ...props.style
    }} />
));

export const GalaxyGridItem = forwardRef(({ colSpan, rowSpan, ...props }, ref) => (
    <div ref={ref} {...props} className={`galaxy-grid-item ${props.className || ''}`} style={{
        gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
        gridRow: rowSpan ? `span ${rowSpan} / span ${rowSpan}` : undefined, ...props.style
    }} />
));

export const GalaxyDivider = forwardRef(({ orientation = 'horizontal', ...props }, ref) => (
    <hr ref={ref} {...props} className={`galaxy-divider ${orientation} ${props.className || ''}`} />
));

export const GalaxyAspectRatio = forwardRef(({ ratio = 4 / 3, children, ...props }, ref) => (
    <div ref={ref} {...props} className={`relative w-full ${props.className || ''}`} style={{ paddingBottom: `${(1 / ratio) * 100}%`, ...props.style }}>
        <div className="absolute inset-0">{children}</div>
    </div>
));
