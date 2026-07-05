"use client";
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Wifi, Activity, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, ArcElement, Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const darkChartOptions = (indexAxis = 'x') => ({
  responsive: true, maintainAspectRatio: false, indexAxis,
  plugins: { legend: { labels: { color: '#94a3b8', boxWidth: 12 } } },
  scales: {
    x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
  }
});

const trafficData = {
  labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
  datasets: [
    { label: 'Inbound (Mbps)', data: [120, 88, 62, 55, 140, 320, 410, 380, 290, 210, 155, 130], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4 },
    { label: 'Outbound (Mbps)', data: [60, 40, 30, 28, 90, 180, 220, 190, 145, 110, 80, 70], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4 }
  ]
};

const protocolData = {
  labels: ['HTTPS', 'HTTP', 'DNS', 'SSH', 'FTP', 'SMTP', 'Other'],
  datasets: [{
    data: [45, 18, 12, 8, 5, 4, 8],
    backgroundColor: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'],
    borderWidth: 0
  }]
};

const topTalkersData = {
  labels: ['10.0.1.10', '10.0.2.5', '192.168.1.100', '10.0.5.42', '10.0.3.15'],
  datasets: [{ label: 'Traffic (GB)', data: [45.2, 38.8, 22.1, 18.4, 15.7], backgroundColor: '#6366f1', borderRadius: 4 }]
};

const mockConns = [
  { src: '10.0.1.10', dst: '8.8.8.8', proto: 'DNS', port: 53, bytes: '1.2 KB', status: 'Established' },
  { src: '192.168.1.100', dst: '45.152.66.201', proto: 'HTTPS', port: 443, bytes: '2.8 MB', status: 'Suspicious' },
  { src: '10.0.2.5', dst: '10.0.1.10', proto: 'MySQL', port: 3306, bytes: '15.4 MB', status: 'Established' },
  { src: 'External', dst: '10.0.1.10', proto: 'HTTP', port: 80, bytes: '450 KB', status: 'Established' },
  { src: '10.0.5.42', dst: '104.21.28.47', proto: 'HTTPS', port: 443, bytes: '3.1 MB', status: 'Established' },
];

export default function NetworkPage() {
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold">Network Monitoring</h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Live traffic analysis, connections and bandwidth usage</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center"><RefreshCw size={14} className="me-1" /> Refresh</button>
      </div>

      <div className="row g-3 mb-4">
        {[
          ['Bandwidth In', '410 Mbps', 'text-primary', <ArrowDown size={16} className="text-primary me-1" />],
          ['Bandwidth Out', '220 Mbps', 'text-success', <ArrowUp size={16} className="text-success me-1" />],
          ['Active Connections', '1,248', 'text-warning', null],
          ['Suspicious Flows', '14', 'text-danger', null],
        ].map(([label, val, cls, icon]) => (
          <div className="col-md-3" key={label}>
            <div className="soc-card"><div className="soc-card-body">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`mb-0 fw-bold d-flex align-items-center ${cls}`}>{icon}{val}</h3>
            </div></div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="soc-card h-100">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Network Traffic (24h)</span>
              <span className="badge bg-success">Live</span>
            </div>
            <div className="soc-card-body" style={{ height: '260px' }}>
              <Line data={trafficData} options={darkChartOptions()} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="soc-card h-100">
            <div className="soc-card-header">Protocol Distribution</div>
            <div className="soc-card-body d-flex align-items-center justify-content-center" style={{ height: '260px' }}>
              <Doughnut data={protocolData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 10, font: { size: 11 } } } }, cutout: '65%', borderWidth: 0 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="soc-card h-100">
            <div className="soc-card-header">Top Talkers (GB)</div>
            <div className="soc-card-body" style={{ height: '240px' }}>
              <Bar data={topTalkersData} options={darkChartOptions('y')} />
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="soc-card h-100">
            <div className="soc-card-header d-flex justify-content-between align-items-center">
              <span>Active Connections</span>
              <span className="badge bg-primary">Live Feed</span>
            </div>
            <div className="soc-card-body p-0">
              <table className="table table-hover mb-0 align-middle" style={{ fontSize: '0.82rem' }}>
                <thead><tr>
                  <th className="px-3 py-3">Source</th><th>Destination</th><th>Protocol</th><th>Port</th><th>Data</th><th>Status</th>
                </tr></thead>
                <tbody>
                  {mockConns.map((c, i) => (
                    <tr key={i}>
                      <td className="px-3 font-monospace text-muted">{c.src}</td>
                      <td className="font-monospace text-muted">{c.dst}</td>
                      <td><span className="badge bg-secondary bg-opacity-25 text-light border border-secondary">{c.proto}</span></td>
                      <td className="text-muted">{c.port}</td>
                      <td className="text-muted">{c.bytes}</td>
                      <td><span className={`badge ${c.status === 'Suspicious' ? 'bg-danger' : 'bg-success bg-opacity-25 text-success border border-success'}`}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
