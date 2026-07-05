"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Filter, RefreshCw, Download } from 'lucide-react';

const mockLogs = [
  { id: 'LOG-90812', time: '10:42:15.231', source: 'Firewall-01', type: 'Firewall Logs', severity: 'High', message: 'Inbound connection BLOCKED from 45.152.66.201:443 to 10.0.1.10:8080' },
  { id: 'LOG-90811', time: '10:42:10.005', source: 'WEB-01', type: 'Web Server Logs', severity: 'Critical', message: 'SQL Injection attempt: GET /api/users?id=1 OR 1=1--' },
  { id: 'LOG-90810', time: '10:41:55.440', source: 'WIN-WS-42', type: 'Windows Event Logs', severity: 'Medium', message: 'EventID 4625 - Account logon failed for user "jsmith". Failure: WrongPassword' },
  { id: 'LOG-90809', time: '10:41:32.900', source: 'VPN-GW', type: 'VPN Logs', severity: 'Info', message: 'User "mchen@corp.com" connected from 203.0.113.5 via OpenVPN' },
  { id: 'LOG-90808', time: '10:41:20.015', source: 'DNS-01', type: 'DNS Logs', severity: 'Medium', message: 'Suspicious DNS query for known C2 domain: update.microsoft-patch.xyz' },
  { id: 'LOG-90807', time: '10:40:55.302', source: 'DHCP-01', type: 'DHCP Logs', severity: 'Info', message: 'IP 10.0.5.88 leased to MAC 00:1A:2B:3C:4D:5E (LAPTOP-HR-07)' },
  { id: 'LOG-90806', time: '10:40:43.811', source: 'SYSLOG-RHEL', type: 'Linux Syslog', severity: 'High', message: 'sudo: jsmith : TTY=pts/0 ; COMMAND=/bin/bash (Unauthorized root shell)' },
  { id: 'LOG-90805', time: '10:40:31.500', source: 'DB-PRIMARY', type: 'Database Logs', severity: 'High', message: 'Unusual query volume: 12,000 SELECT * queries from 10.0.2.44 in 60 seconds' },
  { id: 'LOG-90804', time: '10:40:15.200', source: 'AV-AGENT', type: 'Authentication Logs', severity: 'Critical', message: 'Malware detected: Trojan.Ransomware.Lockbit in C:\\Users\\jsmith\\Downloads\\invoice.exe' },
  { id: 'LOG-90803', time: '10:40:02.100', source: 'IDS-01', type: 'IDS/IPS Logs', severity: 'High', message: 'Suricata Alert: ET MALWARE Known Botnet CnC Traffic (sid:2030673)' },
];

const logTypes = ['All', 'Windows Event Logs', 'Linux Syslog', 'Firewall Logs', 'IDS/IPS Logs', 'VPN Logs', 'DNS Logs', 'DHCP Logs', 'Web Server Logs', 'Authentication Logs', 'Database Logs'];
const severities = ['All', 'Critical', 'High', 'Medium', 'Low', 'Info'];

const getSeverityBadge = (s) => {
  const map = { Critical: 'bg-danger', High: 'bg-warning text-dark', Medium: 'bg-primary', Low: 'bg-secondary', Info: 'bg-dark border border-secondary text-muted' };
  return <span className={`badge ${map[s] || 'bg-secondary'}`}>{s}</span>;
};

export default function LogsPage() {
  const [search, setSearch] = useState('');
  const [logType, setLogType] = useState('All');
  const [severity, setSeverity] = useState('All');

  const filtered = mockLogs.filter(l => {
    const matchSearch = l.message.toLowerCase().includes(search.toLowerCase()) || l.source.toLowerCase().includes(search.toLowerCase());
    const matchType = logType === 'All' || l.type === logType;
    const matchSev = severity === 'All' || l.severity === severity;
    return matchSearch && matchType && matchSev;
  });

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Log Management</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Centralized log collection, parsing and search</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center"><RefreshCw size={14} className="me-1" /> Refresh</button>
          <button className="btn btn-primary btn-sm d-flex align-items-center"><Download size={14} className="me-1" /> Export</button>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[['Total Logs (24h)', '12,456,802', 'text-white'], ['Critical Events', '24', 'text-danger'], ['High Severity', '342', 'text-warning'], ['Log Sources', '48', 'text-primary']].map(([label, val, cls]) => (
          <div className="col-md-3" key={label}>
            <div className="soc-card"><div className="soc-card-body">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`mb-0 fw-bold ${cls}`}>{val}</h3>
            </div></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="soc-card mb-4">
        <div className="soc-card-body d-flex flex-wrap gap-3 align-items-center">
          <div className="d-flex align-items-center rounded px-3 py-2 flex-grow-1" style={{ border: '1px solid var(--soc-border)', background: 'rgba(15,23,42,0.5)', minWidth: '200px' }}>
            <Search size={16} className="text-muted me-2" />
            <input className="bg-transparent border-0 text-white w-100" style={{ outline: 'none', fontSize: '0.875rem' }} placeholder="Search logs by keyword, IP, source..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-select bg-dark border-secondary text-white" style={{ width: '200px' }} value={logType} onChange={e => setLogType(e.target.value)}>
            {logTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="form-select bg-dark border-secondary text-white" style={{ width: '140px' }} value={severity} onChange={e => setSeverity(e.target.value)}>
            {severities.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Log Table */}
      <div className="soc-card">
        <div className="soc-card-header d-flex justify-content-between align-items-center">
          <span>Live Log Stream <span className="badge bg-success ms-2">Real-time</span></span>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>{filtered.length} entries</span>
        </div>
        <div className="soc-card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  <th className="px-4 py-3">Log ID</th>
                  <th>Timestamp</th>
                  <th>Source</th>
                  <th>Log Type</th>
                  <th>Severity</th>
                  <th style={{ minWidth: '350px' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(log => (
                  <tr key={log.id}>
                    <td className="px-4 font-monospace text-muted">{log.id}</td>
                    <td className="font-monospace text-success">{log.time}</td>
                    <td><span className="badge bg-secondary bg-opacity-25 text-light border border-secondary">{log.source}</span></td>
                    <td className="text-muted">{log.type}</td>
                    <td>{getSeverityBadge(log.severity)}</td>
                    <td className="text-muted" style={{ wordBreak: 'break-all' }}>{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
