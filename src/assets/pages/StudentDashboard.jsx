import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function StudentDashboard() {
    const { student } = useAuth();

    return (
        <DashboardLayout>
            <div style={{ width: "100vw", maxWidth: "100%", margin: 0, padding: "0 10px", boxSizing: "border-box" }}>
                <Breadcrumb current="Overview" />

                {/* Banner */}
                <div 
                    style={{ 
                        background: `linear-gradient(120deg, ${navy}, #163a73)`, 
                        borderRadius: 16, 
                        padding: "28px 30px", 
                        color: "#fff", 
                        marginBottom: 26, 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        flexWrap: "wrap", 
                        gap: 16,
                        width: "100%",
                        boxSizing: "border-box"
                    }}
                >
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: 6 }}>
                            Welcome, {student?.fullName?.split(" ")[0]} 👋
                        </h4>
                        <p style={{ opacity: 0.85, fontSize: 14.5, marginBottom: 0 }}>
                            {student?.courseOfStudy || "Student"} • {student?.faculty || "—"}
                        </p>
                    </div>
                    <div 
                        style={{ 
                            background: gold, 
                            color: navy, 
                            padding: "8px 16px", 
                            borderRadius: 30, 
                            fontWeight: 600, 
                            fontSize: 13.5 
                        }}
                    >
                        {student?.level || "—"} • {student?.currentSession || "—"}
                    </div>
                </div>

                {/* Full Width Grid */}
                <div className="row g-4" style={{ width: "100%", margin: 0 }}>
                    <div className="col-12 col-md-6 col-lg-4 px-2">
                        <div style={cardStyle}>
                            <h6 style={{ color: navy, fontWeight: 700 }}>My CGPA</h6>
                            <div style={{ fontSize: 32, fontWeight: 800, color: navy }}>
                                {(student?.cgpa ?? 0).toFixed(2)}
                            </div>
                            <div style={{ color: "#6c757d", marginTop: 6, fontSize: 14 }}>
                                Current cumulative GPA
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 px-2">
                        <div style={cardStyle}>
                            <h6 style={{ color: navy, fontWeight: 700 }}>Registered Courses</h6>
                            <div style={{ fontSize: 32, fontWeight: 800, color: navy }}>
                                {(student?.courses || []).length}
                            </div>
                            <div style={{ color: "#6c757d", marginTop: 6, fontSize: 14 }}>
                                Courses for your session
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 px-2">
                        <div style={cardStyle}>
                            <h6 style={{ color: navy, fontWeight: 700 }}>Results</h6>
                            <div style={{ fontSize: 32, fontWeight: 800, color: navy }}>
                                {(student?.results || []).length}
                            </div>
                            <div style={{ color: "#6c757d", marginTop: 6, fontSize: 14 }}>
                                Recorded results
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function Breadcrumb({ current }) {
    return (
        <nav style={{ marginBottom: 18, width: "100%" }}>
            <ol className="breadcrumb" style={{ marginBottom: 0, fontSize: 14 }}>
                <li className="breadcrumb-item" style={{ color: "#6c757d" }}>Dashboard</li>
                <li className="breadcrumb-item active" style={{ color: navy, fontWeight: 600 }}>{current}</li>
            </ol>
        </nav>
    );
}

const cardStyle = { 
    background: "#fff", 
    borderRadius: 14, 
    padding: "24px 20px", 
    boxShadow: "0 4px 14px rgba(15,44,89,0.06)",
    width: "100%",
    height: "100%",
    boxSizing: "border-box"
};