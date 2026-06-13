import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { BrainCircuit, Target, Lightbulb, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const radarData = [
  { subject: 'Keywords', A: 95, fullMark: 100 },
  { subject: 'Category', A: 85, fullMark: 100 },
  { subject: 'Value Range', A: 90, fullMark: 100 },
  { subject: 'Location', A: 70, fullMark: 100 },
  { subject: 'Requirements', A: 88, fullMark: 100 },
];

export function AIMatching() {
  const { data: tenders, loading, error, execute } = useApi(api.getTenders);

  if (error) return <ErrorState onRetry={execute} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>AI Matching Engine</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Deep semantic analysis of incoming procurement opportunities</p>
        </div>
      </div>

      <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
        {/* Radar Chart */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Target size={20} color="var(--color-accent)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Matching Vector Analysis</h3>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Match" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '1rem' }}>Overall organizational fit based on semantic vectors.</p>
        </Card>

        {/* Global Explanation */}
        <Card style={{ borderTop: '4px solid var(--color-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BrainCircuit size={20} color="var(--color-secondary)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>AI System Status</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <Zap size={20} color="var(--color-secondary)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Real-time Processing Active</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  The AI matching engine is currently analyzing 1,249 new tenders today across 48 portals. Average processing time per document is 1.2s.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <Lightbulb size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Keyword Optimization Suggestion</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  Adding the keyword "Unmanned Aerial" could increase match accuracy by 4.2% in the Aerospace category.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <TrendingUp size={20} color="var(--color-warning)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Emerging Trend Detected</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  There is a 15% increase in tenders requesting "FedRAMP" compliance this quarter.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1rem 0' }}>Top Recommended Tenders</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))', gap: '1.5rem' }}>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <SkeletonText lines={5} />
              </Card>
            ))
          ) : (
            tenders?.slice(0, 3).map(tender => (
              <Card key={tender.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Badge variant={tender.score >= 90 ? 'success' : 'warning'}>{tender.score}% Match</Badge>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{tender.category}</span>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 0.25rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={tender.title}>
                    {tender.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>{tender.organization}</p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {tender.keywords.slice(0, 3).map((kw, idx) => (
                    <Badge key={idx} variant="info" className="badge-default">{kw}</Badge>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                  <Link to={`/tender/${tender.id}`} className="btn btn-outline" style={{ width: '100%' }}>View Full Analysis</Link>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
