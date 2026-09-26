import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const navy = "#0F2C59";
const gold = "#D4AF37";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(form.identifier, form.password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${navy}, #163a73)`, padding: "30px 20px", boxSizing: "border-box" }}>
            <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: "540px", padding: "clamp(24px, 4vw, 48px)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
                <div style={{ textAlign: "center", marginBottom: 26 }}>
                    <img src="/src/assets/provi.png" alt="Providence Logo"
                    style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}></img>
                    <h4 style={{ color: navy, fontWeight: 700, marginBottom: 4 }}>Student Portal Login</h4>
                    <p style={{ color: "#6c757d", fontSize: 14 }}>Providence International College of Education</p>
                </div>

                {error && <div className="alert alert-danger py-2" style={{ fontSize: 14 }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label style={labelStyle}>Matric Number </label>
                        <input type="text" required value={form.identifier} onChange={(e) => setForm({ ...form, identifier: e.target.value })} className="form-control" style={inputStyle} placeholder="PICE/2026/0001 or you@example.com" />
                    </div>
                    <div className="mb-3">
                        <label style={labelStyle}>Password</label>
                        <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="form-control" style={inputStyle} placeholder="Enter your password" />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: "100%", background: navy, color: "#fff", border: "none", padding: "14px 0", borderRadius: 8, fontWeight: 600, fontSize: 16, marginTop: 12, cursor: loading ? "not-allowed" : "pointer" }}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#6c757d" }}>
                    Don't have an account? <Link to="/signup" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
}

const labelStyle = { fontSize: 13.5, fontWeight: 600, color: navy, display: "block", marginBottom: 4 };
const inputStyle = { borderRadius: 8, border: "1px solid #ddd", padding: "10px 12px", fontSize: 14.5, width: "100%" };