import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton } from '../components/Skeleton';
import { Activity, Server, Clock, Database, CheckCircle2, AlertTriangle, Play, Square, RotateCw } from 'lucide-react';

const mockPortals = [
  { id: 1, name: 'Defense E-Procurement', status: 'Healthy', lastRun: '5 mins ago', nextRun: 'in 55 mins', successRate: '99.8%', records: 12450 },
  { id: 2, name: 'Homeland Security Tenders', status: 'Healthy', lastRun: '15 mins ago', nextRun: 'in 45 mins', successRate: '98.5%', records: 8320 },
  { id: 3, name: 'Army Contracting Command', status: 'Warning', lastRun: '2 hours ago', nextRun: 'in 4 hours', successRate: '92.1%', records: 4100 },
  { id: 4, name: 'Naval Supply Systems', status: 'Healthy', lastRun: '10 mins ago', nextRun: 'in 50 mins', successRate: '99.9%', records: 9540 },
  { id: 5, name: 'Cyber Command Acquisitions', status: 'Error', lastRun: '5 hours ago', nextRun: 'Manual', successRate: '45.0%', records: 890 },
];

export function PortalMonitoring() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Portal Monitoring</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Real-time health status of data extraction scrapers</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" disabled={loading}><RotateCw size={16} /> Refresh Status</button>
          <button className="btn btn-primary" disabled={loading}><Play size={16} /> Run All Scrapers</button>
        </div>
      </div>

      <div className="grid-cols-4" style={{ gap: '1.5rem' }}>
        <Card className="flex flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <Server size={16} /> <span style={{ fontSize: '0.875rem' }}>Active Scrapers</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{loading ? <Skeleton style={{width:'50px', height:'30px'}}/> : 48}</div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <Activity size={16} /> <span style={{ fontSize: '0.875rem' }}>Global Health</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent)' }}>{loading ? <Skeleton style={{width:'50px', height:'30px'}}/> : '94.2%'}</div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <Database size={16} /> <span style={{ fontSize: '0.875rem' }}>Records Extracted (24h)</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{loading ? <Skeleton style={{width:'50px', height:'30px'}}/> : '3,492'}</div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <AlertTriangle size={16} /> <span style={{ fontSize: '0.875rem' }}>Failed Tasks</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-critical)' }}>{loading ? <Skeleton style={{width:'50px', height:'30px'}}/> : 2}</div>
        </Card>
      </div>

      <Card noPadding={true}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Scraper Targets</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(100,116,139,0.05)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Portal Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Last Run</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Next Run</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Success Rate</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} style={{ padding: '1rem 1.5rem' }}><Skeleton style={{ height: '20px', width: '80%' }} /></td>
                    ))}
                  </tr>
                ))
              ) : mockPortals.map((portal) => (
                <tr key={portal.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Server size={16} color="var(--color-secondary)" />
                    {portal.name}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {portal.status === 'Healthy' && <Badge variant="success"><CheckCircle2 size={12} style={{ marginRight: '0.25rem' }}/> Healthy</Badge>}
                    {portal.status === 'Warning' && <Badge variant="warning"><AlertTriangle size={12} style={{ marginRight: '0.25rem' }}/> Warning</Badge>}
                    {portal.status === 'Error' && <Badge variant="critical"><AlertTriangle size={12} style={{ marginRight: '0.25rem' }}/> Error</Badge>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} /> {portal.lastRun}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{portal.nextRun}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--color-background)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: portal.successRate, backgroundColor: portal.status === 'Healthy' ? 'var(--color-accent)' : portal.status === 'Warning' ? 'var(--color-warning)' : 'var(--color-critical)' }}></div>
                      </div>
                      <span>{portal.successRate}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '0.5rem' }} title="Run Now"><Play size={14} /></button>
                      <button className="btn btn-outline" style={{ padding: '0.5rem' }} title="Stop"><Square size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}
