import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Skeleton } from '../components/Skeleton';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Map } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const mockTrendData = [
  { name: 'Jan', defense: 400, aerospace: 240, cyber: 150 },
  { name: 'Feb', defense: 300, aerospace: 139, cyber: 200 },
  { name: 'Mar', defense: 200, aerospace: 480, cyber: 250 },
  { name: 'Apr', defense: 278, aerospace: 390, cyber: 210 },
  { name: 'May', defense: 189, aerospace: 480, cyber: 290 },
  { name: 'Jun', defense: 239, aerospace: 380, cyber: 350 },
];

const mockCategoryData = [
  { name: 'Defense', value: 400 },
  { name: 'Aerospace', value: 300 },
  { name: 'Cyber', value: 300 },
  { name: 'Infrastructure', value: 200 },
];

const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-warning)'];

export function ReportsAnalytics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Reports & Analytics</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Executive overview of tender trends and system performance</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'inherit' }}>
            <option>Last 6 Months</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
          <button className="btn btn-primary">Export Report</button>
        </div>
      </div>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <TrendingUp size={20} color="var(--color-secondary)" />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Tender Volume Trends</h3>
        </div>
        <div style={{ height: '400px' }}>
          {loading ? <Skeleton style={{ width: '100%', height: '100%' }} /> : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorDefense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAero" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                <Legend />
                <Area type="monotone" dataKey="defense" stroke="var(--color-secondary)" fillOpacity={1} fill="url(#colorDefense)" />
                <Area type="monotone" dataKey="aerospace" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorAero)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <PieChartIcon size={20} color="var(--color-accent)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Category Distribution</h3>
          </div>
          <div style={{ height: '300px' }}>
            {loading ? <Skeleton style={{ width: '100%', height: '100%' }} /> : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={20} color="var(--color-warning)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0 }}>Portal Extraction Accuracy</h3>
          </div>
          <div style={{ height: '300px' }}>
            {loading ? <Skeleton style={{ width: '100%', height: '100%' }} /> : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                  <YAxis stroke="var(--color-text-muted)" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                  <Bar dataKey="cyber" fill="var(--color-warning)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
}
