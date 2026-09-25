// import React, { useState } from 'react';
// import axios from 'axios';
// // import * as XLSX from 'xlsx';
// import { Link } from 'react-router-dom';

// export default function MasterBroadsheet() {
//   const [studentId, setStudentId] = useState('');
//   const [broadsheet, setBroadsheet] = useState(null);

//   const fetchBroadsheet = async () => {
//     const token = localStorage.getItem('pice_token');
//     const res = await axios.get(`/api/broadsheet/${studentId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setBroadsheet(res.data);
//   };

//   const exportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(broadsheet.records);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Master Broadsheet");
//     XLSX.writeFile(wb, `Master_Broadsheet_${studentId}.xlsx`);
//   };

//   return (
//     <div className="p-4">
//       <h3 className="fw-bold text-pice-navy mb-3">Master Moderation Broadsheet Compilation</h3>
//       <p className="text-muted small mb-4">
//         Compiles progressive graduation academic records for moderation submission.
//       </p>

//       <div className="row g-2 mb-4">
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Student Matric Number"
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           />
//         </div>
//         <div className="col-md-auto">
//           <button onClick={fetchBroadsheet} className="btn btn-pice-primary">Compile Broadsheet</button>
//         </div>
//       </div>

//       {broadsheet && (
//         <div className="pice-card p-4">
//           <div className="d-flex justify-content-between mb-3">
//             <h5 className="fw-bold">Cumulative Records: {broadsheet.studentName}</h5>
//             <button onClick={exportExcel} className="btn btn-success btn-sm">Export Excel</button>
//           </div>
//           <table className="table table-bordered small">
//             <thead>
//               <tr>
//                 <th>Level/Session</th>
//                 <th>Course</th>
//                 <th>Units</th>
//                 <th>Score</th>
//                 <th>Grade</th>
//               </tr>
//             </thead>
//             <tbody>
//               {broadsheet.records.map((rec, idx) => (
//                 <tr key={idx}>
//                   <td>{rec.sessionLabel}</td>
//                   <td>{rec.courseCode}</td>
//                   <td>{rec.unit}</td>
//                   <td>{rec.score}</td>
//                   <td>{rec.grade}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }