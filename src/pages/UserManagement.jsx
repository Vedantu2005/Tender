import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Skeleton, SkeletonText } from '../components/Skeleton';
import { Users, UserPlus, Shield, Search, MoreVertical, Edit2, Lock } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@defense.gov', role: 'Admin', lastLogin: '2 mins ago', status: 'Active' },
  { id: 2, name: 'Sarah Smith', email: 's.smith@defense.gov', role: 'Manager', lastLogin: '1 hour ago', status: 'Active' },
  { id: 3, name: 'Michael Chang', email: 'm.chang@defense.gov', role: 'Analyst', lastLogin: '1 day ago', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'e.davis@defense.gov', role: 'Analyst', lastLogin: '5 days ago', status: 'Inactive' },
  { id: 5, name: 'Robert Wilson', email: 'r.wilson@defense.gov', role: 'Analyst', lastLogin: '2 weeks ago', status: 'Locked' },
];

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Admin': return <Badge variant="critical"><Shield size={12} style={{ marginRight: '4px' }}/> Admin</Badge>;
      case 'Manager': return <Badge variant="warning">Manager</Badge>;
      case 'Analyst': return <Badge variant="info">Analyst</Badge>;
      default: return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'Inactive': return <Badge variant="info">Inactive</Badge>;
      case 'Locked': return <Badge variant="critical">Locked</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>User Management</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Role-Based Access Control and personnel monitoring</p>
        </div>
        <button className="btn btn-primary" disabled={loading}>
          <UserPlus size={16} /> Add New User
        </button>
      </div>

      <div className="grid-cols-4" style={{ gap: '1.5rem' }}>
        <Card className="flex-center flex-col text-center" style={{ padding: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', marginBottom: '0.75rem' }}>
            <Users size={24} color="var(--color-secondary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{loading ? <Skeleton style={{width:'40px', height:'32px'}}/> : 24}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Total Personnel</div>
        </Card>
        <Card className="flex-center flex-col text-center" style={{ padding: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', marginBottom: '0.75rem' }}>
            <Shield size={24} color="var(--color-critical)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{loading ? <Skeleton style={{width:'40px', height:'32px'}}/> : 3}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Administrators</div>
        </Card>
        <Card className="flex-center flex-col text-center" style={{ padding: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', marginBottom: '0.75rem' }}>
            <Users size={24} color="var(--color-accent)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{loading ? <Skeleton style={{width:'40px', height:'32px'}}/> : 18}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Active Sessions</div>
        </Card>
        <Card className="flex-center flex-col text-center" style={{ padding: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', marginBottom: '0.75rem' }}>
            <Lock size={24} color="var(--color-warning)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{loading ? <Skeleton style={{width:'40px', height:'32px'}}/> : 2}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Locked Accounts</div>
        </Card>
      </div>

      <Card noPadding={true}>
        {/* Toolbar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1, maxWidth: '400px', display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', border: '1px solid var(--color-border)' }}>
            <Search size={18} color="var(--color-text-muted)" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none', fontSize: '0.875rem' }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'rgba(100,116,139,0.05)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Email Address</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Last Login</th>
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
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {user.name}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{user.email}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{getRoleBadge(user.role)}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{getStatusBadge(user.status)}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{user.lastLogin}</td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline" style={{ padding: '0.5rem' }} title="Edit User"><Edit2 size={14} /></button>
                        <button className="btn btn-outline" style={{ padding: '0.5rem' }} title="More Options"><MoreVertical size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}
