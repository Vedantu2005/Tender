import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { 
  FileText, Calendar, BrainCircuit, AlertTriangle, 
  Activity, Mail, TrendingUp, TrendingDown, ArrowRight, Bookmark
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const generateSparklineData = () => Array.from({ length: 10 }, (_, i) => ({ value: Math.floor(Math.random() * 100) + 20 }));

export function Dashboard() {
  const { data: stats, loading: statsLoading, error: statsError, execute: fetchStats } = useApi(api.getDashboardStats);
  const { data: tenders, loading: tendersLoading, error: tendersError, execute: fetchTenders } = useApi(api.getTenders);

  if (statsError || tendersError) {
    return <ErrorState onRetry={() => { fetchStats(); fetchTenders(); }} />;
  }

  const statCardsConfig = [
    { key: 'totalTenders', title: 'Total Tenders', icon: FileText, trend: '+12%', isPositive: true },
    { key: 'newToday', title: 'New Today', icon: Calendar, trend: '+5.2%', isPositive: true },
    { key: 'aiMatched', title: 'AI-Matched Tenders', icon: BrainCircuit, trend: '+18%', isPositive: true },
    { key: 'highPriority', title: 'High Priority Opportunities', icon: AlertTriangle, trend: '-2.1%', isPositive: false },
    { key: 'activePortals', title: 'Active Portals', icon: Activity, trend: '0%', isPositive: true },
    { key: 'alertsSent', title: 'Email Alerts Sent', icon: Mail, trend: '+24%', isPositive: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Section */}
      <div className="glass-panel" style={{ 
        padding: '2rem', 
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.05))', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--color-text-main)' }}>
            Government Tender Intelligence Center
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', margin: 0, maxWidth: '800px' }}>
            Monitor, analyze, and track procurement opportunities across multiple defense and government portals in real-time.
          </p>
        </div>
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', opacity: 0.1 }}>
          <BrainCircuit size={300} />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid-cols-3" style={{ gap: '1.5rem' }}>
        {statCardsConfig.map((config, idx) => (
          <Card key={idx} className="flex flex-col gap-4">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: 'var(--radius-md)' }}>
                  <config.icon size={20} color="var(--color-secondary)" />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{config.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: config.isPositive ? 'var(--color-accent)' : 'var(--color-critical)' }}>
                {config.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {config.trend}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                {statsLoading ? <Skeleton style={{ width: '100px', height: '2rem' }} /> : stats?.[config.key]?.toLocaleString()}
              </div>
              
              <div style={{ width: '80px', height: '40px' }}>
                {!statsLoading && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateSparklineData()}>
                      <defs>
                        <linearGradient id={`colorUv${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={config.isPositive ? 'var(--color-accent)' : 'var(--color-critical)'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={config.isPositive ? 'var(--color-accent)' : 'var(--color-critical)'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke={config.isPositive ? 'var(--color-accent)' : 'var(--color-critical)'} fillOpacity={1} fill={`url(#colorUv${idx})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Intelligence Panel */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <BrainCircuit size={24} color="var(--color-accent)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>AI Recommended Opportunities</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tendersLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <SkeletonText lines={4} />
              </Card>
            ))
          ) : (
            tenders?.filter(t => t.score > 80).slice(0, 3).map(rec => (
              <Card key={rec.id} style={{ borderLeft: '4px solid var(--color-accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>{rec.title}</h3>
                      <Badge variant={rec.score >= 90 ? 'success' : 'warning'}>{rec.score}% Match</Badge>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                      <span><strong>Category:</strong> {rec.category}</span>
                      <span><strong>Value:</strong> {rec.value}</span>
                      <span><strong>Deadline:</strong> {rec.closeDate}</span>
                    </div>
                    
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: 'var(--color-accent)' }}>
                        <BrainCircuit size={14} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>AI Explanation</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-main)' }}>
                        Matched keywords: {rec.keywords.slice(0, 3).join(', ')}. Strong alignment with requirements.
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '140px' }}>
                    <Link to={`/tender/${rec.id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                      View Tender
                      <ArrowRight size={16} />
                    </Link>
                    <button className="btn btn-outline">
                      <Bookmark size={16} />
                      Save Tender
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
