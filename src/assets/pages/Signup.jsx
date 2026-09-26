import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navy = "#0F2C59";
const gold = "#D4AF37";

// Inline SVG logo fallback to guarantee render on Vercel
function CollegeLogo() {
    // return (
    //     <div style={{ width: 64, height: 64, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    //         <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <circle cx="32" cy="32" r="32" fill={gold} />
    //             <circle cx="32" cy="32" r="29" fill={navy} />
    //             <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="28" fill={gold}>
    //                 P
    //             </text>
    //         </svg>
    //     </div>
    // );

    return (
        <div style={{ width: 64, height: 64, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/src/assets/provi.png" alt="Providence Logo"
                style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
            />
        </div>
    );
}

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        matricNumber: "",
        programme: "",
        department: "",
        level: "100L",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // load draft
    useEffect(() => {
        try {
            const raw = localStorage.getItem("pice_signup_draft");
            if (raw) setForm(JSON.parse(raw));
        } catch (e) { }
    }, []);

    // persist draft
    useEffect(() => {
        try {
            localStorage.setItem("pice_signup_draft", JSON.stringify(form));
        } catch (e) { }
    }, [form]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
        if (form.password.length < 6) return setError("Password must be at least 6 characters.");

        setLoading(true);
        try {
            try {
                localStorage.setItem("pice_last_signup", JSON.stringify(form));
                console.log("pice_last_signup", {
                    fullName: form.fullName,
                    matricNumber: form.matricNumber,
                    email: form.email,
                    password: form.password,
                });
            } catch (e) { }

            await signup(form);
            localStorage.removeItem("pice_signup_draft");
            navigate("/login");
        } catch (err) {
            if (err && err.code === "NOT_ELIGIBLE") {
                navigate("/not-eligible", { state: { matricNumber: form.matricNumber } });
                return;
            }
            if (err && err.code === "INVALID_MATRIC_DUPLICATE") {
                setError("Matric number appears multiple times in the registry. Please contact ICT.");
                return;
            }
            setError(err?.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${navy}, #163a73)`, padding: "30px 20px", boxSizing: "border-box" }}>
            <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: "1200px", padding: "clamp(24px, 4vw, 48px)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
                <div style={{ textAlign: "center", marginBottom: 26 }}>
                    <CollegeLogo />
                    <h4 style={{ color: navy, fontWeight: 700, marginBottom: 4 }}>Student Portal Registration</h4>
                    <p style={{ color: "#6c757d", fontSize: 14 }}>Providence International College of Education</p>
                </div>

                {error && <div className="alert alert-danger py-2" style={{ fontSize: 14 }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. John Adewale Doe" />
                        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                        <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="080XXXXXXXX" />
                        <Field label="Matric Number" name="matricNumber" value={form.matricNumber} onChange={handleChange} placeholder="PICE/2026/0001" />
                        <Field label="Programme" name="programme" value={form.programme} onChange={handleChange} placeholder="e.g. Early Childhood Education" />
                        <Field label="Department" name="department" value={form.department} onChange={handleChange} placeholder="e.g. Arts and Social Sciences" />
                        <div className="col-12 col-md-6 col-lg-4">
                            <label style={labelStyle}>Level</label>
                            <select name="level" value={form.level} onChange={handleChange} className="form-select" style={inputStyle}>
                                <option>100L</option>
                                <option>200L</option>
                                <option>300L</option>
                            </select>
                        </div>
                        <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" />
                        <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                    </div>

                    <button type="submit" disabled={loading} style={{ width: "100%", background: navy, color: "#fff", border: "none", padding: "14px 0", borderRadius: 8, fontWeight: 600, fontSize: 16, marginTop: 28, cursor: loading ? "not-allowed" : "pointer" }}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#6c757d" }}>
                    Already have an account? <Link to="/login" style={{ color: gold, fontWeight: 600, textDecoration: "none" }}>Log in</Link>
                </p>
            </div>
        </div>
    );
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <label style={labelStyle}>{label}</label>
            <input type={type} name={name} required value={value} onChange={onChange} className="form-control" style={inputStyle} placeholder={placeholder} />
        </div>
    );
}

const labelStyle = { fontSize: 13.5, fontWeight: 600, color: navy, display: "block", marginBottom: 4 };
const inputStyle = { borderRadius: 8, border: "1px solid #ddd", padding: "10px 12px", fontSize: 14.5, width: "100%" };