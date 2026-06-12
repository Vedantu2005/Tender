import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { BellRing, ShieldAlert, CheckCircle2, Settings2, Clock, Mail, Search } from 'lucide-react';

const mockAlerts = [
  { id: 1, title: 'High Value Match: Cyber Defense Software', priority: 'High', time: '10 mins ago', isRead: false },
  { id: 2, title: 'New Opportunity in Aerospace', priority: 'Medium', time: '1 hour ago', isRead: false },
  { id: 3, title: 'Expiring Soon: Thermal Surveillance Systems', priority: 'High', time: '2 hours ago', isRead: true },
  { id: 4, title: 'Weekly Summary: 45 New Matches', priority: 'Low', time: '1 day ago', isRead: true },
];

export function AlertCenter() {
  const [activeTab, setActiveTab] = useState('history');
  const [alerts, setAlerts] = useState(mockAlerts);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, isRead: true })));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Alert Management</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Monitor real-time notifications and manage preferences</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('history')}
          style={{ 
            padding: '0.5rem 1rem', 
            fontWeight: activeTab === 'history' ? 600 : 500,
            color: activeTab === 'history' ? 'var(--color-text-main)' : 'var(--color-text-muted)',
            borderBottom: activeTab === 'history' ? '2px solid var(--color-secondary)' : '2px solid transparent',
            marginBottom: '-0.5rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <BellRing size={16} /> Alert History
        </button>
        <button 
          onClick={() => setActiveTab('preferences')}
          style={{ 
            padding: '0.5rem 1rem', 
            fontWeight: activeTab === 'preferences' ? 600 : 500,
            color: activeTab === 'preferences' ? 'var(--color-text-main)' : 'var(--color-text-muted)',
            borderBottom: activeTab === 'preferences' ? '2px solid var(--color-secondary)' : '2px solid transparent',
            marginBottom: '-0.5rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}
        >
          <Settings2 size={16} /> Notification Preferences
        </button>
      </div>

      {activeTab === 'history' && (
        <Card noPadding={true}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Badge variant="critical">{alerts.filter(a => a.priority === 'High').length} High Priority</Badge>
              <Badge variant="info">{alerts.filter(a => !a.isRead).length} Unread</Badge>
            </div>
            <button onClick={markAllRead} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
              <CheckCircle2 size={14} /> Mark All as Read
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {alerts.map((alert) => (
              <div key={alert.id} style={{ 
                padding: '1.5rem', 
                borderBottom: '1px solid var(--color-border)', 
                display: 'flex', 
                gap: '1.5rem', 
                alignItems: 'flex-start',
                backgroundColor: alert.isRead ? 'transparent' : 'rgba(37, 99, 235, 0.05)'
              }}>
                <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: alert.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : alert.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(100, 116, 139, 0.1)' }}>
                  {alert.priority === 'High' ? <ShieldAlert size={20} color="var(--color-critical)" /> : <BellRing size={20} color={alert.priority === 'Medium' ? 'var(--color-warning)' : 'var(--color-text-muted)'} />}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: alert.isRead ? 500 : 600, margin: 0, color: alert.isRead ? 'var(--color-text-muted)' : 'var(--color-text-main)' }}>{alert.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {alert.time}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn" style={{ padding: 0, color: 'var(--color-secondary)', fontSize: '0.875rem' }}>View Details</button>
                    <button className="btn" style={{ padding: 0, color: 'var(--color-text-muted)', fontSize: '0.875rem' }} onClick={() => deleteAlert(alert.id)}>Dismiss</button>
                  </div>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No alerts found.</div>
            )}
          </div>
        </Card>
      )}

      {activeTab === 'preferences' && (
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Email Alert Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Mail size={20} color="var(--color-text-muted)" />
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Instant Notifications</h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Get emailed instantly when a high-priority match is found.</p>
                    </div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Clock size={20} color="var(--color-text-muted)" />
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Daily Digest</h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Receive a daily summary of all relevant tenders.</p>
                    </div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Category Subscriptions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {['Defense', 'Aerospace', 'Communications', 'Software', 'Infrastructure', 'Healthcare'].map(cat => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" id={`cat-${cat}`} defaultChecked={['Defense', 'Software', 'Aerospace'].includes(cat)} style={{ accentColor: 'var(--color-secondary)' }} />
                    <label htmlFor={`cat-${cat}`} style={{ fontSize: '0.875rem' }}>{cat}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <button className="btn btn-primary">Save Preferences</button>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
}
