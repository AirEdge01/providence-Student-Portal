import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import * as db from "../utils/localDB";

const navy = "#0F2C59";

export default function ChangePassword() {
  const { student } = useAuth();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (form.newPassword !== form.confirmPassword) return setMessage({ type: "danger", text: "New passwords do not match." });
    if (form.newPassword.length < 6) return setMessage({ type: "danger", text: "New password must be at least 6 characters." });

    try {
      db.changePassword(student.id, form.currentPassword, form.newPassword);
      setMessage({ type: "success", text: "Password changed successfully." });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ type: "danger", text: err.message });
    }
  };

  return (
    <DashboardLayout>
      <Breadcrumb current="Change Password" />
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div style={cardStyle}>
            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>Update Your Password</h6>
            {message.text && <div className={`alert alert-${message.type} py-2`} style={{ fontSize: 14 }}>{message.text}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3"><label style={labelStyle}>Current Password</label><input type="password" name="currentPassword" required value={form.currentPassword} onChange={handleChange} className="form-control" style={inputStyle} /></div>
              <div className="mb-3"><label style={labelStyle}>New Password</label><input type="password" name="newPassword" required value={form.newPassword} onChange={handleChange} className="form-control" style={inputStyle} /></div>
              <div className="mb-3"><label style={labelStyle}>Confirm New Password</label><input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} className="form-control" style={inputStyle} /></div>
              <button type="submit" style={{ width: "100%", background: navy, color: "#fff", border: "none", padding: "11px 0", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>Update Password</button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Breadcrumb({ current }) {
  return (
    <nav style={{ marginBottom: 18 }}>
      <ol className="breadcrumb" style={{ marginBottom: 0, fontSize: 14 }}>
        <li className="breadcrumb-item" style={{ color: "#6c757d" }}>Dashboard</li>
        <li className="breadcrumb-item active" style={{ color: navy, fontWeight: 600 }}>{current}</li>
      </ol>
    </nav>
  );
}

const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };
const labelStyle = { fontSize: 13.5, fontWeight: 600, color: "#0F2C59", display: "block", marginBottom: 4 };
const inputStyle = { borderRadius: 8, border: "1px solid #ddd", padding: "10px 12px", fontSize: 14.5 };