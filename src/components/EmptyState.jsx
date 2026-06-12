import React from 'react';
import { FileQuestion } from 'lucide-react';

export function EmptyState({ title = 'No Data Found', message = 'There are no records to display matching your criteria.', icon: Icon = FileQuestion }) {
  return (
    <div style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
        <Icon size={48} color="var(--color-text-muted)" />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', maxWidth: '400px', margin: 0 }}>{message}</p>
    </div>
  );
}
