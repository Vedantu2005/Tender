import React from 'react';

export function Card({ children, className = '', noPadding = false }) {
  return (
    <div className={`glass-panel ${noPadding ? '' : 'p-4'} ${className}`} style={noPadding ? {} : { padding: '1.5rem' }}>
      {children}
    </div>
  );
}
