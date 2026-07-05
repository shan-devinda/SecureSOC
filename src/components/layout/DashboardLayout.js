"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShieldAlert, Activity, Server, FileText,
  Settings, LogOut, Bell, Search, User, BookOpen, Globe,
  Shield, AlertTriangle, Bug, Briefcase, ClipboardList, ChevronDown, ChevronRight, Wifi
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [monitorOpen, setMonitorOpen] = useState(true);
  const [mgmtOpen, setMgmtOpen] = useState(true);

  const monitorNav = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Network Monitor', icon: Wifi, href: '/network' },
    { label: 'Log Management', icon: BookOpen, href: '/logs' },
    { label: 'Alerts', icon: ShieldAlert, href: '/alerts' },
  ];

  const mgmtNav = [
    { label: 'Incidents', icon: Activity, href: '/incidents' },
    { label: 'Case Management', icon: Briefcase, href: '/cases' },
    { label: 'Threat Intelligence', icon: Globe, href: '/threat-intel' },
    { label: 'Vulnerabilities', icon: Bug, href: '/vulnerabilities' },
    { label: 'Assets', icon: Server, href: '/assets' },
    { label: 'Audit Logs', icon: ClipboardList, href: '/audit-logs' },
    { label: 'Notifications', icon: Bell, href: '/notifications' },
    { label: 'Reports', icon: FileText, href: '/reports' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    return (
      <li className="nav-item">
        <Link href={item.href} className={`nav-link text-decoration-none ${isActive ? 'active' : ''}`}>
          <Icon size={18} />
          <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar p-2 d-flex flex-column" style={{ width: '240px', minWidth: '240px' }}>
        <div className="d-flex align-items-center mb-4 px-2 mt-3 text-white">
          <ShieldAlert className="me-2 text-primary" size={26} />
          <h5 className="mb-0 fw-bold">Secure<span className="text-primary">SOC</span></h5>
        </div>

        {/* Monitor Group */}
        <div className="mb-1">
          <button
            className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 border-0 bg-transparent mb-1 px-2"
            style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            onClick={() => setMonitorOpen(!monitorOpen)}
          >
            {monitorOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Monitoring
          </button>
          {monitorOpen && (
            <ul className="nav flex-column">
              {monitorNav.map(item => <NavItem key={item.href} item={item} />)}
            </ul>
          )}
        </div>

        {/* Management Group */}
        <div className="mb-1 mt-2">
          <button
            className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 border-0 bg-transparent mb-1 px-2"
            style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            onClick={() => setMgmtOpen(!mgmtOpen)}
          >
            {mgmtOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Management
          </button>
          {mgmtOpen && (
            <ul className="nav flex-column">
              {mgmtNav.map(item => <NavItem key={item.href} item={item} />)}
            </ul>
          )}
        </div>

        <div className="mt-auto pb-2">
          <Link href="/login" className="nav-link w-100 text-start border-0 bg-transparent" style={{ color: '#f87171' }}>
            <LogOut size={18} />
            <span style={{ fontSize: '0.9rem' }}>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        {/* Top Navbar */}
        <div className="top-navbar d-flex justify-content-between align-items-center px-4 py-3 sticky-top">
          <div className="d-flex align-items-center rounded px-3 py-2" style={{ border: '1px solid var(--soc-border)', width: '300px', background: 'rgba(15,23,42,0.6)' }}>
            <Search size={16} className="text-secondary me-2" />
            <input type="text" className="bg-transparent border-0 text-white w-100" placeholder="Search events, IPs, assets..." style={{ outline: 'none', fontSize: '0.875rem' }} />
          </div>

          <div className="d-flex align-items-center gap-4">
            {/* Live pulse indicator */}
            <div className="d-flex align-items-center gap-2">
              <span className="rounded-circle bg-success d-inline-block" style={{ width: '8px', height: '8px', boxShadow: '0 0 0 2px rgba(16,185,129,0.3)', animation: 'pulse 2s infinite' }}></span>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>Live</span>
            </div>
            <div className="position-relative" style={{ cursor: 'pointer' }}>
              <Bell size={20} className="text-white" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>3</span>
            </div>
            <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '34px', height: '34px' }}>
                <User size={16} className="text-white" />
              </div>
              <div className="text-white d-none d-md-block">
                <div className="fw-semibold" style={{ fontSize: '0.85rem' }}>Admin User</div>
                <div className="text-secondary" style={{ fontSize: '0.72rem' }}>Super Administrator</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 flex-grow-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
