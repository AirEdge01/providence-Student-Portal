// import React from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import { useAuth } from "../context/AuthContext";

// const navy = "#0F2C59";
// const gold = "#D4AF37";

// const levels = ["100L", "200L", "300L"];
// const semesters = ["First", "Second"];

// export default function AcademicHistory() {
//   const { student } = useAuth();
//   const results = student?.results || [];

//   // Group results by level, then by semester within that level
//   const grouped = {};
//   levels.forEach((lvl) => {
//     grouped[lvl] = { First: [], Second: [] };
//   });
//   results.forEach((r) => {
//     if (grouped[r.level] && grouped[r.level][r.semester]) {
//       grouped[r.level][r.semester].push(r);
//     } else if (grouped[r.level]) {
//       grouped[r.level][r.semester] = [r];
//     }
//   });

//   const currentLevelIndex = levels.indexOf(student?.level);

//   return (
//     <DashboardLayout>
//       <Breadcrumb current="Academic History" />

//       {results.length === 0 ? (
//         <div style={cardStyle}>
//           <EmptyState text="No academic history recorded yet." />
//         </div>
//       ) : (
//         levels.map((level, levelIdx) => {
//           const levelData = grouped[level];
//           const hasAnyResults = levelData.First.length > 0 || levelData.Second.length > 0;
//           const reached = levelIdx <= currentLevelIndex;

//           return (
//             <div key={level} style={{ marginBottom: 28 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
//                 <div style={{
//                   width: 36, height: 36, borderRadius: "50%", background: hasAnyResults ? gold : "#e9ecef",
//                   color: hasAnyResults ? navy : "#adb5bd", display: "flex", alignItems: "center", justifyContent: "center",
//                   fontWeight: 700, fontSize: 13,
//                 }}>
//                   {level.replace("L", "")}
//                 </div>
//                 <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>{level}</h6>
//                 {!reached && (
//                   <span className="badge" style={{ background: "#F5F6F8", color: "#6c757d", fontWeight: 500 }}>
//                     Not Yet Reached
//                   </span>
//                 )}
//               </div>

//               <div className="row g-3">
//                 {semesters.map((sem) => {
//                   const semResults = levelData[sem];
//                   const semUnits = semResults.reduce((s, r) => s + r.creditUnit, 0);
//                   const semPoints = semResults.reduce((s, r) => s + (r.gradePoint || 0) * r.creditUnit, 0);
//                   const semGPA = semUnits > 0 ? (semPoints / semUnits).toFixed(2) : null;

//                   return (
//                     <div className="col-lg-6" key={sem}>
//                       <div style={cardStyle}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//                           <span style={{ fontWeight: 700, fontSize: 14, color: navy }}>
//                             {sem} Semester
//                           </span>
//                           {semGPA && (
//                             <span className="badge" style={{ background: "#EAF1FB", color: navy }}>
//                               GPA: {semGPA}
//                             </span>
//                           )}
//                         </div>

//                         {semResults.length === 0 ? (
//                           <div style={{ textAlign: "center", padding: "24px 0", color: "#adb5bd" }}>
//                             <i className="bi bi-inbox" style={{ fontSize: 26 }}></i>
//                             <p style={{ marginTop: 6, fontSize: 13 }}>No results uploaded yet.</p>
//                           </div>
//                         ) : (
//                           <div className="table-responsive">
//                             <table className="table align-middle mb-0">
//                               <thead>
//                                 <tr style={{ fontSize: 12.5, color: navy }}>
//                                   <th>Code</th><th>Title</th><th>Unit</th><th>Score</th><th>Grade</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {semResults.map((r, i) => (
//                                   <tr key={i} style={{ fontSize: 13.5 }}>
//                                     <td style={{ fontWeight: 600, color: navy }}>{r.courseCode}</td>
//                                     <td>{r.courseTitle}</td>
//                                     <td>{r.creditUnit}</td>
//                                     <td>{r.score}</td>
//                                     <td>
//                                       <span className="badge" style={{ background: gold, color: navy }}>
//                                         {r.grade || "-"}
//                                       </span>
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })
//       )}
//     </DashboardLayout>
//   );
// }

// function EmptyState({ text }) {
//   return (
//     <div style={{ textAlign: "center", padding: "40px 0", color: "#adb5bd" }}>
//       <i className="bi bi-inbox" style={{ fontSize: 34 }}></i>
//       <p style={{ marginTop: 8, fontSize: 14 }}>{text}</p>
//     </div>
//   );
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

// const cardStyle = { background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 14px rgba(15,44,89,0.06)", height: "100%" };


import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

const navy = "#0F2C59";
const gold = "#D4AF37";

const allLevels = ["100L", "200L", "300L"];
const semesters = ["First", "Second"];

export default function AcademicHistory() {
  const { student } = useAuth();
  const results = student?.results || [];

  const currentLevelIndex = allLevels.indexOf(student?.level);
  const reachedLevels = currentLevelIndex >= 0 ? allLevels.slice(0, currentLevelIndex + 1) : [];

  const grouped = {};
  reachedLevels.forEach((lvl) => {
    grouped[lvl] = { First: [], Second: [] };
  });
  results.forEach((r) => {
    if (grouped[r.level]) {
      if (!grouped[r.level][r.semester]) grouped[r.level][r.semester] = [];
      grouped[r.level][r.semester].push(r);
    }
  });

  return (
    <DashboardLayout>
      <Breadcrumb current="Academic History" />

      {reachedLevels.length === 0 ? (
        <div style={cardStyle}>
          <EmptyState text="No academic history recorded yet." />
        </div>
      ) : (
        reachedLevels.map((level) => {
          const levelData = grouped[level];
          const hasAnyResults = levelData.First.length > 0 || levelData.Second.length > 0;

          return (
            <div key={level} style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: hasAnyResults ? gold : "#e9ecef",
                  color: hasAnyResults ? navy : "#adb5bd", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 13,
                }}>
                  {level.replace("L", "")}
                </div>
                <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>{level}</h6>
                {student?.gpaByLevel?.[level] !== undefined && (
                  <span className="badge" style={{ background: "#EAF1FB", color: navy }}>
                    Level GPA: {student.gpaByLevel[level].toFixed(2)}
                  </span>
                )}
              </div>

              <div className="row g-3">
                {semesters.map((sem) => {
                  const semResults = levelData[sem] || [];
                  const semUnits = semResults.reduce((s, r) => s + r.creditUnit, 0);
                  const semPoints = semResults.reduce((s, r) => s + (r.gradePoint || 0) * r.creditUnit, 0);
                  const semGPA = semUnits > 0 ? (semPoints / semUnits).toFixed(2) : null;

                  return (
                    <div className="col-lg-6" key={sem}>
                      <div style={cardStyle}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: navy }}>{sem} Semester</span>
                          {semGPA && (
                            <span className="badge" style={{ background: "#EAF1FB", color: navy }}>GPA: {semGPA}</span>
                          )}
                        </div>

                        {semResults.length === 0 ? (
                          <div style={{ textAlign: "center", padding: "24px 0", color: "#adb5bd" }}>
                            <i className="bi bi-inbox" style={{ fontSize: 26 }}></i>
                            <p style={{ marginTop: 6, fontSize: 13 }}>No results uploaded yet.</p>
                          </div>
                        ) : (
                          <div className="table-responsive">
                            <table className="table align-middle mb-0">
                              <thead>
                                <tr style={{ fontSize: 12.5, color: navy }}>
                                  <th>Code</th><th>Title</th><th>Unit</th><th>Score</th><th>Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {semResults.map((r, i) => (
                                  <tr key={i} style={{ fontSize: 13.5 }}>
                                    <td style={{ fontWeight: 600, color: navy }}>{r.courseCode}</td>
                                    <td>{r.courseTitle}</td>
                                    <td>{r.creditUnit}</td>
                                    <td>{r.score}</td>
                                    <td><span className="badge" style={{ background: gold, color: navy }}>{r.grade || "-"}</span></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </DashboardLayout>
  );
}

function EmptyState({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "#adb5bd" }}>
      <i className="bi bi-inbox" style={{ fontSize: 34 }}></i>
      <p style={{ marginTop: 8, fontSize: 14 }}>{text}</p>
    </div>
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

const cardStyle = { background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 4px 14px rgba(15,44,89,0.06)", height: "100%" };