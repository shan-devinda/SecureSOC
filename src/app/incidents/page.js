"use client";
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Activity, Plus, FileText, User, ArrowRight } from 'lucide-react';

export default function IncidentsPage() {
  const mockIncidents = [
    { id: 'INC-2026-001', title: 'Ransomware Outbreak in HR Subnet', severity: 'Critical', status: 'Containment', assignedTo: 'Sarah Jenkins', time: '2 hours ago' },
    { id: 'INC-2026-002', title: 'Data Exfiltration Alert (AWS S3)', severity: 'High', status: 'Investigation', assignedTo: 'Mike Chen', time: '5 hours ago' },
    { id: 'INC-2026-003', title: 'Compromised VPN Credentials', severity: 'High', status: 'Eradication', assignedTo: 'David Ross', time: '1 day ago' },
    { id: 'INC-2026-004', title: 'DDoS Attack on Main Web Server', severity: 'Medium', status: 'Recovery', assignedTo: 'Sarah Jenkins', time: '2 days ago' },
    { id: 'INC-2026-005', title: 'Unauthorized AD Configuration Change', severity: 'Medium', status: 'Closed', assignedTo: 'Admin', time: '1 week ago' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Investigation': return 'bg-warning text-dark';
      case 'Containment': return 'bg-danger';
      case 'Eradication': return 'bg-primary';
      case 'Recovery': return 'bg-info text-dark';
      case 'Closed': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Critical': return <span className="badge bg-danger">Critical</span>;
      case 'High': return <span className="badge bg-warning text-dark">High</span>;
      case 'Medium': return <span className="badge bg-primary">Medium</span>;
      default: return <span className="badge bg-secondary">Low</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Incident Response</h2>
        <button className="btn btn-primary btn-sm d-flex align-items-center"><Plus size={16} className="me-1"/> Create Incident</button>
      </div>

      <div className="row g-4 mb-4">
        {/* Workflow Summary */}
        <div className="col-12">
          <div className="soc-card bg-primary-soft border-primary border-opacity-25">
            <div className="soc-card-body py-3 d-flex justify-content-between align-items-center text-primary fw-semibold overflow-auto">
              <div className="d-flex align-items-center gap-2"><div className="badge bg-primary rounded-circle p-2">1</div> New</div>
              <ArrowRight size={16} />
              <div className="d-flex align-items-center gap-2"><div className="badge bg-warning text-dark rounded-circle p-2">1</div> Investigation</div>
              <ArrowRight size={16} />
              <div className="d-flex align-items-center gap-2"><div className="badge bg-danger rounded-circle p-2">1</div> Containment</div>
              <ArrowRight size={16} />
              <div className="d-flex align-items-center gap-2"><div className="badge bg-primary rounded-circle p-2">1</div> Eradication</div>
              <ArrowRight size={16} />
              <div className="d-flex align-items-center gap-2"><div className="badge bg-info text-dark rounded-circle p-2">1</div> Recovery</div>
              <ArrowRight size={16} />
              <div className="d-flex align-items-center gap-2 text-success"><div className="badge bg-success rounded-circle p-2">1</div> Closed</div>
            </div>
          </div>
        </div>

        {/* Incidents List */}
        <div className="col-12">
          <div className="soc-card">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Active Cases</span>
              <div className="btn-group">
                <button className="btn btn-sm btn-outline-secondary active">All</button>
                <button className="btn btn-sm btn-outline-secondary">My Assigned</button>
              </div>
            </div>
            <div className="soc-card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr>
                      <th className="px-4 py-3">Incident ID</th>
                      <th>Title</th>
                      <th>Severity</th>
                      <th>Current Phase</th>
                      <th>Assigned To</th>
                      <th>Detected</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockIncidents.map((incident) => (
                      <tr key={incident.id}>
                        <td className="px-4 fw-medium text-primary"><FileText size={16} className="me-2 text-muted"/>{incident.id}</td>
                        <td className="fw-medium">{incident.title}</td>
                        <td>{getSeverityBadge(incident.severity)}</td>
                        <td><span className={`badge ${getStatusColor(incident.status)}`}>{incident.status}</span></td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{width: '24px', height: '24px'}}>
                              <User size={12} className="text-white"/>
                            </div>
                            <span className="text-muted" style={{fontSize: '0.85rem'}}>{incident.assignedTo}</span>
                          </div>
                        </td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{incident.time}</td>
                        <td>
                          <button className="btn btn-sm btn-primary" style={{ fontSize: '0.75rem' }}>Manage Case</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
