import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Key, Bell, Mail, Shield, Database, Webhook, Save, CheckCircle2 } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('keywords');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [threshold, setThreshold] = useState(80);
  const [engine, setEngine] = useState('gpt4');
  const [exactMatch, setExactMatch] = useState(true);
  const [timeout, setTimeoutVal] = useState('1 Hour');

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const tabs = [
    { id: 'keywords', label: 'Keyword Config', icon: Key },
    { id: 'alerts', label: 'Alert Preferences', icon: Bell },
    { id: 'email', label: 'Email Settings', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
    { id: 'api', label: 'API Configuration', icon: Webhook },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>System Settings</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Configure platform behavior and integrations</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {saved && <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem' }}><CheckCircle2 size={16} /> Saved Successfully</span>}
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <div className="skeleton-pulse" style={{width: '16px', height: '16px', borderRadius: '50%'}}></div> : <Save size={16} />} 
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex-col-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* Sidebar Navigation */}
        <div className="w-full-mobile" style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeTab === tab.id ? 'var(--color-secondary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--color-text-muted)',
                textAlign: 'left',
                transition: 'all 0.2s',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: '1px solid',
                borderColor: activeTab === tab.id ? 'var(--color-secondary)' : 'transparent'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1 }}>
          <Card>
            {activeTab === 'keywords' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>Keyword Matching Configuration</h3>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>AI Match Threshold (%)</label>
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={threshold} 
                    onChange={(e) => setThreshold(e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--color-secondary)' }} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    <span>50%</span>
                    <span>Current: {threshold}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Semantic Matching Engine</label>
                  <select 
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'inherit', outline: 'none' }}
                  >
                    <option value="gpt4">GPT-4 Turbo (High Precision)</option>
                    <option value="claude3">Claude 3 Opus (Deep Analysis)</option>
                    <option value="gemini">Gemini 1.5 Pro (Fast Analysis)</option>
                    <option value="local">Local Embeddings (Maximum Privacy)</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    id="exactMatch" 
                    checked={exactMatch}
                    onChange={(e) => setExactMatch(e.target.checked)}
                    style={{ accentColor: 'var(--color-secondary)' }} 
                  />
                  <label htmlFor="exactMatch" style={{ fontSize: '0.875rem', color: 'var(--color-text-main)' }}>Enable exact phrase matching fallback</label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>Security Settings</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Two-Factor Authentication (2FA)</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Require 2FA for all administrative accounts.</p>
                  </div>
                  <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-accent)' }}>Enabled</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Session Timeout</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Automatically log out inactive users.</p>
                  </div>
                  <select 
                    value={timeout}
                    onChange={(e) => setTimeoutVal(e.target.value)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'inherit', outline: 'none' }}
                  >
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>4 Hours</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab !== 'keywords' && activeTab !== 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                <tab.icon size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>Configuration options for {tabs.find(t => t.id === activeTab)?.label} are loaded from the central Defense registry.</p>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
