import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { ErrorState } from '../components/ErrorState';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { Key, Plus, Search, Trash2, Edit2, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function KeywordIntelligence() {
  const { data: keywords, loading, error, execute, setData } = useApi(api.getKeywords);
  
  const [newKeyword, setNewKeyword] = useState('');
  const [newCategory, setNewCategory] = useState('Defense');
  const [isAdding, setIsAdding] = useState(false);

  if (error) return <ErrorState onRetry={execute} />;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    setIsAdding(true);
    try {
      const added = await api.addKeyword({ keyword: newKeyword, category: newCategory });
      setData(prev => [...prev, added]);
      setNewKeyword('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteKeyword(id);
      setData(prev => prev.filter(k => k.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Keyword Intelligence</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Manage and analyze semantic tracking terms</p>
        </div>
      </div>

      <div className="grid-details">
        
        {/* Left Column: Keyword Management */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Add New Keyword</h3>
            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Keyword / Phrase</label>
                <input 
                  type="text" 
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="e.g. Artificial Intelligence"
                  className="form-input"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="form-input"
                >
                  <option>Defense</option>
                  <option>Aerospace</option>
                  <option>Communications</option>
                  <option>Software</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1rem' }} disabled={isAdding}>
                {isAdding ? <Skeleton style={{ width: '16px', height: '16px', borderRadius: '50%' }} /> : <Plus size={18} />}
                Add
              </button>
            </form>
          </Card>

          <Card noPadding={true}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Active Tracking List</h3>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', padding: '0.25rem 0.75rem', border: '1px solid var(--color-border)' }}>
                <Search size={14} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
                <input 
                  type="text" 
                  placeholder="Filter keywords..." 
                  style={{ background: 'transparent', border: 'none', color: 'inherit', width: '150px', outline: 'none', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: 'rgba(100,116,139,0.05)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                  <tr>
                    <th style={{ padding: '1rem 1.5rem' }}>Keyword</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Category</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Match Count</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Accuracy</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" style={{ padding: '1rem' }}><SkeletonText lines={5} /></td></tr>
                  ) : keywords?.map((kw) => (
                    <tr key={kw.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Key size={14} color="var(--color-secondary)" />
                        {kw.keyword}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{kw.category}</td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{kw.count.toLocaleString()}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <Badge variant={kw.accuracy >= 90 ? 'success' : kw.accuracy >= 80 ? 'info' : 'warning'}>{kw.accuracy}%</Badge>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button className="btn btn-outline" style={{ padding: '0.5rem' }}><Edit2 size={14} /></button>
                          <button className="btn btn-outline" style={{ padding: '0.5rem', color: 'var(--color-critical)' }} onClick={() => handleDelete(kw.id)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        {/* Right Column: Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart2 size={20} color="var(--color-accent)" />
              Category Distribution
            </h3>
            <div style={{ height: '300px' }}>
              {loading ? <Skeleton style={{ width: '100%', height: '100%' }} /> : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={keywords?.reduce((acc, kw) => {
                    const existing = acc.find(x => x.name === kw.category);
                    if (existing) existing.value += kw.count;
                    else acc.push({ name: kw.category, value: kw.count });
                    return acc;
                  }, [])}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {keywords?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`var(--color-${['secondary', 'accent', 'warning', 'primary'][index % 4]})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
