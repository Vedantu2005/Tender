import React, { useState } from 'react';
import { Search, Bell, Activity, ChevronDown, CheckCircle2, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--color-card)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: '500px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-background)',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem 1rem',
          width: '100%',
          border: '1px solid var(--color-border)',
          transition: 'all 0.2s ease',
        }}>
          <Search size={18} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Global search tenders, keywords, agencies..." 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-main)',
              width: '100%',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <Activity size={14} color="var(--color-accent)" />
          <span className="hide-mobile">System: <span style={{ color: 'var(--color-accent)' }}>Healthy</span></span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          <CheckCircle2 size={14} color="var(--color-accent)" />
          <span className="hide-mobile">Last Scrape: 5m ago</span>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>

        <button onClick={toggleTheme} style={{ color: 'var(--color-text-muted)' }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button style={{ position: 'relative' }}>
          <Bell size={20} color="var(--color-text-muted)" />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--color-critical)',
            borderRadius: '50%',
            border: `2px solid var(--color-card)`
          }}></span>
        </button>

        <div style={{ position: 'relative' }}>
          <button 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <ChevronDown size={16} color="var(--color-text-muted)" />
          </button>

          {showProfileMenu && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              minWidth: '200px',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{user?.email}</p>
              </div>
              <button 
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-critical)',
                  textAlign: 'left',
                  fontSize: '0.875rem'
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
