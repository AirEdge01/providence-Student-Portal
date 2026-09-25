// import React, { useRef } from 'react';

// export default function ResultSheet({ student, session, semester, courses = [] }) {
//   const printRef = useRef();

//   const handlePrint = () => {
//     window.print();
//   };

//   const calculateGrade = (score) => {
//     if (score >= 70) return { grade: 'A', point: 5.0 };
//     if (score >= 60) return { grade: 'B', point: 4.0 };
//     if (score >= 50) return { grade: 'C', point: 3.0 };
//     if (score >= 45) return { grade: 'D', point: 2.0 };
//     if (score >= 40) return { grade: 'E', point: 1.0 };
//     return { grade: 'F', point: 0.0 };
//   };

//   const totalUnits = courses.reduce((acc, c) => acc + (Number(c.creditUnit) || 0), 0);
//   const totalPoints = courses.reduce((acc, c) => {
//     const { point } = calculateGrade(c.score);
//     return acc + point * (Number(c.creditUnit) || 0);
//   }, 0);

//   const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';

//   return (
//     <div>
//       {/* Action Toolbar */}
//       <div className="d-flex justify-content-end mb-3 d-print-none">
//         <button
//           onClick={handlePrint}
//           className="btn text-white fw-semibold"
//           style={{ backgroundColor: '#0F2C59' }}
//         >
//           <i className="bi bi-printer me-2"></i>Download / Print A4 Result
//         </button>
//       </div>

//       {/* A4 Document Area */}
//       <div
//         ref={printRef}
//         className="a4-sheet border bg-white p-5 mx-auto shadow-sm"
//         style={{
//           width: '210mm',
//           minHeight: '297mm',
//           color: '#111',
//           boxSizing: 'border-box',
//           position: 'relative',
//         }}
//       >
//         {/* Header Header/Letterhead */}
//         <div className="text-center border-bottom pb-3 mb-4">
//           <div
//             className="rounded-circle mx-auto d-flex align-items-center justify-content-center text-white fw-bold mb-2"
//             style={{ width: 56, height: 56, backgroundColor: '#D4AF37', fontSize: 20 }}
//           >
//             PICE
//           </div>
//           <h3 className="fw-bold mb-0" style={{ color: '#0F2C59', letterSpacing: 0.5 }}>
//             PROVIDENCE INTERNATIONAL COLLEGE OF EDUCATION
//           </h3>
//           <p className="small text-muted mb-1">
//             OFFICE OF THE REGISTRAR & ACADEMIC PLANNING
//           </p>
//           <h5 className="fw-bold mt-2 text-uppercase text-decoration-underline">
//             Official Statement of Semester Results
//           </h5>
//         </div>

//         {/* Student Metadata Table */}
//         <table className="table table-sm table-borderless mb-4" style={{ fontSize: '13.5px' }}>
//           <tbody>
//             <tr>
//               <td><strong>Full Name:</strong> {student?.fullName || 'N/A'}</td>
//               <td><strong>Matric No:</strong> {student?.matricNumber || 'N/A'}</td>
//             </tr>
//             <tr>
//               <td><strong>Programme:</strong> {student?.programme || 'N/A'}</td>
//               <td><strong>Department:</strong> {student?.department || 'N/A'}</td>
//             </tr>
//             <tr>
//               <td><strong>Session:</strong> {session || '2025/2026'}</td>
//               <td><strong>Semester:</strong> {semester || 'First'} Semester</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Results Data Table */}
//         <table className="table table-bordered align-middle mb-4" style={{ fontSize: '13px' }}>
//           <thead style={{ backgroundColor: '#f8f9fa' }}>
//             <tr>
//               <th style={{ width: '5%' }}>S/N</th>
//               <th style={{ width: '15%' }}>Code</th>
//               <th>Course Title</th>
//               <th className="text-center" style={{ width: '10%' }}>Units</th>
//               <th className="text-center" style={{ width: '10%' }}>Score</th>
//               <th className="text-center" style={{ width: '10%' }}>Grade</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.length > 0 ? (
//               courses.map((c, index) => {
//                 const { grade } = calculateGrade(c.score);
//                 return (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td className="fw-bold">{c.courseCode}</td>
//                     <td>{c.courseTitle}</td>
//                     <td className="text-center">{c.creditUnit}</td>
//                     <td className="text-center">{c.score}</td>
//                     <td className="text-center fw-bold">{grade}</td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center text-muted py-3">
//                   No courses found for this semester.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Academic Performance Summary */}
//         <div className="p-3 border rounded mb-5" style={{ backgroundColor: '#fcfcfc' }}>
//           <div className="row text-center fw-bold" style={{ fontSize: '14px', color: '#0F2C59' }}>
//             <div className="col-4">Total Registered Units: {totalUnits}</div>
//             <div className="col-4">Total Points: {totalPoints.toFixed(1)}</div>
//             <div className="col-4">Semester GPA: {gpa}</div>
//           </div>
//         </div>

//         {/* Signatures Footer */}
//         <div className="position-absolute bottom-0 start-0 end-0 p-5">
//           <div className="row text-center pt-4" style={{ fontSize: '12px' }}>
//             <div className="col-6">
//               <div className="border-bottom mx-auto mb-1" style={{ width: '180px' }}></div>
//               <p className="mb-0 fw-bold">HOD / School Dean</p>
//             </div>
//             <div className="col-6">
//               <div className="border-bottom mx-auto mb-1" style={{ width: '180px' }}></div>
//               <p className="mb-0 fw-bold">Registrar</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Print Specific CSS Rules */}
//       <style>{`
//         @media print {
//           body * {
//             visibility: hidden;
//           }
//           .a4-sheet, .a4-sheet * {
//             visibility: visible;
//           }
//           .a4-sheet {
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 100% !important;
//             margin: 0 !important;
//             box-shadow: none !important;
//             border: none !important;
//             padding: 0 !important;
//           }
//           @page {
//             size: A4 portrait;
//             margin: 15mm;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }