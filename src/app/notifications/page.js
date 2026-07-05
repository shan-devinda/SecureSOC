"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Bell, AlertTriangle, CheckCircle, Info, X, Settings } from 'lucide-react';

const mockNotifications = [
  { id: 'N-001', time: '10:42 AM', type: 'Critical', title: 'Ransomware Detected on HR Network', msg: 'A ransomware binary has been flagged on WS-HR-12. Immediate action required.', read: false, channel: 'In-App + Email' },
  { id: 'N-002', time: '10:35 AM', type: 'Warning', title: 'New Critical Alert – Brute Force', msg: 'Alert AL-1042 raised: 240 failed SSH login attempts from 192.168.1.45 in 5 minutes.', read: false, channel: 'In-App' },
  { id: 'N-003', time: '10:20 AM', type: 'Warning', title: 'Asset Offline – Core Switch', msg: 'Device CORE-SW-01 (10.0.0.1) stopped responding to health checks.', read: false, channel: 'In-App + Email + SMS' },
  { id: 'N-004', time: '09:55 AM', type: 'Info', title: 'Threat Feed Synchronized', msg: 'Successfully pulled 1,248 new IOCs from Threat Feed (VirusTotal, AbuseIPDB).', read: true, channel: 'In-App' },
  { id: 'N-005', time: '09:40 AM', type: 'Info', title: 'Scheduled Report Generated', msg: 'The weekly executive summary report (REP-101) is ready for download.', read: true, channel: 'In-App + Email' },
  { id: 'N-006', time: '09:12 AM', type: 'Warning', title: 'High CPU Usage – DB Server', msg: 'Database Primary (10.0.2.5) CPU usage at 94% for 10 consecutive minutes.', read: true, channel: 'In-App' },
  { id: 'N-007', time: '08:55 AM', type: 'Info', title: 'New User Created', msg: 'Super Administrator created account for newanalyst@securesoc.com (Analyst role).', read: true, channel: 'Email' },
];

const getTypeStyle = (type) => {
  switch (type) {
    case 'Critical': return { icon: <AlertTriangle size={18} className="text-danger" />, borderColor: 'rgba(239,68,68,0.4)', bg: 'rgba(239,68,68,0.05)' };
    case 'Warning': return { icon: <AlertTriangle size={18} className="text-warning" />, borderColor: 'rgba(245,158,11,0.4)', bg: 'rgba(245,158,11,0.05)' };
    case 'Info': return { icon: <Info size={18} className="text-primary" />, borderColor: 'rgba(59,130,246,0.4)', bg: 'rgba(59,130,246,0.05)' };
    default: return { icon: <Bell size={18} className="text-muted" />, borderColor: 'var(--soc-border)', bg: 'transparent' };
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 fw-bold d-flex align-items-center gap-2">
            Notifications
            {unread > 0 && <span className="badge bg-danger rounded-pill">{unread}</span>}
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>In-app, email and SMS alert notifications</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center" onClick={markAllRead}><CheckCircle size={14} className="me-1" /> Mark All Read</button>
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center"><Settings size={14} className="me-1" /> Preferences</button>
        </div>
      </div>

      {/* Channel Summary */}
      <div className="row g-3 mb-4">
        {[['In-App Alerts', unread, 'text-primary'], ['Email Alerts', '3', 'text-success'], ['SMS Alerts', '1', 'text-warning'], ['Total (24h)', notifications.length, 'text-white']].map(([label, val, cls]) => (
          <div className="col-md-3" key={label}>
            <div className="soc-card"><div className="soc-card-body">
              <h6 className="text-muted mb-1">{label}</h6>
              <h3 className={`mb-0 fw-bold ${cls}`}>{val}</h3>
            </div></div>
          </div>
        ))}
      </div>

      {/* Notification Feed */}
      <div className="soc-card">
        <div className="soc-card-header">Notification Feed</div>
        <div className="soc-card-body d-flex flex-column gap-2 p-3">
          {notifications.length === 0 && (
            <div className="text-center py-5 text-muted">
              <CheckCircle size={48} className="mb-3 text-success" />
              <p>You're all caught up! No notifications.</p>
            </div>
          )}
          {notifications.map(n => {
            const { icon, borderColor, bg } = getTypeStyle(n.type);
            return (
              <div key={n.id}
                className="d-flex align-items-start gap-3 p-3 rounded"
                style={{ border: `1px solid ${borderColor}`, background: bg, opacity: n.read ? 0.6 : 1, transition: 'opacity 0.2s' }}
              >
                <div className="mt-1">{icon}</div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      {!n.read && <span className="badge bg-primary me-2 mb-1" style={{ fontSize: '0.65rem' }}>NEW</span>}
                      <span className="fw-semibold text-white">{n.title}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 ms-3">
                      <span className="text-muted" style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{n.time}</span>
                      {!n.read && (
                        <button className="btn btn-sm btn-outline-secondary py-0 px-2" style={{ fontSize: '0.72rem' }} onClick={() => markRead(n.id)}>Mark Read</button>
                      )}
                      <button className="btn btn-sm btn-link text-muted p-0" onClick={() => dismiss(n.id)}><X size={14} /></button>
                    </div>
                  </div>
                  <p className="text-muted mb-1 mt-1" style={{ fontSize: '0.85rem' }}>{n.msg}</p>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Channel: <span className="text-primary">{n.channel}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
