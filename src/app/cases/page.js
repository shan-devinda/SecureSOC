"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Briefcase, Plus, User, Paperclip, MessageSquare } from 'lucide-react';

const mockCases = [
  { id: 'CASE-2026-001', title: 'Ransomware Investigation – HR Subnet', relatedAlert: 'AL-1040', analyst: 'Sarah Jenkins', priority: 'Critical', status: 'Open', created: '2026-07-05', evidence: 3, notes: 5 },
  { id: 'CASE-2026-002', title: 'Suspicious Outbound C2 Traffic', relatedAlert: 'AL-1041', analyst: 'Mike Chen', priority: 'High', status: 'In Progress', created: '2026-07-04', evidence: 2, notes: 3 },
  { id: 'CASE-2026-003', title: 'Brute Force Attack on SSH Service', relatedAlert: 'AL-1042', analyst: 'David Ross', priority: 'High', status: 'In Progress', created: '2026-07-04', evidence: 1, notes: 2 },
  { id: 'CASE-2026-004', title: 'Unauthorized VPN Login from Geo-blocked Region', relatedAlert: 'AL-1038', analyst: 'Priya Nair', priority: 'Medium', status: 'Pending Review', created: '2026-07-03', evidence: 1, notes: 1 },
  { id: 'CASE-2026-005', title: 'Phishing Campaign Targeting Finance Team', relatedAlert: 'AL-1037', analyst: 'Sarah Jenkins', priority: 'Medium', status: 'Closed', created: '2026-07-01', evidence: 4, notes: 8 },
];

const getPrioBadge = (p) => ({ Critical: 'bg-danger', High: 'bg-warning text-dark', Medium: 'bg-primary', Low: 'bg-secondary' })[p];
const getStatusBadge = (s) => ({ 'Open': 'bg-danger', 'In Progress': 'bg-warning text-dark', 'Pending Review': 'bg-primary', 'Closed': 'bg-success' })[s];

export default function CasesPage() {
  const [activeCase, setActiveCase] = useState(null);

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Case Management</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Investigation cases, evidence and analyst collaboration</p>
        </div>
        <button className="btn btn-primary btn-sm d-flex align-items-center"><Plus size={14} className="me-1" /> Create Case</button>
      </div>

      <div className="row g-3 mb-4">
        {[['Total Cases', mockCases.length, 'text-white'], ['Open', mockCases.filter(c=>c.status==='Open').length, 'text-danger'], ['In Progress', mockCases.filter(c=>c.status==='In Progress').length, 'text-warning'], ['Closed', mockCases.filter(c=>c.status==='Closed').length, 'text-success']].map(([label, val, cls]) => (
          <div className="col-md-3" key={label}>
            <div className="soc-card"><div className="soc-card-body">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`mb-0 fw-bold ${cls}`}>{val}</h3>
            </div></div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className={activeCase ? 'col-lg-6' : 'col-12'}>
          <div className="soc-card">
            <div className="soc-card-header">All Cases</div>
            <div className="soc-card-body p-0">
              <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.85rem' }}>
                <thead><tr>
                  <th className="px-4 py-3">Case ID</th>
                  <th>Title</th>
                  <th>Analyst</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Evidence</th>
                  <th>Action</th>
                </tr></thead>
                <tbody>
                  {mockCases.map(c => (
                    <tr key={c.id} className={activeCase?.id === c.id ? 'table-active' : ''}>
                      <td className="px-4 text-primary font-monospace">{c.id}</td>
                      <td className="fw-medium text-white" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '22px', height: '22px' }}>
                            <User size={12} className="text-white" />
                          </div>
                          <span className="text-muted">{c.analyst.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td><span className={`badge ${getPrioBadge(c.priority)}`}>{c.priority}</span></td>
                      <td><span className={`badge ${getStatusBadge(c.status)}`}>{c.status}</span></td>
                      <td>
                        <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.78rem' }}>
                          <span className="d-flex align-items-center gap-1"><Paperclip size={12} />{c.evidence}</span>
                          <span className="d-flex align-items-center gap-1"><MessageSquare size={12} />{c.notes}</span>
                        </div>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }} onClick={() => setActiveCase(activeCase?.id === c.id ? null : c)}>
                          {activeCase?.id === c.id ? 'Close' : 'Open'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {activeCase && (
          <div className="col-lg-6">
            <div className="soc-card h-100">
              <div className="soc-card-header d-flex justify-content-between align-items-center">
                <span>{activeCase.id}</span>
                <span className={`badge ${getStatusBadge(activeCase.status)}`}>{activeCase.status}</span>
              </div>
              <div className="soc-card-body">
                <h6 className="fw-bold text-white mb-3">{activeCase.title}</h6>
                <div className="row g-2 mb-4" style={{ fontSize: '0.82rem' }}>
                  {[['Related Alert', activeCase.relatedAlert], ['Analyst', activeCase.analyst], ['Priority', activeCase.priority], ['Created', activeCase.created]].map(([k, v]) => (
                    <div className="col-6" key={k}>
                      <div className="text-muted mb-0">{k}</div>
                      <div className="text-white fw-medium">{v}</div>
                    </div>
                  ))}
                </div>

                <h6 className="text-muted mb-2" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Case Timeline</h6>
                <div className="d-flex flex-column gap-2">
                  {[
                    { time: '10:42 AM', actor: 'System', msg: 'Case automatically created from Alert ' + activeCase.relatedAlert, type: 'system' },
                    { time: '10:45 AM', actor: activeCase.analyst, msg: 'Analyst assigned and initial triage started.', type: 'action' },
                    { time: '11:00 AM', actor: activeCase.analyst, msg: 'Collected network packet captures as evidence.', type: 'evidence' },
                    { time: '11:30 AM', actor: activeCase.analyst, msg: 'Escalated to Incident Response team for containment.', type: 'action' },
                  ].map((e, i) => (
                    <div key={i} className="d-flex gap-3 p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="text-muted" style={{ minWidth: '65px', fontSize: '0.75rem' }}>{e.time}</div>
                      <div>
                        <div className="fw-medium text-white" style={{ fontSize: '0.82rem' }}>{e.actor}</div>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{e.msg}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <textarea className="form-control bg-dark border-secondary text-white mb-2" rows={2} placeholder="Add a note to this case..." style={{ fontSize: '0.85rem' }}></textarea>
                  <button className="btn btn-primary btn-sm">Add Note</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
