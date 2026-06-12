import React from 'react';

export function Skeleton({ className = '', style = {} }) {
  return (
    <div className={`skeleton-pulse ${className}`} style={{ ...style }}></div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} style={{ height: '1rem', width: i === lines - 1 ? '70%' : '100%' }} />
      ))}
    </div>
  );
}
