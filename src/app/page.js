"use client";
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Shield, AlertTriangle, AlertOctagon, Activity, Server, Users, Wifi } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart Options for Dark Theme
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#94a3b8' } },
  },
  scales: {
    x: {
      grid: { color: '#334155', drawBorder: false },
      ticks: { color: '#94a3b8' }
    },
    y: {
      grid: { color: '#334155', drawBorder: false },
      ticks: { color: '#94a3b8' }
    }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right', labels: { color: '#94a3b8' } },
  },
  cutout: '70%',
  borderWidth: 0
};

export default function Home() {
  // Mock Data for Charts
  const networkTrafficData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Inbound Traffic (GB)',
        data: [12, 19, 35, 50, 42, 28, 15],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Outbound Traffic (GB)',
        data: [8, 12, 25, 38, 30, 20, 10],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const alertSeverityData = {
    labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
    datasets: [
      {
        data: [12, 25, 45, 80, 120],
        backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#3b82f6', '#64748b'],
        borderWidth: 0,
      }
    ]
  };

  const topAttacksData = {
    labels: ['SQL Injection', 'Brute Force', 'XSS', 'Malware', 'Phishing'],
    datasets: [
      {
        label: 'Detected Attempts',
        data: [340, 520, 210, 180, 95],
        backgroundColor: '#6366f1',
        borderRadius: 4
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold">SOC Overview</h2>
        <div>
          <button className="btn btn-outline-primary btn-sm me-2">Download Report</button>
          <button className="btn btn-primary btn-sm">Refresh Data</button>
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="soc-card h-100">
            <div className="soc-card-body d-flex align-items-center">
              <div className="widget-icon-wrapper bg-primary-soft me-3">
                <Shield size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Events (24h)</h6>
                <h3 className="mb-0 fw-bold">1,245,680</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="soc-card h-100">
            <div className="soc-card-body d-flex align-items-center">
              <div className="widget-icon-wrapper bg-warning-soft me-3">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Active Alerts</h6>
                <h3 className="mb-0 fw-bold text-warning">342</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="soc-card h-100 border-danger border-opacity-50">
            <div className="soc-card-body d-flex align-items-center">
              <div className="widget-icon-wrapper bg-danger-soft me-3">
                <AlertOctagon size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Critical Incidents</h6>
                <h3 className="mb-0 fw-bold text-danger">12</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="soc-card h-100">
            <div className="soc-card-body d-flex align-items-center">
              <div className="widget-icon-wrapper bg-success-soft me-3">
                <Server size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Assets Online</h6>
                <h3 className="mb-0 fw-bold">1,402 <span className="text-success" style={{fontSize: '0.8rem'}}>98%</span></h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="soc-card h-100">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Network Traffic Analysis</span>
              <span className="badge bg-primary">Live</span>
            </div>
            <div className="soc-card-body" style={{ height: '300px' }}>
              <Line data={networkTrafficData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="soc-card h-100">
            <div className="soc-card-header">Alert Severity Distribution</div>
            <div className="soc-card-body d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
              <Doughnut data={alertSeverityData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="soc-card h-100">
            <div className="soc-card-header">Top Attack Vectors</div>
            <div className="soc-card-body" style={{ height: '300px' }}>
              <Bar data={topAttacksData} options={{...chartOptions, indexAxis: 'y'}} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="soc-card h-100">
            <div className="soc-card-header">Recent Critical Alerts</div>
            <div className="soc-card-body p-0">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th className="px-3 py-3">Time</th>
                    <th>Source IP</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3">10:42 AM</td>
                    <td><span className="font-monospace text-warning">192.168.1.45</span></td>
                    <td>Multiple Failed Logins</td>
                    <td><span className="badge bg-danger">New</span></td>
                  </tr>
                  <tr>
                    <td className="px-3">10:35 AM</td>
                    <td><span className="font-monospace text-warning">45.22.19.102</span></td>
                    <td>Suspicious Outbound Traffic</td>
                    <td><span className="badge bg-warning text-dark">Investigating</span></td>
                  </tr>
                  <tr>
                    <td className="px-3">10:15 AM</td>
                    <td><span className="font-monospace text-warning">10.0.5.12</span></td>
                    <td>Malware Signature Detected</td>
                    <td><span className="badge bg-danger">New</span></td>
                  </tr>
                  <tr>
                    <td className="px-3">09:50 AM</td>
                    <td><span className="font-monospace text-warning">172.16.0.4</span></td>
                    <td>Unauthorized DB Access</td>
                    <td><span className="badge bg-success">Contained</span></td>
                  </tr>
                  <tr>
                    <td className="px-3">09:12 AM</td>
                    <td><span className="font-monospace text-warning">192.168.1.100</span></td>
                    <td>Ransomware Behavior</td>
                    <td><span className="badge bg-danger">New</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
}
