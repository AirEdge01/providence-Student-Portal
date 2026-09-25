// import React, { useState } from "react";
// import * as db from "../utils/localDB";

// const navy = "#0F2C59";
// const gold = "#D4AF37";
// const levels = ["100L", "200L", "300L"];

// export default function AdminResults() {
//   const [level, setLevel] = useState("100L");
//   const [session, setSession] = useState("2025/2026");
//   const [, setTick] = useState(0);
//   const refresh = () => setTick((t) => t + 1);

//   const allStudents = db.getAllStudents();
//   const relevant = allStudents.filter((s) =>
//     (s.courses || []).some((c) => c.level === level && c.session === session)
//   );

//   const grouped = {};
//   relevant.forEach((s) => {
//     const faculty = s.faculty || "Unspecified Faculty";
//     const dept = s.department || "Unspecified Department";
//     const combo = s.courseCombination || "General / Single Subject";
//     grouped[faculty] = grouped[faculty] || {};
//     grouped[faculty][dept] = grouped[faculty][dept] || {};
//     grouped[faculty][dept][combo] = grouped[faculty][dept][combo] || [];
//     grouped[faculty][dept][combo].push(s);
//   });

//   return (
//     <div style={{ minHeight: "100vh", background: "#F5F6F8", padding: 24 }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <div style={{ background: navy, color: "#fff", borderRadius: 14, padding: "22px 26px", marginBottom: 20 }}>
//           <h4 style={{ fontWeight: 700, margin: 0 }}>Admin — Publish Student Results</h4>
//           <p style={{ opacity: 0.85, fontSize: 14, margin: "6px 0 0" }}>
//             Providence International College of Education — Result Entry
//           </p>
//         </div>

//         <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
//           {levels.map((lvl, i) => (
//             <button
//               key={lvl}
//               onClick={() => setLevel(lvl)}
//               style={{
//                 background: level === lvl ? navy : "#fff",
//                 color: level === lvl ? "#fff" : navy,
//                 border: `1px solid ${navy}`,
//                 padding: "8px 18px",
//                 borderRadius: 30,
//                 fontWeight: 600,
//                 fontSize: 13.5,
//               }}
//             >
//               Section {i + 1} — {lvl}
//             </button>
//           ))}
//           <div style={{ marginLeft: "auto" }}>
//             <label style={{ fontSize: 13, fontWeight: 600, color: navy, marginRight: 8 }}>Session:</label>
//             <input
//               type="text"
//               value={session}
//               onChange={(e) => setSession(e.target.value)}
//               style={{ borderRadius: 8, border: "1px solid #ddd", padding: "7px 10px", fontSize: 13.5, width: 140 }}
//             />
//           </div>
//         </div>

//         {Object.keys(grouped).length === 0 ? (
//           <div style={{ background: "#fff", borderRadius: 14, padding: 40, textAlign: "center", color: "#adb5bd" }}>
//             <i className="bi bi-inbox" style={{ fontSize: 34 }}></i>
//             <p style={{ marginTop: 8, fontSize: 14 }}>
//               No students have registered {level} courses for {session} yet.
//             </p>
//           </div>
//         ) : (
//           Object.entries(grouped).map(([faculty, depts]) => (
//             <div key={faculty} style={{ marginBottom: 24 }}>
//               <h5 style={{ color: navy, fontWeight: 800, fontSize: 16, marginBottom: 12 }}>{faculty}</h5>
//               {Object.entries(depts).map(([dept, combos]) => (
//                 <div key={dept} style={{ marginBottom: 16, paddingLeft: 10 }}>
//                   <h6 style={{ color: navy, fontWeight: 700, fontSize: 14.5, marginBottom: 10 }}>
//                     Department of {dept}
//                   </h6>
//                   {Object.entries(combos).map(([combo, students]) => (
//                     <div key={combo} style={{ marginBottom: 16, paddingLeft: 14 }}>
//                       <span className="badge" style={{ background: gold, color: navy, marginBottom: 10, display: "inline-block" }}>
//                         {combo}
//                       </span>
//                       {students.map((student) => {
//                         const courses = student.courses.filter((c) => c.level === level && c.session === session);
//                         return (
//                           <div key={student.id} style={{ background: "#fff", borderRadius: 12, padding: 18, marginBottom: 14, boxShadow: "0 4px 14px rgba(15,44,89,0.06)" }}>
//                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
//                               <div>
//                                 <span style={{ fontWeight: 700, color: navy, fontSize: 14.5 }}>{student.fullName}</span>
//                                 <span style={{ color: "#6c757d", fontSize: 13, marginLeft: 8 }}>{student.matricNumber}</span>
//                               </div>
//                               <span className="badge" style={{ background: "#EAF1FB", color: navy }}>
//                                 CGPA: {Number(student.cgpa || 0).toFixed(2)}
//                               </span>
//                             </div>
//                             <div className="table-responsive">
//                               <table className="table align-middle mb-0">
//                                 <thead>
//                                   <tr style={{ fontSize: 12.5, color: navy }}>
//                                     <th>Code</th><th>Title</th><th>Unit</th><th>Semester</th><th>Score</th><th>Grade</th><th></th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {courses.map((c, i) => (
//                                     <CourseScoreRow key={i} student={student} course={c} session={session} onSaved={refresh} />
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// function CourseScoreRow({ student, course, session, onSaved }) {
//   const existing = (student.results || []).find(
//     (r) => r.session === session && r.semester === course.semester && r.courseCode === course.courseCode
//   );
//   const [score, setScore] = useState(existing ? existing.score : "");
//   const [grade, setGrade] = useState(existing ? existing.grade : "");
//   const [saved, setSaved] = useState(!!existing);

//   const handleSave = () => {
//     if (score === "" || !grade) return;
//     db.upsertResult(student.id, {
//       session,
//       semester: course.semester,
//       level: course.level,
//       courseCode: course.courseCode,
//       courseTitle: course.courseTitle,
//       creditUnit: course.creditUnit,
//       score,
//       grade,
//     });
//     setSaved(true);
//     onSaved();
//   };

//   return (
//     <tr style={{ fontSize: 13.5 }}>
//       <td style={{ fontWeight: 600, color: navy }}>{course.courseCode}</td>
//       <td>{course.courseTitle}</td>
//       <td>{course.creditUnit}</td>
//       <td><span className="badge" style={{ background: "#EAF1FB", color: navy }}>{course.semester}</span></td>
//       <td>
//         <input
//           type="number"
//           min="0"
//           max="100"
//           value={score}
//           onChange={(e) => { setScore(e.target.value); setSaved(false); }}
//           style={{ width: 70, borderRadius: 6, border: "1px solid #ddd", padding: "4px 6px" }}
//         />
//       </td>
//       <td>
//         <select
//           value={grade}
//           onChange={(e) => { setGrade(e.target.value); setSaved(false); }}
//           style={{ borderRadius: 6, border: "1px solid #ddd", padding: "4px 6px" }}
//         >
//           <option value="">--</option>
//           {db.GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
//         </select>
//       </td>
//       <td>
//         <button
//           onClick={handleSave}
//           style={{
//             background: saved ? "#1e8e5a" : navy,
//             color: "#fff",
//             border: "none",
//             padding: "5px 12px",
//             borderRadius: 6,
//             fontSize: 12.5,
//             fontWeight: 600,
//           }}
//         >
//           {saved ? "Saved" : "Save"}
//         </button>
//       </td>
//     </tr>
//   );
// }