import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { 
  ArrowLeft, Download, Bookmark, Share2, FileText, 
  BrainCircuit, ShieldAlert, CheckCircle2, Calendar, 
  MapPin, Briefcase, DollarSign, BookmarkCheck
} from 'lucide-react';

export function TenderDetails() {
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  
  const { data: tender, loading, error, execute } = useApi(api.getTenderById, id, false);
  const { data: similarTenders, loading: similarLoading, execute: fetchSimilar } = useApi(api.getTenders, {}, false);

  useEffect(() => {
    execute();
    fetchSimilar();
    window.scrollTo(0, 0);
  }, [id, execute, fetchSimilar]);

  if (error) return <ErrorState onRetry={() => execute()} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/explorer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Explorer
        </Link>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" disabled={loading}><Download size={16} /> Download PDF</button>
          <button className="btn btn-outline" disabled={loading}><Share2 size={16} /> Share</button>
          <button 
            className={`btn ${saved ? 'btn-primary' : 'btn-outline'}`} 
            disabled={loading}
            onClick={() => setSaved(!saved)}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />} 
            {saved ? 'Saved' : 'Save Tender'}
          </button>
        </div>
      </div>

      <div className="grid-details">
        
        {/* Left Column: Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <Card>
            {loading ? (
              <SkeletonText lines={10} />
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{tender?.id}: {tender?.title}</h1>
                      <Badge variant={tender?.status === 'Open' ? 'success' : 'warning'}>{tender?.status}</Badge>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{tender?.organization}</p>
                  </div>
                </div>

                <div className="grid-cols-4" style={{ gap: '1rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={14}/> Est. Value</span>
                    <span style={{ fontWeight: 600 }}>{tender?.value}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14}/> Deadline</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-warning)' }}>{tender?.closeDate}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14}/> Location</span>
                    <span style={{ fontWeight: 600 }}>{tender?.state}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14}/> Category</span>
                    <span style={{ fontWeight: 600 }}>{tender?.category}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Description</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {tender?.description}
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Technical Requirements</h3>
                  <ul style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, paddingLeft: '1.5rem', margin: 0 }}>
                    {tender?.requirements?.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Documents</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {tender?.documents?.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                        <FileText size={18} color="var(--color-secondary)" />
                        <span style={{ flex: 1, fontSize: '0.875rem' }}>{doc.name} ({doc.size})</span>
                        <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Similar Tenders */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Similar Tenders</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {similarLoading ? (
                <SkeletonText lines={4} />
              ) : (
                similarTenders?.filter(t => t.id !== id).slice(0, 2).map(t => (
                  <Card key={t.id} style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Link to={`/tender/${t.id}`} style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>{t.title}</Link>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{t.organization}</div>
                      </div>
                      <Badge variant="info">{t.score}% Match</Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: AI Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <Card style={{ borderTop: '4px solid var(--color-accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <BrainCircuit size={20} color="var(--color-accent)" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>AI Intelligence Analysis</h2>
            </div>

            {loading ? (
              <SkeletonText lines={6} />
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px', borderRadius: '50%', background: `conic-gradient(var(--color-accent) ${tender?.score}%, var(--color-background) 0)`, position: 'relative' }}>
                    <div style={{ position: 'absolute', width: '100px', height: '100px', backgroundColor: 'var(--color-card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1 }}>{tender?.score}%</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Match Score</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Opportunity Rating</span>
                    <Badge variant="success">Excellent</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Risk Assessment</span>
                    <Badge variant="info">Low Risk</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Competitor Probability</span>
                    <Badge variant="warning">Medium</Badge>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Matched Keywords</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {tender?.keywords?.map((kw, idx) => (
                      <Badge key={idx} variant="info">{kw}</Badge>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(37, 99, 235, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
                    <CheckCircle2 size={16} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Recommendation</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    Highly recommend pursuing. Technical requirements align perfectly with our product line. 
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
