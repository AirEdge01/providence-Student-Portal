import React from "react";
import { Link } from "react-router-dom";

export default function NotEligible({ matricNumber }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", padding: 24 }}>
            <div style={{ background: "#fff", padding: 32, borderRadius: 12, maxWidth: 720, width: "100%", boxShadow: "0 8px 30px rgba(10,25,47,0.06)" }}>
                <h3 style={{ marginBottom: 8 }}>Not Eligible</h3>
                <p style={{ color: "#6c757d" }}>The matriculation number <strong>{matricNumber || "—"}</strong> is not on our registry for the selected intake.</p>
                <div style={{ marginTop: 18 }}>
                    <Link to="/signup" className="btn btn-primary me-2">Try Signup</Link>
                    <Link to="/" className="btn btn-outline-secondary">Return Home</Link>
                </div>
            </div>
        </div>
    );
}