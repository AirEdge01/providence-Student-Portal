import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navy = "#0F2C59";
const gold = "#D4AF37";
const softGrey = "#F5F6F8";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
  { label: "My Profile", path: "/dashboard/profile", icon: "bi-person" },
  { label: "My Courses", path: "/dashboard/courses", icon: "bi-journal-bookmark" },
  { label: "My Results", path: "/dashboard/results", icon: "bi-clipboard-data" },
  { label: "Academic History", path: "/dashboard/history", icon: "bi-clock-history" },
  { label: "Change Password", path: "/dashboard/change-password", icon: "bi-shield-lock" },
];

export default function DashboardLayout({ children }) {
  const { student, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: softGrey }}>
      <aside className="d-none d-lg-block no-print" style={{ width: 260, background: navy, color: "#fff", position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto" }}>
        <Sidebar student={student} location={location} onLogout={handleLogout} />
      </aside>

      <div className="d-lg-none no-print" style={{ position: "fixed", top: 0, left: sidebarOpen ? 0 : -280, width: 260, height: "100vh", background: navy, color: "#fff", zIndex: 1050, transition: "left 0.3s ease", overflowY: "auto" }}>
        <Sidebar student={student} location={location} onLogout={handleLogout} onNavigate={() => setSidebarOpen(false)} />
      </div>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="d-lg-none no-print" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1045 }} />}

      <div style={{ flex: 1 }}>
        <div className="d-lg-none no-print" style={{ background: navy, color: "#fff", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 22 }}><i className="bi bi-list"></i></button>
          <span style={{ color: gold, fontWeight: 600 }}>Student Portal</span>
          <div style={{ width: 22 }} />
        </div>
        <div style={{ padding: 24 }} className="d-lg-none">{children}</div>
        <div style={{ marginLeft: 260, padding: 24 }} className="d-none d-lg-block">{children}</div>
      </div>

      <style>{`@media print { .no-print { display: none !important; } }`}</style>
    </div>
  );
}

function Sidebar({ student, location, onLogout, onNavigate }) {
  return (
    <div className="d-flex flex-column h-100" style={{ padding: "20px 0" }}>
      <div style={{ textAlign: "center", padding: "0 16px 20px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        <img src={student?.passport || "https://via.placeholder.com/70"} alt="student" style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover", border: `3px solid ${gold}`, marginBottom: 10 }} />
        <div style={{ fontWeight: 700, fontSize: 14 }}>{student?.fullName}</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>{student?.matricNumber}</div>
      </div>
      <nav style={{ flex: 1, padding: "16px 10px" }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onNavigate} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 8, marginBottom: 4, color: active ? navy : "#fff", background: active ? gold : "transparent", textDecoration: "none", fontWeight: active ? 600 : 500, fontSize: 14.5 }}>
              <i className={`bi ${item.icon}`}></i>{item.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ padding: "10px" }}>
        <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 8, color: "#fff", background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.4)", fontWeight: 500, fontSize: 14.5 }}>
          <i className="bi bi-box-arrow-right"></i>Logout
        </button>
      </div>
    </div>
  );
}