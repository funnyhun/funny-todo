'use client';

import React from 'react';
import { styles } from './Button.style';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'ghost';
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  style = {},
  ...props 
}) => {
  const variantStyle = styles[variant] || {};
  const combinedStyle: React.CSSProperties = {
    ...styles.button,
    ...variantStyle,
    ...style,
  };

  return (
    <button 
      className={`glass-button ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </button>
  );
};
