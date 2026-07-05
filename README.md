<div align="center">

<img src="https://img.shields.io/badge/SecureSOC-Intelligent%20SOC%20Dashboard-blue?style=for-the-badge&logo=shield&logoColor=white" alt="SecureSOC" />

# 🛡️ SecureSOC – Intelligent Security Operations Center Dashboard

**A centralized, web-based SOC platform for real-time threat monitoring, incident response, and security analytics.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952b3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-ff6384?style=flat-square&logo=chartdotjs&logoColor=white)](https://www.chartjs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<img width="1920" height="1073" alt="image" src="https://github.com/user-attachments/assets/7f2cea2c-c1aa-4973-a37b-319a5bb9394c" />


</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Modules](#-modules)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [SIEM Architecture](#-siem-architecture)
- [Security Features](#-security-features)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🔍 Overview

**SecureSOC** is a capstone project simulating a real-world **Security Information and Event Management (SIEM)** platform. It enables organizations to:

- **Collect** logs from firewalls, servers, endpoints, and web applications.
- **Detect** suspicious activities and cyber threats in real time.
- **Investigate** incidents through structured, multi-phase workflows.
- **Respond** efficiently with centralized case management and analyst collaboration.
- **Report** on security posture through automated, scheduled reports.

> ⚠️ This project uses **mock/simulated data** to demonstrate the SOC platform UI and workflows. Integration points for live SIEM tools (Wazuh, Suricata, Elasticsearch) are clearly marked in the Settings module.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Login page with demo RBAC roles (Super Admin, Analyst, Viewer) |
| 📊 **Live Dashboard** | Real-time KPI widgets, Chart.js visualizations, alert feeds |
| 🚨 **Alert Management** | Searchable alert stream with severity, status, and assignment |
| 🔥 **Incident Response** | 6-phase workflow: New → Investigation → Containment → Eradication → Recovery → Closed |
| 📁 **Case Management** | Alert-to-case promotion, evidence tracking, analyst notes, timeline |
| 🌍 **Threat Intelligence** | IOC registry (IPs, domains, hashes, URLs), confidence scoring, feed sync |
| 🖥️ **Network Monitoring** | Live traffic charts, top talkers, protocol distribution, active connections |
| 📜 **Log Management** | Centralized log stream from 10 source types with filtering and search |
| 🏷️ **Asset Inventory** | Full asset registry with health status, OS, department, and scan dates |
| 🐛 **Vulnerability Management** | CVE tracking, CVSS scoring, risk ratings, patch status |
| 📑 **Reports** | Executive, compliance, incident and vulnerability report templates |
| 🔍 **Audit Logs** | Immutable record of all user actions with role and IP tracking |
| 🔔 **Notifications** | In-app feed with multi-channel indicators (Email, SMS, In-App) |
| ⚙️ **System Settings** | Organization config, SIEM integration endpoints, security policies |

---

## 🧩 Modules

### 1. 🔐 User Authentication & Access Control (`/login`)
- Secure login form with show/hide password
- Role-Based Access Control (RBAC) — 6 predefined roles
- Demo credentials panel for testing
- Session management & MFA indicator

### 2. 📊 Dashboard (`/`)
Widgets: Total Events, Active Alerts, Critical Incidents, Assets Online  
Charts: Network Traffic (Line), Alert Severity (Doughnut), Top Attacks (Bar)  
Table: Real-time critical alerts feed

### 3. 🖥️ Asset Management (`/assets`)
Tracks: Servers, Routers, Switches, Firewalls, Workstations, Laptops, VMs, IoT  
Fields: Name, IP, MAC, OS, Department, Status, Last Scan

### 4. 📜 Log Management (`/logs`)
Sources: Windows Event Logs, Linux Syslog, Firewall, IDS/IPS, VPN, DNS, DHCP, Web Server, Auth, DB  
Functions: Search, filter by type & severity, real-time stream

### 5. 🚨 Alert Management (`/alerts`)
Levels: Critical, High, Medium, Low, Informational  
Features: Search, filter, assign, escalate, close

### 6. 🔥 Incident Response (`/incidents`)
Workflow phases visualized with Kanban-style tracker  
Fields: ID, Type, Severity, Status, Analyst, Timeline

### 7. 🌍 Threat Intelligence (`/threat-intel`)
IOC types: IPs, Domains, URLs, File Hashes, Emails, Malware Families  
Features: IOC search, confidence scoring, threat feed integration panel

### 8. 🔗 Network Monitoring (`/network`)
Views: 24h traffic chart, protocol pie chart, top talkers bar chart, active connections table

### 9. 🐛 Vulnerability Management (`/vulnerabilities`)
Fields: CVE ID, CVSS Score (with visual bar), Risk Rating, Affected Asset, Patch Status

### 10. 📁 Case Management (`/cases`)
Features: Create case from alert, assign analyst, evidence count, notes, case timeline panel

### 11. 📑 Reports (`/reports`)
Templates: Executive, Compliance (ISO 27001), Vulnerability, Incident, Audit  
Actions: Download PDF, filter by date range and type

### 12. 🔍 Audit Logs (`/audit-logs`)
Tracks: Login, Logout, Password Change, Alert Assignment, Incident Update, User Creation, Asset Modification, Report Generation

### 13. 🔔 Notification System (`/notifications`)
Channels: In-App, Email, SMS  
Events: New Alert, Critical Incident, Failed Login, Device Offline, High CPU  
Actions: Mark as read, dismiss, channel preferences

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org) (App Router) | 16.2 |
| **UI Components** | [Bootstrap](https://getbootstrap.com) | 5.x |
| **Charts** | [Chart.js](https://www.chartjs.org) + [react-chartjs-2](https://react-chartjs-2.js.org) | 4.x |
| **Icons** | [Lucide React](https://lucide.dev) | Latest |
| **Language** | JavaScript (ES2022) | - |
| **Styling** | Vanilla CSS with CSS Variables | - |
| **Package Manager** | npm | 11.x |

### Planned SIEM Integrations (Future)
- **Wazuh** – Host-based Intrusion Detection System (HIDS)
- **Suricata** – Network Intrusion Detection System (NIDS)
- **Elasticsearch** – Log indexing and search
- **Logstash** – Log pipeline and parsing
- **Kibana** – Log visualization
- **Filebeat / Winlogbeat** – Log shipping agents

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher → [Download](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/SecureSOC.git

# 2. Navigate into the project directory
cd SecureSOC

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Login

| Role | Email | Password |
|------|-------|----------|
| Super Administrator | `admin@securesoc.com` | `password` |
| Security Analyst | `analyst@securesoc.com` | `password` |
| Viewer | `viewer@securesoc.com` | `password` |

---

## 📁 Project Structure

```
SecureSOC/
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.js           # 📊 Dashboard
│   │   ├── login/page.js     # 🔐 Authentication
│   │   ├── alerts/page.js    # 🚨 Alert Management
│   │   ├── incidents/page.js # 🔥 Incident Response
│   │   ├── cases/page.js     # 📁 Case Management
│   │   ├── assets/page.js    # 🖥️  Asset Inventory
│   │   ├── logs/page.js      # 📜 Log Management
│   │   ├── network/page.js   # 🔗 Network Monitoring
│   │   ├── threat-intel/page.js # 🌍 Threat Intelligence
│   │   ├── vulnerabilities/page.js # 🐛 Vulnerability Mgmt
│   │   ├── audit-logs/page.js # 🔍 Audit Logs
│   │   ├── notifications/page.js # 🔔 Notifications
│   │   ├── reports/page.js   # 📑 Reports
│   │   ├── settings/page.js  # ⚙️  System Settings
│   │   ├── layout.js         # Root layout (Bootstrap CSS)
│   │   └── globals.css       # Global CSS variables & styles
│   └── components/
│       └── layout/
│           └── DashboardLayout.js  # Sidebar + Top Nav
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

---

## 🏗️ SIEM Architecture

```
Network Devices / Servers / Firewalls / Endpoints
                    │
                    ▼
          Log Collection Agents
        (Winlogbeat / Filebeat)
                    │
                    ▼
             Logstash Pipeline
                    │
                    ▼
            Elasticsearch Index
                    │
                    ▼
      SecureSOC Dashboard (Next.js)
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
 Alert Engine  Incident Mgmt   Reports
                    │
                    ▼
           Security Analysts
```

---

## 🔒 Security Features

- ✅ Role-Based Access Control (RBAC) with 6 permission levels
- ✅ Audit logging for all platform actions
- ✅ Session management & account lockout simulation
- ✅ Input validation and XSS-safe rendering
- ✅ CSRF-safe architecture (Next.js built-in)
- 🔲 AES-256 encryption for sensitive stored data *(planned)*
- 🔲 Multi-Factor Authentication (MFA) *(planned)*
- 🔲 Rate limiting *(planned)*

---

## 🔮 Future Enhancements

- [ ] AI-powered anomaly detection using machine learning
- [ ] SOAR playbooks for automated incident response
- [ ] MITRE ATT&CK framework mapping
- [ ] VirusTotal, MISP, OpenCTI API integrations
- [ ] Compliance dashboards (ISO 27001, NIST, PCI DSS)
- [ ] Real-time WebSocket updates
- [ ] Mobile-responsive PWA for analysts on the go
- [ ] Cloud deployment (Vercel / AWS / Azure)
- [ ] MySQL/PostgreSQL database backend
- [ ] Full Wazuh, Suricata, ELK stack integration

---

## 👤 Author

**Developed as a Final-Year Capstone Project**  
Network Engineering & Cybersecurity

> This project simulates a real enterprise SOC environment demonstrating practical SIEM concepts including log aggregation, alert correlation, incident response workflows, and threat intelligence management.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for Cybersecurity Education

⭐ **Star this repo if you found it useful!** ⭐

</div>
