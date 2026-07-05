"use client";
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Users, Database, Shield, Link as LinkIcon, Bell, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">System Configuration</h2>
        <button className="btn btn-primary btn-sm d-flex align-items-center"><Save size={16} className="me-1"/> Save Changes</button>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="soc-card h-100">
            <div className="soc-card-body p-0">
              <div className="list-group list-group-flush rounded bg-transparent">
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-primary border-secondary d-flex align-items-center py-3 active border-start border-primary border-4">
                  <Settings size={18} className="me-3"/> General
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <Users size={18} className="me-3"/> Users & Roles (RBAC)
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <LinkIcon size={18} className="me-3"/> Integrations (SIEM/IDS)
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <Bell size={18} className="me-3"/> Notifications
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <Shield size={18} className="me-3"/> Security Policy
                </button>
                <button type="button" className="list-group-item list-group-item-action bg-transparent text-white border-secondary d-flex align-items-center py-3">
                  <Database size={18} className="me-3"/> Data Retention
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="soc-card mb-4">
            <div className="soc-card-header">General Settings</div>
            <div className="soc-card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-muted">Organization Name</label>
                  <input type="text" className="form-control bg-dark border-secondary text-white" defaultValue="Acme Corp" />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted">Support Email</label>
                  <input type="email" className="form-control bg-dark border-secondary text-white" defaultValue="soc-support@acmecorp.com" />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted">Timezone</label>
                  <select className="form-select bg-dark border-secondary text-white">
                    <option>UTC (Universal Coordinated Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted">Dashboard Refresh Rate</label>
                  <select className="form-select bg-dark border-secondary text-white">
                    <option>Real-time (WebSockets)</option>
                    <option>Every 10 seconds</option>
                    <option>Every 30 seconds</option>
                    <option>Every 1 minute</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="soc-card">
            <div className="soc-card-header">SIEM / IDS Integrations (Mock Configuration)</div>
            <div className="soc-card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 text-white">Elasticsearch (Log Storage)</h6>
                  <span className="badge bg-success">Connected</span>
                </div>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input type="text" className="form-control bg-dark border-secondary text-white form-control-sm" defaultValue="https://elk.internal.acmecorp.com:9200" />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-outline-secondary btn-sm w-100">Test Connection</button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 text-white">Wazuh Manager (HIDS)</h6>
                  <span className="badge bg-success">Connected</span>
                </div>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input type="text" className="form-control bg-dark border-secondary text-white form-control-sm" defaultValue="https://wazuh.internal.acmecorp.com:55000" />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-outline-secondary btn-sm w-100">Test Connection</button>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 text-white">Suricata (NIDS)</h6>
                  <span className="badge bg-warning text-dark">Disconnected</span>
                </div>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input type="text" className="form-control bg-dark border-secondary text-white form-control-sm" defaultValue="tcp://suricata.internal.acmecorp.com:8086" />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-primary btn-sm w-100">Connect</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
