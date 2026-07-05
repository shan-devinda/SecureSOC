"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bug, Plus, Search, Filter } from 'lucide-react';

const mockVulns = [
  { id: 'CVE-2024-1234', asset: 'Web Server Prod 01', cvss: 9.8, rating: 'Critical', category: 'Remote Code Execution', patchStatus: 'Unpatched', discovered: '2026-07-01' },
  { id: 'CVE-2024-5678', asset: 'Database Primary', cvss: 8.1, rating: 'High', category: 'SQL Injection', patchStatus: 'Patch Available', discovered: '2026-06-28' },
  { id: 'CVE-2024-9012', asset: 'HR File Share', cvss: 7.5, rating: 'High', category: 'Privilege Escalation', patchStatus: 'Unpatched', discovered: '2026-06-25' },
  { id: 'CVE-2023-4455', asset: 'Firewall Edge', cvss: 5.3, rating: 'Medium', category: 'Information Disclosure', patchStatus: 'Patched', discovered: '2026-06-20' },
  { id: 'CVE-2023-7788', asset: 'Guest WiFi AP', cvss: 4.8, rating: 'Medium', category: 'Authentication Bypass', patchStatus: 'Unpatched', discovered: '2026-06-18' },
  { id: 'CVE-2023-2244', asset: 'Developer Workstation 12', cvss: 3.5, rating: 'Low', category: 'Cross-Site Scripting', patchStatus: 'Patched', discovered: '2026-06-15' },
];

const getRatingBadge = (r) => ({ Critical: 'bg-danger', High: 'bg-warning text-dark', Medium: 'bg-primary', Low: 'bg-secondary' })[r];
const getPatchBadge = (p) => ({ Patched: 'bg-success', Unpatched: 'bg-danger', 'Patch Available': 'bg-warning text-dark' })[p];

const CvssBar = ({ score }) => {
  const color = score >= 9 ? '#ef4444' : score >= 7 ? '#f97316' : score >= 4 ? '#3b82f6' : '#64748b';
  return (
    <div className="d-flex align-items-center gap-2">
      <div className="progress flex-grow-1" style={{ height: '6px', background: '#334155' }}>
        <div className="progress-bar" style={{ width: `${score * 10}%`, backgroundColor: color }}></div>
      </div>
      <span className="fw-bold" style={{ color, minWidth: '30px', fontSize: '0.82rem' }}>{score}</span>
    </div>
  );
};

export default function VulnerabilitiesPage() {
  const [search, setSearch] = useState('');
  const filtered = mockVulns.filter(v => v.id.toLowerCase().includes(search.toLowerCase()) || v.asset.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Vulnerability Management</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Track CVEs, CVSS scores and patch status across all assets</p>
        </div>
        <button className="btn btn-primary btn-sm d-flex align-items-center"><Plus size={14} className="me-1" /> Import Scan Results</button>
      </div>

      <div className="row g-3 mb-4">
        {[['Critical', mockVulns.filter(v=>v.rating==='Critical').length, 'text-danger'], ['High', mockVulns.filter(v=>v.rating==='High').length, 'text-warning'], ['Medium', mockVulns.filter(v=>v.rating==='Medium').length, 'text-primary'], ['Unpatched', mockVulns.filter(v=>v.patchStatus==='Unpatched').length, 'text-danger']].map(([label, val, cls]) => (
          <div className="col-md-3" key={label}>
            <div className="soc-card"><div className="soc-card-body">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`mb-0 fw-bold ${cls}`}>{val}</h3>
            </div></div>
          </div>
        ))}
      </div>

      <div className="soc-card">
        <div className="soc-card-header d-flex justify-content-between align-items-center">
          <span>Vulnerability Registry</span>
          <div className="d-flex align-items-center gap-2">
            <div className="d-flex align-items-center rounded px-3 py-1" style={{ border: '1px solid var(--soc-border)', background: 'rgba(15,23,42,0.5)' }}>
              <Search size={14} className="text-muted me-2" />
              <input className="bg-transparent border-0 text-white" style={{ outline: 'none', fontSize: '0.82rem', width: '180px' }} placeholder="Search CVE or asset..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="soc-card-body p-0">
          <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th className="px-4 py-3">CVE ID</th>
                <th>Affected Asset</th>
                <th>CVSS Score</th>
                <th>Risk Rating</th>
                <th>Category</th>
                <th>Patch Status</th>
                <th>Discovered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td className="px-4 font-monospace text-danger">{v.id}</td>
                  <td className="text-white">{v.asset}</td>
                  <td style={{ minWidth: '150px' }}><CvssBar score={v.cvss} /></td>
                  <td><span className={`badge ${getRatingBadge(v.rating)}`}>{v.rating}</span></td>
                  <td className="text-muted">{v.category}</td>
                  <td><span className={`badge ${getPatchBadge(v.patchStatus)}`}>{v.patchStatus}</span></td>
                  <td className="text-muted">{v.discovered}</td>
                  <td><button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }}>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
