"use client";
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileText, Download, Calendar, Filter, FileBarChart } from 'lucide-react';

export default function ReportsPage() {
  const mockReports = [
    { id: 'REP-101', name: 'Weekly Executive Summary', type: 'Executive', date: '2026-07-01', size: '2.4 MB' },
    { id: 'REP-102', name: 'Monthly Compliance Report (ISO 27001)', type: 'Compliance', date: '2026-06-30', size: '5.1 MB' },
    { id: 'REP-103', name: 'Vulnerability Assessment - Q2', type: 'Vulnerability', date: '2026-06-15', size: '12.8 MB' },
    { id: 'REP-104', name: 'Incident Post-Mortem (INC-2026-004)', type: 'Incident', date: '2026-06-10', size: '1.1 MB' },
    { id: 'REP-105', name: 'Firewall Rule Audit', type: 'Audit', date: '2026-06-05', size: '3.7 MB' },
  ];

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Reports & Analytics</h2>
        <button className="btn btn-primary btn-sm d-flex align-items-center"><FileBarChart size={16} className="me-1"/> Generate Custom Report</button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <div className="soc-card h-100">
            <div className="soc-card-header">Report Templates</div>
            <div className="soc-card-body">
              <div className="list-group list-group-flush rounded bg-transparent">
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <div className="bg-primary-soft p-2 rounded me-3"><FileText size={20}/></div>
                  <div>
                    <div className="fw-medium">Executive Summary</div>
                    <div className="text-muted" style={{fontSize: '0.8rem'}}>High-level KPIs and metrics</div>
                  </div>
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <div className="bg-success-soft p-2 rounded me-3"><FileText size={20}/></div>
                  <div>
                    <div className="fw-medium">Compliance Audit</div>
                    <div className="text-muted" style={{fontSize: '0.8rem'}}>ISO 27001, SOC2, HIPAA standards</div>
                  </div>
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <div className="bg-warning-soft p-2 rounded me-3"><FileText size={20}/></div>
                  <div>
                    <div className="fw-medium">Asset Vulnerabilities</div>
                    <div className="text-muted" style={{fontSize: '0.8rem'}}>Detailed CVEs and patch status</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="soc-card h-100">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Generated Reports Archive</span>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center"><Calendar size={14} className="me-1"/> Date Range</button>
                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center"><Filter size={14} className="me-1"/> Filter</button>
              </div>
            </div>
            <div className="soc-card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr>
                      <th className="px-4 py-3">Report Name</th>
                      <th>Type</th>
                      <th>Generation Date</th>
                      <th>Size</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-4">
                          <div className="fw-medium">{report.name}</div>
                          <div className="text-muted" style={{fontSize: '0.75rem'}}>{report.id}</div>
                        </td>
                        <td><span className="badge bg-secondary bg-opacity-25 text-light border border-secondary">{report.type}</span></td>
                        <td className="text-muted">{report.date}</td>
                        <td className="text-muted">{report.size}</td>
                        <td>
                          <button className="btn btn-sm btn-primary d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
                            <Download size={14} className="me-1"/> Download PDF
                          </button>
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
