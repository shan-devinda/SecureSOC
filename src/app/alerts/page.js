"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Filter, AlertTriangle, Shield, CheckCircle, Clock } from 'lucide-react';

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockAlerts = [
    { id: 'AL-1042', time: '10:42:15 AM', severity: 'Critical', source: '192.168.1.45', dest: '10.0.5.12', description: 'Multiple Failed Logins (Brute Force)', status: 'New' },
    { id: 'AL-1041', time: '10:35:02 AM', severity: 'High', source: '45.22.19.102', dest: '192.168.1.254', description: 'Suspicious Outbound Traffic', status: 'Investigating' },
    { id: 'AL-1040', time: '10:15:44 AM', severity: 'Critical', source: '10.0.5.12', dest: '192.168.1.5', description: 'Malware Signature Detected', status: 'New' },
    { id: 'AL-1039', time: '09:50:11 AM', severity: 'Medium', source: '172.16.0.4', dest: '10.0.5.20', description: 'Unauthorized DB Access Attempt', status: 'Closed' },
    { id: 'AL-1038', time: '09:12:30 AM', severity: 'High', source: '192.168.1.100', dest: '8.8.8.8', description: 'Ransomware Behavior (File Encryption)', status: 'New' },
    { id: 'AL-1037', time: '08:45:00 AM', severity: 'Low', source: '192.168.1.50', dest: '192.168.1.1', description: 'Port Scan Detected', status: 'Closed' },
    { id: 'AL-1036', time: '08:10:22 AM', severity: 'Medium', source: 'External', dest: '10.0.5.80', description: 'SQL Injection Payload Detected', status: 'Investigating' },
  ];

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Critical': return <span className="badge bg-danger">Critical</span>;
      case 'High': return <span className="badge bg-warning text-dark">High</span>;
      case 'Medium': return <span className="badge bg-primary">Medium</span>;
      case 'Low': return <span className="badge bg-secondary">Low</span>;
      default: return <span className="badge bg-light text-dark">Info</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'New': return <AlertTriangle size={16} className="text-danger me-1" />;
      case 'Investigating': return <Clock size={16} className="text-warning me-1" />;
      case 'Closed': return <CheckCircle size={16} className="text-success me-1" />;
      default: return <Shield size={16} className="me-1" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Alert Management</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center"><Filter size={16} className="me-1"/> Filter</button>
          <button className="btn btn-primary btn-sm">Export CSV</button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="soc-card">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Real-Time Alerts Stream</span>
              <div className="input-group" style={{ width: '300px' }}>
                <span className="input-group-text bg-transparent border-end-0 border-secondary"><Search size={16} className="text-muted"/></span>
                <input 
                  type="text" 
                  className="form-control bg-transparent border-start-0 border-secondary text-white shadow-none" 
                  placeholder="Search alerts..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="soc-card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th>Time</th>
                      <th>Severity</th>
                      <th>Source</th>
                      <th>Destination</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAlerts.filter(a => a.description.toLowerCase().includes(searchTerm.toLowerCase()) || a.source.includes(searchTerm)).map((alert) => (
                      <tr key={alert.id}>
                        <td className="px-4 fw-medium text-primary">{alert.id}</td>
                        <td>{alert.time}</td>
                        <td>{getSeverityBadge(alert.severity)}</td>
                        <td><span className="font-monospace">{alert.source}</span></td>
                        <td><span className="font-monospace">{alert.dest}</span></td>
                        <td>{alert.description}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            {getStatusIcon(alert.status)}
                            <span>{alert.status}</span>
                          </div>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }}>View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="soc-card-footer border-top border-secondary p-3 d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '0.85rem' }}>
              <span>Showing 1 to {mockAlerts.length} of 3,429 entries</span>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled"><a className="page-link bg-transparent border-secondary text-muted" href="#">Previous</a></li>
                  <li className="page-item active"><a className="page-link border-primary" href="#">1</a></li>
                  <li className="page-item"><a className="page-link bg-transparent border-secondary text-muted" href="#">2</a></li>
                  <li className="page-item"><a className="page-link bg-transparent border-secondary text-muted" href="#">3</a></li>
                  <li className="page-item"><a className="page-link bg-transparent border-secondary text-muted" href="#">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
