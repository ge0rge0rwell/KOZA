import React, { forwardRef } from 'react';
import './GalaxyTypography.css';

const createTypography = (Tag, baseClass) => forwardRef(({ size = 'md', gradient, isTruncated, className = '', ...props }, ref) => (
    <Tag
        ref={ref}
        className={`${baseClass} size-${size} ${gradient ? 'galaxy-gradient-text' : ''} ${isTruncated ? 'truncate' : ''} ${className}`}
        {...props}
    />
));

export const GalaxyHeading = createTypography('h2', 'galaxy-heading');
export const GalaxyText = createTypography('p', 'galaxy-text');
export const GalaxyCode = forwardRef((props, ref) => <code ref={ref} {...props} className={`galaxy-code ${props.className || ''}`} />);
export const GalaxyKbd = forwardRef((props, ref) => <kbd ref={ref} {...props} className={`galaxy-kbd ${props.className || ''}`} />);
export const GalaxyBlockquote = forwardRef((props, ref) => <blockquote ref={ref} {...props} className={`galaxy-blockquote ${props.className || ''}`} />);

export const GalaxyLabel = forwardRef(({ required, className = '', ...props }, ref) => (
    <label ref={ref} className={`galaxy-label ${className}`} {...props}>
        {props.children}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
));

export const GalaxyList = forwardRef(({ as: Tag = 'ul', spacing = 2, styleType = 'none', className = '', ...props }, ref) => (
    <Tag ref={ref} className={`galaxy-list ${className}`} style={{ listStyleType: styleType, gap: `${spacing * 0.25}rem` }} {...props} />
));

export const GalaxyListItem = forwardRef((props, ref) => <li ref={ref} {...props} className={`galaxy-list-item ${props.className || ''}`} />);

