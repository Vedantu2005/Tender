import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorState({ title = 'Error Loading Data', message = 'Something went wrong while fetching the data.', onRetry }) {
  return (
    <div style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
        <AlertTriangle size={48} color="var(--color-critical)" />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-critical)' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', maxWidth: '400px', margin: '0 0 1.5rem 0' }}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={16} /> Retry
        </button>
      )}
    </div>
  );
}
