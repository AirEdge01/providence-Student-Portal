import React, { useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { updateStudent } from "../utils/localDB";

const navy = "#0F2C59";
const gold = "#D4AF37";

const levels = ["100L", "200L", "300L"];

export default function Profile() {
    const { student, refresh } = useAuth();
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);
    const gpaByLevel = student?.gpaByLevel || {};

    return (
        <DashboardLayout>
            <div style={{ width: "100vw", maxWidth: "100%", margin: 0, padding: "0 10px", boxSizing: "border-box" }}>
                <Breadcrumb current="My Profile" />
                
                <div className="row g-4" style={{ width: "100%", margin: 0 }}>
                    {/* Left Column - Profile Avatar Card */}
                    <div className="col-12 col-lg-4 px-2">
                        <div style={cardStyle}>
                            <img
                                src={student?.passport || "https://via.placeholder.com/140"}
                                alt="passport"
                                style={{ 
                                    width: 140, 
                                    height: 140, 
                                    borderRadius: "50%", 
                                    objectFit: "cover", 
                                    border: `4px solid ${gold}`, 
                                    display: "block", 
                                    margin: "0 auto 16px" 
                                }}
                            />
                            <div style={{ textAlign: "center", marginBottom: 10 }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileRef}
                                    style={{ display: "none" }}
                                    onChange={async (e) => {
                                        const file = e.target.files && e.target.files[0];
                                        if (!file) return;
                                        setUploading(true);
                                        try {
                                            const reader = new FileReader();
                                            reader.onload = async () => {
                                                const dataUrl = reader.result;
                                                try {
                                                    updateStudent(student.id, { passport: dataUrl });
                                                    refresh();
                                                } catch (err) {
                                                    console.error(err);
                                                }
                                                setUploading(false);
                                            };
                                            reader.readAsDataURL(file);
                                        } catch (err) {
                                            console.error(err);
                                            setUploading(false);
                                        }
                                    }}
                                />
                                <button 
                                    className="btn btn-sm btn-outline-primary" 
                                    onClick={() => fileRef.current && fileRef.current.click()} 
                                    disabled={!student || uploading}
                                >
                                    {uploading ? "Uploading..." : "Change Photo"}
                                </button>
                            </div>
                            <h5 style={{ textAlign: "center", color: navy, fontWeight: 700 }}>{student?.fullName}</h5>
                            <p style={{ textAlign: "center", color: "#6c757d", fontSize: 14 }}>{student?.matricNumber}</p>
                            <div style={{ textAlign: "center" }}>
                                <span style={{ background: gold, color: navy, padding: "6px 16px", borderRadius: 30, fontWeight: 600, fontSize: 13 }}>
                                    {student?.level}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Academic Details & GPA */}
                    <div className="col-12 col-lg-8 px-2">
                        <div style={cardStyle}>
                            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>Academic Information</h6>
                            <div className="row g-3">
                                <InfoField label="Full Name" value={student?.fullName} />
                                <InfoField label="Matric Number" value={student?.matricNumber} />
                                <InfoField label="Faculty" value={student?.faculty} />
                                <InfoField label="Department" value={student?.department} />
                                <InfoField label="Course of Study" value={student?.courseOfStudy} />
                                <InfoField label="Current Level" value={student?.level} />
                            </div>
                        </div>

                        <div style={{ ...cardStyle, marginTop: 20 }}>
                            <h6 style={{ color: navy, fontWeight: 700, marginBottom: 18 }}>Grade Point Average by Level</h6>
                            <div className="table-responsive">
                                <table className="table align-middle" style={{ width: "100%" }}>
                                    <thead>
                                        <tr style={{ fontSize: 13.5, color: navy }}>
                                            <th>Level</th>
                                            <th>GPA</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {levels.map((lvl) => {
                                            const gpa = gpaByLevel[lvl];
                                            const reached = levels.indexOf(lvl) <= levels.indexOf(student?.level);
                                            return (
                                                <tr key={lvl} style={{ fontSize: 14 }}>
                                                    <td style={{ fontWeight: 600, color: navy }}>{lvl}</td>
                                                    <td>{gpa !== undefined ? gpa.toFixed(2) : "-"}</td>
                                                    <td>
                                                        {gpa !== undefined ? (
                                                            <span className="badge" style={{ background: "#E8F6EC", color: "#1e8e5a" }}>Completed</span>
                                                        ) : reached ? (
                                                            <span className="badge" style={{ background: "#FFF3CD", color: "#997404" }}>In Progress</span>
                                                        ) : (
                                                            <span className="badge" style={{ background: "#F5F6F8", color: "#6c757d" }}>Not Yet Reached</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function InfoField({ label, value }) {
    return (
        <div className="col-12 col-md-6">
            <div style={{ fontSize: 12.5, color: "#6c757d", marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#212529" }}>{value || "-"}</div>
        </div>
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
    padding: 24, 
    boxShadow: "0 4px 14px rgba(15,44,89,0.06)",
    width: "100%",
    boxSizing: "border-box"
};