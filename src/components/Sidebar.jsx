import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Search, 
  BrainCircuit, 
  Key, 
  BellRing, 
  Bookmark, 
  BarChart3, 
  Activity, 
  Users, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Tender Explorer', path: '/explorer', icon: Search },
  { name: 'AI Insights', path: '/insights', icon: BrainCircuit },
  { name: 'Keyword Intelligence', path: '/keywords', icon: Key },
  { name: 'Alerts Center', path: '/alerts', icon: BellRing },
  { name: 'Saved Tenders', path: '/saved', icon: Bookmark },
  { name: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
  { name: 'Portal Monitoring', path: '/monitoring', icon: Activity },
  { name: 'User Management', path: '/users', icon: Users },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const { user } = useAuth();

  return (
    <aside style={{
      width: '250px',
      backgroundColor: 'var(--color-card)',
      borderRight: '1px solid var(--color-border)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BrainCircuit size={20} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: '700', margin: 0, color: 'var(--color-text-main)' }}>AI Tender</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Intelligence System</p>
        </div>
      </div>
      
      <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.name} style={{ margin: '0.25rem 1rem' }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'white' : 'var(--color-text-muted)',
                  backgroundColor: isActive ? 'var(--color-secondary)' : 'transparent',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? '600' : '500'
                })}
              >
                <item.icon size={18} color={window.location.pathname === item.path ? 'white' : undefined} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{user?.name?.charAt(0) || 'A'}</span>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>{user?.name || 'Loading...'}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>{user?.role || 'User'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
