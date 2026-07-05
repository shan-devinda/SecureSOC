"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Globe, Search, RefreshCw, AlertTriangle, Shield } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const darkChartOptions = (indexAxis = 'x') => ({
  responsive: true, maintainAspectRatio: false, indexAxis,
  plugins: { legend: { labels: { color: '#94a3b8' } } },
  scales: {
    x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
  }
});

const mockIOCs = [
  { id: 'IOC-001', type: 'Malicious IP', indicator: '45.152.66.201', confidence: 95, threat: 'Ransomware C2', source: 'Threat Feed', status: 'Active' },
  { id: 'IOC-002', type: 'Domain', indicator: 'update.microsoft-patch.xyz', confidence: 88, threat: 'Phishing/Malware Drop', source: 'VirusTotal', status: 'Active' },
  { id: 'IOC-003', type: 'File Hash', indicator: 'a3f5c2d1e8b9...', confidence: 99, threat: 'LockBit Ransomware', source: 'MISP Feed', status: 'Active' },
  { id: 'IOC-004', type: 'URL', indicator: 'http://evil-domain.ru/payload.exe', confidence: 100, threat: 'Malware Dropper', source: 'URLhaus', status: 'Active' },
  { id: 'IOC-005', type: 'Email', indicator: 'noreply@secure-login.tk', confidence: 75, threat: 'Phishing Campaign', source: 'Internal Intel', status: 'Active' },
  { id: 'IOC-006', type: 'Malicious IP', indicator: '185.234.218.51', confidence: 92, threat: 'Brute Force Bot', source: 'AbuseIPDB', status: 'Expired' },
  { id: 'IOC-007', type: 'Malware Family', indicator: 'Emotet', confidence: 97, threat: 'Banking Trojan', source: 'CISA Alert', status: 'Active' },
];

const topMalwareData = {
  labels: ['LockBit', 'Emotet', 'Qakbot', 'Cobalt Strike', 'BlackCat'],
  datasets: [{ label: 'Detections', data: [52, 38, 31, 24, 19], backgroundColor: '#ef4444', borderRadius: 4 }]
};
const iocTrendData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'New IOCs Ingested',
    data: [120, 85, 203, 145, 89, 40, 95],
    borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4
  }]
};

export default function ThreatIntelPage() {
  const [search, setSearch] = useState('');
  const filtered = mockIOCs.filter(i => i.indicator.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Threat Intelligence</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>IOC management and threat feed integration</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center"><RefreshCw size={14} className="me-1" /> Sync Feeds</button>
          <button className="btn btn-primary btn-sm d-flex align-items-center"><Shield size={14} className="me-1" /> Add IOC</button>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[['Total IOCs', '4,829', 'text-white'], ['Active Threats', '342', 'text-danger'], ['Matched in Logs', '18', 'text-warning'], ['Feed Sources', '7', 'text-primary']].map(([label, val, cls]) => (
          <div className="col-md-3" key={label}>
            <div className="soc-card"><div className="soc-card-body">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`mb-0 fw-bold ${cls}`}>{val}</h3>
            </div></div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="soc-card h-100">
            <div className="soc-card-header">IOC Ingestion Trend (7 Days)</div>
            <div className="soc-card-body" style={{ height: '220px' }}>
              <Line data={iocTrendData} options={darkChartOptions()} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="soc-card h-100">
            <div className="soc-card-header">Top Malware Families Detected</div>
            <div className="soc-card-body" style={{ height: '220px' }}>
              <Bar data={topMalwareData} options={darkChartOptions('y')} />
            </div>
          </div>
        </div>
      </div>

      {/* IOC Table */}
      <div className="soc-card">
        <div className="soc-card-header d-flex justify-content-between align-items-center">
          <span>Indicators of Compromise (IOC)</span>
          <div className="d-flex align-items-center rounded px-3 py-1" style={{ border: '1px solid var(--soc-border)', background: 'rgba(15,23,42,0.5)' }}>
            <Search size={14} className="text-muted me-2" />
            <input className="bg-transparent border-0 text-white" style={{ outline: 'none', fontSize: '0.82rem', width: '200px' }} placeholder="Search IOC..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="soc-card-body p-0">
          <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th className="px-4 py-3">ID</th>
                <th>Type</th>
                <th>Indicator / Value</th>
                <th>Threat</th>
                <th>Confidence</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(ioc => (
                <tr key={ioc.id}>
                  <td className="px-4 text-primary font-monospace">{ioc.id}</td>
                  <td><span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25">{ioc.type}</span></td>
                  <td className="font-monospace text-warning" style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ioc.indicator}</td>
                  <td className="text-muted">{ioc.threat}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: '5px', background: '#334155' }}>
                        <div className="progress-bar bg-danger" style={{ width: `${ioc.confidence}%` }}></div>
                      </div>
                      <span className="text-muted" style={{ fontSize: '0.78rem', width: '32px' }}>{ioc.confidence}%</span>
                    </div>
                  </td>
                  <td className="text-muted">{ioc.source}</td>
                  <td><span className={`badge ${ioc.status === 'Active' ? 'bg-danger' : 'bg-secondary'}`}>{ioc.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
