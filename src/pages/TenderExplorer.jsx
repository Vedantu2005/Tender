import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { Search, Filter, SlidersHorizontal, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TenderExplorer() {
  const [filters, setFilters] = useState({ search: '', category: '', status: '' });
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const { data: tenders, loading, error, execute } = useApi(api.getTenders, filters, true);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: debouncedSearch }));
    }, 500);
    return () => clearTimeout(handler);
  }, [debouncedSearch]);

  if (error) return <ErrorState onRetry={() => execute(filters)} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Tender Explorer</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Advanced search and filtering for all extracted tenders</p>
        </div>
        <button className="btn btn-primary" disabled={loading || !tenders?.length}>
          <Download size={16} /> Export Data
        </button>
      </div>

      <Card noPadding={true}>
        {/* Toolbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', border: '1px solid var(--color-border)' }}>
            <Search size={18} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search by ID, Title, or keywords..." 
              value={debouncedSearch}
              onChange={(e) => setDebouncedSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', fontSize: '0.875rem', color: 'inherit' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--color-text-muted)" />
            <select 
              value={filters.category} 
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              style={{ padding: '0.5rem', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'inherit' }}
            >
              <option value="">All Categories</option>
              <option value="Defense">Defense</option>
              <option value="Aerospace">Aerospace</option>
              <option value="Communications">Communications</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Software">Software</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select 
              value={filters.status} 
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              style={{ padding: '0.5rem', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'inherit' }}
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Expiring Soon">Expiring Soon</option>
            </select>
          </div>
          
          <button className="btn btn-outline" style={{ marginLeft: 'auto' }}>
            <SlidersHorizontal size={16} /> Columns
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(100,116,139,0.05)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Tender ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Title & Category</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Portal & State</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Value</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Dates</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>AI Match</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <td key={i} style={{ padding: '1rem 1.5rem' }}><Skeleton style={{ height: '20px', width: '80%' }} /></td>
                    ))}
                  </tr>
                ))
              ) : tenders?.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                tenders?.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(100,116,139,0.02)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                      <Link to={`/tender/${row.id}`} style={{ color: 'var(--color-secondary)' }}>{row.id}</Link>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 500, maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {row.title}
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', fontWeight: 400 }}>{row.category}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                      {row.portal}
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{row.state}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>{row.value}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                      <div>Pub: {row.pubDate}</div>
                      <div style={{ color: row.status === 'Expiring Soon' ? 'var(--color-critical)' : 'var(--color-warning)', marginTop: '0.25rem' }}>Close: {row.closeDate}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <Badge variant={row.score >= 90 ? 'success' : row.score >= 80 ? 'info' : 'warning'}>{row.score}%</Badge>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <Link to={`/tender/${row.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                        <Eye size={14} /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && tenders?.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            <div>Showing 1 to {tenders.length} of {tenders.length} entries</div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.25rem' }} disabled><ChevronLeft size={16}/></button>
              <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem' }}>1</button>
              <button className="btn btn-outline" style={{ padding: '0.25rem' }} disabled><ChevronRight size={16}/></button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
