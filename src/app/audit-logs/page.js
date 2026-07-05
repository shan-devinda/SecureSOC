"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ClipboardList, Search, Download } from 'lucide-react';
import { User, Shield, Key, FileText, AlertTriangle, Settings, Trash2, LogIn, LogOut } from 'lucide-react';

const mockAuditLogs = [
  { id: 'AUD-5001', time: '10:45:22 AM', user: 'admin@securesoc.com', role: 'Super Admin', action: 'User Login', resource: 'Auth System', ip: '10.0.5.1', status: 'Success' },
  { id: 'AUD-5002', time: '10:42:00 AM', user: 'admin@securesoc.com', role: 'Super Admin', action: 'Alert Assignment', resource: 'AL-1042', ip: '10.0.5.1', status: 'Success' },
  { id: 'AUD-5003', time: '10:30:15 AM', user: 'analyst@securesoc.com', role: 'Security Analyst', action: 'Incident Update', resource: 'INC-2026-001', ip: '10.0.5.22', status: 'Success' },
  { id: 'AUD-5004', time: '10:15:42 AM', user: 'viewer@securesoc.com', role: 'Viewer', action: 'Report Generation', resource: 'REP-101', ip: '10.0.5.30', status: 'Success' },
  { id: 'AUD-5005', time: '09:58:11 AM', user: 'unknown@external.com', role: 'N/A', action: 'User Login', resource: 'Auth System', ip: '185.234.218.51', status: 'Failed' },
  { id: 'AUD-5006', time: '09:45:00 AM', user: 'admin@securesoc.com', role: 'Super Admin', action: 'User Creation', resource: 'newuser@corp.com', ip: '10.0.5.1', status: 'Success' },
  { id: 'AUD-5007', time: '09:30:33 AM', user: 'analyst@securesoc.com', role: 'Security Analyst', action: 'Asset Modification', resource: 'AS-004', ip: '10.0.5.22', status: 'Success' },
  { id: 'AUD-5008', time: '09:15:01 AM', user: 'manager@securesoc.com', role: 'SOC Manager', action: 'Password Change', resource: 'Self', ip: '10.0.5.10', status: 'Success' },
  { id: 'AUD-5009', time: '09:02:45 AM', user: 'unknown@external.com', role: 'N/A', action: 'User Login', resource: 'Auth System', ip: '45.22.19.100', status: 'Failed' },
  { id: 'AUD-5010', time: '08:50:00 AM', user: 'auditor@securesoc.com', role: 'Auditor', action: 'User Logout', resource: 'Auth System', ip: '10.0.5.40', status: 'Success' },
];

const actionIcon = (action) => {
  if (action.includes('Login')) return <LogIn size={14} className="text-primary" />;
  if (action.includes('Logout')) return <LogOut size={14} className="text-secondary" />;
  if (action.includes('Password')) return <Key size={14} className="text-warning" />;
  if (action.includes('Alert')) return <AlertTriangle size={14} className="text-warning" />;
  if (action.includes('Incident')) return <Shield size={14} className="text-danger" />;
  if (action.includes('Report')) return <FileText size={14} className="text-info" />;
  if (action.includes('User')) return <User size={14} className="text-primary" />;
  if (action.includes('Asset')) return <Settings size={14} className="text-success" />;
  return <ClipboardList size={14} className="text-muted" />;
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockAuditLogs.filter(l =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.resource.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Audit Logs</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Complete record of all platform actions for accountability and compliance</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center"><Download size={14} className="me-1" /> Export CSV</button>
      </div>

      <div className="row g-3 mb-4">
        {[['Total Events (24h)', mockAuditLogs.length, 'text-white'], ['Successful Actions', mockAuditLogs.filter(l=>l.status==='Success').length, 'text-success'], ['Failed Attempts', mockAuditLogs.filter(l=>l.status==='Failed').length, 'text-danger'], ['Unique Users', 5, 'text-primary']].map(([label, val, cls]) => (
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
          <span>Platform Activity Log</span>
          <div className="d-flex align-items-center rounded px-3 py-1" style={{ border: '1px solid var(--soc-border)', background: 'rgba(15,23,42,0.5)' }}>
            <Search size={14} className="text-muted me-2" />
            <input className="bg-transparent border-0 text-white" style={{ outline: 'none', fontSize: '0.82rem', width: '200px' }} placeholder="Search by user, action..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="soc-card-body p-0">
          <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.85rem' }}>
            <thead><tr>
              <th className="px-4 py-3">Audit ID</th>
              <th>Timestamp</th>
              <th>User</th>
              <th>Role</th>
              <th>Action</th>
              <th>Resource</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr></thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id}>
                  <td className="px-4 font-monospace text-muted">{log.id}</td>
                  <td className="text-muted">{log.time}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                        <User size={12} className="text-white" />
                      </div>
                      <span className="text-white" style={{ fontSize: '0.82rem' }}>{log.user}</span>
                    </div>
                  </td>
                  <td><span className="badge bg-secondary bg-opacity-25 text-light border border-secondary" style={{ fontSize: '0.72rem' }}>{log.role}</span></td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      {actionIcon(log.action)}
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="font-monospace text-muted">{log.resource}</td>
                  <td className="font-monospace text-muted">{log.ip}</td>
                  <td>
                    <span className={`badge ${log.status === 'Success' ? 'bg-success' : 'bg-danger'}`}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
