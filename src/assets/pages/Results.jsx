// import React from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import { useAuth } from "../context/AuthContext";

// const navy = "#0F2C59";
// const gold = "#D4AF37";

// export default function Results() {
//   const { student } = useAuth();
//   const results = student?.results || [];
//   const bySession = results.reduce((acc, r) => {
//     if (!acc[r.session]) acc[r.session] = [];
//     acc[r.session].push(r);
//     return acc;
//   }, {});

//   return (
//     <DashboardLayout>
//       <Breadcrumb current="My Results" />
//       <div className="row g-3 mb-4">
//         <div className="col-md-4"><div style={{ ...cardStyle, textAlign: "center" }}><div style={{ fontSize: 13, color: "#6c757d" }}>Current CGPA</div><div style={{ fontSize: 32, fontWeight: 800, color: navy }}>{student?.cgpa?.toFixed(2) || "0.00"}</div></div></div>
//         <div className="col-md-4"><div style={{ ...cardStyle, textAlign: "center" }}><div style={{ fontSize: 13, color: "#6c757d" }}>Current Level</div><div style={{ fontSize: 32, fontWeight: 800, color: navy }}>{student?.level}</div></div></div>
//         <div className="col-md-4"><div style={{ ...cardStyle, textAlign: "center" }}><div style={{ fontSize: 13, color: "#6c757d" }}>Results Recorded</div><div style={{ fontSize: 32, fontWeight: 800, color: navy }}>{results.length}</div></div></div>
//       </div>

//       {Object.keys(bySession).length === 0 ? <div style={cardStyle}><EmptyState text="No results have been published yet." /></div> : (
//         Object.entries(bySession).map(([session, sessionResults]) => (
//           <div key={session} style={{ ...cardStyle, marginBottom: 20 }}>
//             <h6 style={{ color: navy, fontWeight: 700, marginBottom: 16 }}>{session} Session</h6>
//             <div className="table-responsive">
//               <table className="table align-middle">
//                 <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Code</th><th>Title</th><th>Unit</th><th>Score</th><th>Grade</th><th>Grade Point</th></tr></thead>
//                 <tbody>
//                   {sessionResults.map((r, i) => (
//                     <tr key={i} style={{ fontSize: 14 }}>
//                       <td style={{ fontWeight: 600, color: navy }}>{r.courseCode}</td>
//                       <td>{r.courseTitle}</td>
//                       <td>{r.creditUnit}</td>
//                       <td>{r.score}</td>
//                       <td><span className="badge" style={{ background: gold, color: navy }}>{r.grade || "-"}</span></td>
//                       <td>{r.gradePoint ?? "-"}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div style={{ textAlign: 'right', marginTop: 8 }}>
//               <button className="btn btn-sm btn-outline-primary" onClick={() => downloadSessionPDF(session, sessionResults, student)}>
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </DashboardLayout>
//   );
// }

// function downloadSessionPDF(session, sessionResults, student) {
//   try {
//     const { jsPDF } = window.jspdf || {};
//     if (!jsPDF) { alert('PDF library not loaded'); return; }
//     const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
//     const pageWidth = 210; // mm
//     let y = 20;
//     doc.setFontSize(16);
//     doc.text(`${student.fullName}`, pageWidth / 2, y, { align: 'center' });
//     y += 8;
//     doc.setFontSize(12);
//     doc.text(`${student.matricNumber} — ${student.programme || ''}`, pageWidth / 2, y, { align: 'center' });
//     y += 8;
//     doc.setFontSize(12);
//     doc.text(`${session} — Results`, 14, y);
//     y += 8;

//     // table header
//     doc.setFontSize(11);
//     const headings = ['Code', 'Title', 'Unit', 'Score', 'Grade', 'Point'];
//     doc.text(headings.join('  '), 14, y);
//     y += 6;

//     sessionResults.forEach((r) => {
//       const line = [r.courseCode, r.courseTitle, String(r.creditUnit), String(r.score), r.grade || '-', String(r.gradePoint ?? '-')];
//       // wrap title if too long
//       doc.text(line.join('  '), 14, y);
//       y += 6;
//       if (y > 275) { doc.addPage(); y = 20; }
//     });

//     y += 6;
//     doc.setFontSize(11);
//     doc.text(`CGPA: ${Number(student.cgpa || 0).toFixed(2)}`, 14, y);

//     doc.save(`${student.matricNumber}_${session}_results.pdf`);
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.error(err);
//     alert('Failed to generate PDF');
//   }
// }

// function EmptyState({ text }) {
//   return <div style={{ textAlign: "center", padding: "40px 0", color: "#adb5bd" }}><i className="bi bi-inbox" style={{ fontSize: 34 }}></i><p style={{ marginTop: 8, fontSize: 14 }}>{text}</p></div>;
// }

// function Breadcrumb({ current }) {
//   return (
//     <nav style={{ marginBottom: 18 }}>
//       <ol className="breadcrumb" style={{ marginBottom: 0, fontSize: 14 }}>
//         <li className="breadcrumb-item" style={{ color: "#6c757d" }}>Dashboard</li>
//         <li className="breadcrumb-item active" style={{ color: navy, fontWeight: 600 }}>{current}</li>
//       </ol>
//     </nav>
//   );
// }

// const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" };


import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

const navy = "#0F2C59";
const gold = "#D4AF37";

export default function Results() {
  const { student } = useAuth();
  const results = student?.results || [];
  const bySession = results.reduce((acc, r) => {
    if (!acc[r.session]) acc[r.session] = [];
    acc[r.session].push(r);
    return acc;
  }, {});

  const [printSession, setPrintSession] = useState(null); // null | "ALL" | a session string

  const handlePrintSession = (session) => {
    setPrintSession(session);
    setTimeout(() => window.print(), 100);
  };

  const handlePrintAll = () => {
    setPrintSession("ALL");
    setTimeout(() => window.print(), 100);
  };

  return (
    <DashboardLayout>
      <div className="no-print-page">
        <Breadcrumb current="My Results" />

        <div className="row g-3 mb-4">
          <div className="col-md-4"><div style={{ ...cardStyle, textAlign: "center" }}><div style={{ fontSize: 13, color: "#6c757d" }}>Current CGPA</div><div style={{ fontSize: 32, fontWeight: 800, color: navy }}>{student?.cgpa?.toFixed(2) || "0.00"}</div></div></div>
          <div className="col-md-4"><div style={{ ...cardStyle, textAlign: "center" }}><div style={{ fontSize: 13, color: "#6c757d" }}>Current Level</div><div style={{ fontSize: 32, fontWeight: 800, color: navy }}>{student?.level}</div></div></div>
          <div className="col-md-4"><div style={{ ...cardStyle, textAlign: "center" }}><div style={{ fontSize: 13, color: "#6c757d" }}>Results Recorded</div><div style={{ fontSize: 32, fontWeight: 800, color: navy }}>{results.length}</div></div></div>
        </div>

        {Object.keys(bySession).length === 0 ? (
          <div style={cardStyle}><EmptyState text="No results have been published yet." /></div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
              <button onClick={handlePrintAll} style={{ background: navy, color: "#fff", border: "none", padding: "9px 18px", borderRadius: 8, fontWeight: 600, fontSize: 13.5 }}>
                <i className="bi bi-printer me-1"></i> Print Full Transcript
              </button>
            </div>

            {Object.entries(bySession).map(([session, sessionResults]) => {
              const semUnits = sessionResults.reduce((s, r) => s + r.creditUnit, 0);
              const semPoints = sessionResults.reduce((s, r) => s + (r.gradePoint || 0) * r.creditUnit, 0);
              const sessionGPA = semUnits > 0 ? (semPoints / semUnits).toFixed(2) : "0.00";

              return (
                <div key={session} style={{ ...cardStyle, marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
                    <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>{session} Session</h6>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="badge" style={{ background: "#EAF1FB", color: navy }}>Session GPA: {sessionGPA}</span>
                      <button onClick={() => handlePrintSession(session)} style={{ background: gold, color: navy, border: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 600, fontSize: 12.5 }}>
                        <i className="bi bi-printer me-1"></i> Print
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Code</th><th>Title</th><th>Unit</th><th>Score</th><th>Grade</th><th>Grade Point</th></tr></thead>
                      <tbody>
                        {sessionResults.map((r, i) => (
                          <tr key={i} style={{ fontSize: 14 }}>
                            <td style={{ fontWeight: 600, color: navy }}>{r.courseCode}</td>
                            <td>{r.courseTitle}</td>
                            <td>{r.creditUnit}</td>
                            <td>{r.score}</td>
                            <td><span className="badge" style={{ background: gold, color: navy }}>{r.grade || "-"}</span></td>
                            <td>{r.gradePoint ?? "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="print-only">
        {printSession && (
          <PrintableResultSheet
            student={student}
            bySession={printSession === "ALL" ? bySession : { [printSession]: bySession[printSession] }}
          />
        )}
      </div>

      <style>{`
        .print-only { display: none; }
        @media print { .no-print-page { display: none !important; } .print-only { display: block !important; } }
      `}</style>
    </DashboardLayout>
  );
}

function PrintableResultSheet({ student, bySession }) {
  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif", color: "#000" }}>
      <div style={{ textAlign: "center", borderBottom: "3px solid #0F2C59", paddingBottom: 14, marginBottom: 20 }}>
        <h3 style={{ color: "#0F2C59", fontWeight: 800, marginBottom: 2 }}>Providence International College of Education</h3>
        <p style={{ margin: 0, fontSize: 14 }}>Student Academic Result Sheet</p>
      </div>

      <table style={{ width: "100%", marginBottom: 20, fontSize: 14 }}>
        <tbody>
          <tr><td style={{ padding: "4px 0", fontWeight: 700, width: "50%" }}>Name:</td><td>{student?.fullName}</td></tr>
          <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Matric Number:</td><td>{student?.matricNumber}</td></tr>
          <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Faculty:</td><td>{student?.faculty}</td></tr>
          <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Department:</td><td>{student?.department}</td></tr>
          <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Course of Study:</td><td>{student?.courseOfStudy}</td></tr>
          <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Level:</td><td>{student?.level}</td></tr>
        </tbody>
      </table>

      {Object.entries(bySession).map(([session, sessionResults]) => {
        const semUnits = sessionResults.reduce((s, r) => s + r.creditUnit, 0);
        const semPoints = sessionResults.reduce((s, r) => s + (r.gradePoint || 0) * r.creditUnit, 0);
        const sessionGPA = semUnits > 0 ? (semPoints / semUnits).toFixed(2) : "0.00";

        return (
          <div key={session} style={{ marginBottom: 24 }}>
            <h5 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{session} Session</h5>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 6 }}>
              <thead>
                <tr>
                  <th style={thStyle}>Code</th><th style={thStyle}>Title</th><th style={thStyle}>Unit</th><th style={thStyle}>Score</th><th style={thStyle}>Grade</th><th style={thStyle}>Point</th>
                </tr>
              </thead>
              <tbody>
                {sessionResults.map((r, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{r.courseCode}</td>
                    <td style={tdStyle}>{r.courseTitle}</td>
                    <td style={tdStyle}>{r.creditUnit}</td>
                    <td style={tdStyle}>{r.score}</td>
                    <td style={tdStyle}>{r.grade}</td>
                    <td style={tdStyle}>{r.gradePoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 13, fontWeight: 700, textAlign: "right" }}>Session GPA: {sessionGPA}</p>
          </div>
        );
      })}

      <div style={{ borderTop: "2px solid #0F2C59", paddingTop: 10, marginTop: 10 }}>
        <p style={{ fontSize: 14, fontWeight: 700 }}>Cumulative GPA (CGPA): {Number(student?.cgpa || 0).toFixed(2)}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 60, fontSize: 14 }}>
        <div style={{ borderTop: "1px solid #000", width: 180, textAlign: "center", paddingTop: 4 }}>Registrar's Signature</div>
        <div style={{ borderTop: "1px solid #000", width: 180, textAlign: "center", paddingTop: 4 }}>Date</div>
      </div>

      <p style={{ textAlign: "center", fontSize: 11, color: "#666", marginTop: 40 }}>
        Generated from the Providence International College of Education Student Portal.
      </p>
    </div>
  );
}

const thStyle = { border: "1px solid #000", padding: "5px 7px", background: "#EAF1FB", textAlign: "left" };
const tdStyle = { border: "1px solid #000", padding: "5px 7px" };

function EmptyState({ text }) {
  return <div style={{ textAlign: "center", padding: "40px 0", color: "#adb5bd" }}><i className="bi bi-inbox" style={{ fontSize: 34 }}></i><p style={{ marginTop: 8, fontSize: 14 }}>{text}</p></div>;
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