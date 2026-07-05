"use client";
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Server, Monitor, HardDrive, Wifi, Shield, Search, Plus, Filter } from 'lucide-react';

export default function AssetsPage() {
  const mockAssets = [
    { id: 'AS-001', name: 'Web Server Prod 01', ip: '10.0.1.10', type: 'Server', os: 'Ubuntu 22.04', status: 'Online', lastScan: '10 mins ago' },
    { id: 'AS-002', name: 'Database Primary', ip: '10.0.2.5', type: 'Database', os: 'RHEL 9', status: 'Online', lastScan: '1 hour ago' },
    { id: 'AS-003', name: 'Firewall Edge', ip: '192.168.1.1', type: 'Firewall', os: 'pfSense', status: 'Online', lastScan: '5 mins ago' },
    { id: 'AS-004', name: 'Developer Workstation 12', ip: '10.0.5.42', type: 'Workstation', os: 'Windows 11', status: 'Offline', lastScan: '2 days ago' },
    { id: 'AS-005', name: 'HR File Share', ip: '10.0.3.15', type: 'Storage', os: 'Windows Server 2022', status: 'Online', lastScan: '30 mins ago' },
    { id: 'AS-006', name: 'Guest WiFi AP', ip: '192.168.10.2', type: 'Network', os: 'Cisco IOS', status: 'Warning', lastScan: '10 mins ago' },
  ];

  const getDeviceIcon = (type) => {
    switch(type) {
      case 'Server': return <Server size={18} className="text-primary" />;
      case 'Database': return <HardDrive size={18} className="text-info" />;
      case 'Firewall': return <Shield size={18} className="text-danger" />;
      case 'Network': return <Wifi size={18} className="text-warning" />;
      default: return <Monitor size={18} className="text-secondary" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Online': return <span className="badge bg-success bg-opacity-25 text-success border border-success">Online</span>;
      case 'Offline': return <span className="badge bg-secondary bg-opacity-25 text-secondary border border-secondary">Offline</span>;
      case 'Warning': return <span className="badge bg-warning bg-opacity-25 text-warning border border-warning">Warning</span>;
      default: return <span className="badge bg-light text-dark">Unknown</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">Asset Inventory</h2>
        <button className="btn btn-primary btn-sm d-flex align-items-center"><Plus size={16} className="me-1"/> Add Asset</button>
      </div>

      <div className="row g-4 mb-4">
        {/* Asset Stats */}
        <div className="col-md-3">
          <div className="soc-card h-100">
            <div className="soc-card-body">
              <h6 className="text-muted mb-2">Total Assets</h6>
              <h3 className="mb-0 fw-bold">1,402</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="soc-card h-100 border-success border-opacity-50">
            <div className="soc-card-body">
              <h6 className="text-muted mb-2">Monitored & Healthy</h6>
              <h3 className="mb-0 fw-bold text-success">1,380</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="soc-card h-100 border-warning border-opacity-50">
            <div className="soc-card-body">
              <h6 className="text-muted mb-2">Vulnerable Assets</h6>
              <h3 className="mb-0 fw-bold text-warning">45</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="soc-card h-100 border-danger border-opacity-50">
            <div className="soc-card-body">
              <h6 className="text-muted mb-2">Critical Unpatched</h6>
              <h3 className="mb-0 fw-bold text-danger">12</h3>
            </div>
          </div>
        </div>

        {/* Asset Table */}
        <div className="col-12">
          <div className="soc-card">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Discovered Assets</span>
              <div className="d-flex gap-2">
                <div className="input-group input-group-sm" style={{ width: '250px' }}>
                  <span className="input-group-text bg-transparent border-secondary"><Search size={14} className="text-muted"/></span>
                  <input type="text" className="form-control bg-transparent border-start-0 border-secondary text-white shadow-none" placeholder="Search by name or IP..." />
                </div>
                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center"><Filter size={14} className="me-1"/> Filter</button>
              </div>
            </div>
            <div className="soc-card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead>
                    <tr>
                      <th className="px-4 py-3">Asset Name</th>
                      <th>IP Address</th>
                      <th>Type</th>
                      <th>Operating System</th>
                      <th>Status</th>
                      <th>Last Scan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAssets.map((asset) => (
                      <tr key={asset.id}>
                        <td className="px-4">
                          <div className="d-flex align-items-center">
                            <div className="me-3">{getDeviceIcon(asset.type)}</div>
                            <div>
                              <div className="fw-medium">{asset.name}</div>
                              <div className="text-muted" style={{fontSize: '0.75rem'}}>{asset.id}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="font-monospace">{asset.ip}</span></td>
                        <td>{asset.type}</td>
                        <td className="text-muted">{asset.os}</td>
                        <td>{getStatusBadge(asset.status)}</td>
                        <td className="text-muted" style={{fontSize: '0.85rem'}}>{asset.lastScan}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" style={{ fontSize: '0.75rem' }}>View Details</button>
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
