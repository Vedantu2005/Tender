import React, { useState } from 'react';
import { BrainCircuit, ShieldCheck, FileText, Activity, AlertTriangle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('commander@defense.gov');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text-main)' }}>
      {/* Left side - Login Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', zIndex: 10, maxWidth: '600px' }}>
        <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BrainCircuit size={30} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }} className="text-gradient">
              AI Tender Intelligence
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>Defense Procurement Platform</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>Secure Access</h2>
          
          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--color-critical)', borderRadius: 'var(--radius-md)', color: 'var(--color-critical)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Organization Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Security Key / Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}>Forgot Password?</Link>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="remember" style={{ accentColor: 'var(--color-secondary)' }} />
              <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Remember secure session</label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem', fontSize: '1rem' }} disabled={loading}>
              {loading ? <div className="skeleton-pulse" style={{ width: '20px', height: '20px', borderRadius: '50%' }}></div> : <ShieldCheck size={20} />}
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Don't have clearance? <Link to="/register" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Request Access</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hide-mobile" style={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, var(--color-card) 0%, var(--color-background) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Animated particles placeholder - we'll use CSS for simplicity */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(var(--color-secondary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }} className="animate-float"></div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div className="glass-panel" style={{ width: '300px', height: '200px', position: 'relative', transform: 'perspective(1000px) rotateY(-15deg)', boxShadow: 'var(--shadow-glow)' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={16} color="var(--color-accent)" />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>Live Intelligence Feed</span>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ height: '8px', width: '80%', background: 'var(--color-border)', borderRadius: '4px' }}></div>
              <div style={{ height: '8px', width: '60%', background: 'var(--color-border)', borderRadius: '4px' }}></div>
              <div style={{ height: '8px', width: '90%', background: 'var(--color-border)', borderRadius: '4px' }}></div>
              <div style={{ height: '8px', width: '40%', background: 'var(--color-border)', borderRadius: '4px' }}></div>
            </div>
          </div>
          
          <div className="glass-panel" style={{ width: '250px', height: '150px', position: 'absolute', bottom: '-50px', right: '-50px', transform: 'perspective(1000px) rotateY(-15deg)' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} color="var(--color-secondary)" />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>Classified Docs</span>
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>8,492</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Secure documents analyzed today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
