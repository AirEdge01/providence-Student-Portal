    import React, { useState } from "react";
    import DashboardLayout from "../components/DashboardLayout";
    import { useAuth } from "../context/AuthContext";
    import * as db from "../utils/localDB";

    const navy = "#0F2C59";
    const gold = "#D4AF37";

    const thStyle = {
    border: "1px solid #000",
    padding: "6px 8px",
    background: "#EAF1FB",
    textAlign: "left",
    };

    const tdStyle = {
    border: "1px solid #000",
    padding: "6px 8px",
    };

    const cardStyle = {
    background: "#fff",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 4px 14px rgba(15,44,89,0.06)",
    };

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
            <li className="breadcrumb-item" style={{ color: "#6c757d" }}>
            Dashboard
            </li>
            <li
            className="breadcrumb-item active"
            style={{ color: navy, fontWeight: 600 }}
            >
            {current}
            </li>
        </ol>
        </nav>
    );
    }

    function PrintableCourseForm({ student, courses, totalUnits }) {
    return (
        <div style={{ padding: 30, fontFamily: "Arial, sans-serif", color: "#000" }}>
        <div
            style={{
            textAlign: "center",
            borderBottom: "3px solid #0F2C59",
            paddingBottom: 14,
            marginBottom: 20,
            }}
        >
            <h3 style={{ color: "#0F2C59", fontWeight: 800, marginBottom: 2 }}>
            Providence International College of Education
            </h3>
            <p style={{ margin: 0, fontSize: 14 }}>
            Student Course Registration Form
            </p>
        </div>

        <table style={{ width: "100%", marginBottom: 20, fontSize: 14 }}>
            <tbody>
            <tr>
                <td style={{ padding: "4px 0", fontWeight: 700, width: "50%" }}>
                Name:
                </td>
                <td>{student?.fullName}</td>
            </tr>
            <tr>
                <td style={{ padding: "4px 0", fontWeight: 700 }}>
                Matric Number:
                </td>
                <td>{student?.matricNumber}</td>
            </tr>
            <tr>
                <td style={{ padding: "4px 0", fontWeight: 700 }}>
                Course of Study:
                </td>
                <td>{student?.courseOfStudy || student?.department}</td>
            </tr>
            <tr>
                <td style={{ padding: "4px 0", fontWeight: 700 }}>Department:</td>
                <td>{student?.department}</td>
            </tr>
            <tr>
                <td style={{ padding: "4px 0", fontWeight: 700 }}>Level:</td>
                <td>{student?.level}</td>
            </tr>
            <tr>
                <td style={{ padding: "4px 0", fontWeight: 700 }}>Session:</td>
                <td>{student?.currentSession}</td>
            </tr>
            </tbody>
        </table>

        <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
        >
            <thead>
            <tr>
                <th style={thStyle}>S/N</th>
                <th style={thStyle}>Course Code</th>
                <th style={thStyle}>Course Title</th>
                <th style={thStyle}>Credit Unit</th>
                <th style={thStyle}>Semester</th>
            </tr>
            </thead>
            <tbody>
            {courses.map((c, i) => (
                <tr key={i}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{c.courseCode}</td>
                <td style={tdStyle}>{c.courseTitle}</td>
                <td style={tdStyle}>{c.creditUnit}</td>
                <td style={tdStyle}>{c.semester}</td>
                </tr>
            ))}
            <tr>
                <td
                colSpan="3"
                style={{ ...tdStyle, fontWeight: 700, textAlign: "right" }}
                >
                Total Units
                </td>
                <td style={{ ...tdStyle, fontWeight: 700 }}>{totalUnits}</td>
                <td style={tdStyle}></td>
            </tr>
            </tbody>
        </table>

        <div
            style={{
            display: "flex",
            justify: "space-between",
            marginTop: 60,
            fontSize: 14,
            }}
        >
            <div
            style={{
                borderTop: "1px solid #000",
                width: 180,
                textAlign: "center",
                paddingTop: 4,
            }}
            >
            Student's Signature
            </div>
            <div
            style={{
                borderTop: "1px solid #000",
                width: 180,
                textAlign: "center",
                paddingTop: 4,
            }}
            >
            HOD's Signature
            </div>
        </div>

        <p
            style={{
            textAlign: "center",
            fontSize: 11,
            color: "#666",
            marginTop: 40,
            }}
        >
            Generated from the Providence International College of Education Student
            Portal.
        </p>
        </div>
    );
    }

    export default function Courses() {
    const { student, refresh } = useAuth();

    const availableCourses = student
        ? db.getCoursesForCombination(
            student.level,
            student.courseCombination || student.department
        )
        : [];

    const registeredCourses =
        student?.courses?.filter((c) => c.session === student.currentSession) || [];

    const [selected, setSelected] = useState([]);
    const [showForm, setShowForm] = useState(registeredCourses.length > 0);
    const [message, setMessage] = useState({ type: "", text: "" });

    const toggleCourse = (course) => {
        const exists = selected.find((c) => c.courseCode === course.courseCode);
        setSelected(
        exists
            ? selected.filter((c) => c.courseCode !== course.courseCode)
            : [...selected, course]
        );
    };

    const handleRegister = () => {
        if (selected.length === 0) {
        return setMessage({
            type: "danger",
            text: "Please select at least one course.",
        });
        }
        db.registerCourses(student.id, selected, student.currentSession);
        refresh();
        setShowForm(true);
        setMessage({
        type: "success",
        text: "Courses registered successfully!",
        });
    };

    const handlePrint = () => window.print();

    const currentStudent = db.getCurrentStudent();
    const currentRegistered =
        currentStudent?.courses?.filter(
        (c) => c.session === student?.currentSession
        ) || [];
    const totalUnits = currentRegistered.reduce(
        (sum, c) => sum + (c.creditUnit || 0),
        0
    );

    if (!student) return null;

    return (
        <DashboardLayout>
        <div className="no-print-page">
            <Breadcrumb current="My Courses" />
            {message.text && (
            <div
                className={`alert alert-${message.type} py-2`}
                style={{ fontSize: 14 }}
            >
                {message.text}
            </div>
            )}

            {!showForm ? (
            <div style={cardStyle}>
                <h6 style={{ color: navy, fontWeight: 700, marginBottom: 6 }}>
                Register Courses — {student.level} • {student.currentSession}
                </h6>
                <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 20 }}>
                Select the courses offered for your level, then submit to
                register.
                </p>

                {availableCourses.length === 0 ? (
                <EmptyState text="No courses available for your level or department yet." />
                ) : (
                <>
                    <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                        <tr style={{ fontSize: 13.5, color: navy }}>
                            <th></th>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Unit</th>
                            <th>Semester</th>
                        </tr>
                        </thead>
                        <tbody>
                        {availableCourses.map((c) => {
                            const checked = !!selected.find(
                            (s) => s.courseCode === c.courseCode
                            );
                            return (
                            <tr key={c.courseCode} style={{ fontSize: 14 }}>
                                <td>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleCourse(c)}
                                    style={{ width: 18, height: 18 }}
                                />
                                </td>
                                <td style={{ fontWeight: 600, color: navy }}>
                                {c.courseCode}
                                </td>
                                <td>{c.courseTitle}</td>
                                <td>{c.creditUnit}</td>
                                <td>
                                <span
                                    className="badge"
                                    style={{ background: "#EAF1FB", color: navy }}
                                >
                                    {c.semester}
                                </span>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    </div>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 16,
                        flexWrap: "wrap",
                        gap: 10,
                    }}
                    >
                    <span style={{ fontSize: 14, color: "#6c757d" }}>
                        Selected:{" "}
                        <strong style={{ color: navy }}>{selected.length}</strong>{" "}
                        course(s) •{" "}
                        {selected.reduce((s, c) => s + (c.creditUnit || 0), 0)}{" "}
                        unit(s)
                    </span>
                    <button
                        onClick={handleRegister}
                        style={{
                        background: navy,
                        color: "#fff",
                        border: "none",
                        padding: "10px 24px",
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 14.5,
                        }}
                    >
                        Register Courses
                    </button>
                    </div>
                </>
                )}
            </div>
            ) : (
            <div style={cardStyle}>
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                    marginBottom: 18,
                }}
                >
                <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>
                    Registered Courses  {student.level} • {student.currentSession}
                </h6>
                <div style={{ display: "flex", gap: 10 }}>
                    <button
                    onClick={() => setShowForm(false)}
                    style={{
                        background: "#F5F6F8",
                        color: navy,
                        border: "1px solid #ddd",
                        padding: "8px 16px",
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 13.5,
                    }}
                    >
                    Edit Registration
                    </button>
                    <button
                    onClick={handlePrint}
                    style={{
                        background: gold,
                        color: navy,
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 13.5,
                    }}
                    >
                    <i className="bi bi-printer me-1"></i> Print Course Form
                    </button>
                </div>
                </div>
                <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                    <tr style={{ fontSize: 13.5, color: navy }}>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Unit</th>
                        <th>Semester</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRegistered.map((c, i) => (
                        <tr key={i} style={{ fontSize: 14 }}>
                        <td style={{ fontWeight: 600, color: navy }}>
                            {c.courseCode}
                        </td>
                        <td>{c.courseTitle}</td>
                        <td>{c.creditUnit}</td>
                        <td>
                            <span
                            className="badge"
                            style={{ background: "#EAF1FB", color: navy }}
                            >
                            {c.semester}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="2" style={{ fontWeight: 700, color: navy }}>
                        Total Units
                        </td>
                        <td colSpan="2" style={{ fontWeight: 700, color: navy }}>
                        {totalUnits}
                        </td>
                    </tr>
                    </tfoot>
                </table>
                </div>
            </div>
            )}
        </div>

        <div className="print-only">
            <PrintableCourseForm
            student={student}
            courses={currentRegistered}
            totalUnits={totalUnits}
            />
        </div>

        <style>{`
            .print-only { display: none; }
            @media print { 
            .no-print-page { display: none !important; } 
            .print-only { display: block !important; } 
            }
        `}</style>
        </DashboardLayout>
    );
    }


// import React, { useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import { useAuth } from "../context/AuthContext";
// import * as db from "../utils/localDB";

// const navy = "#0F2C59";
// const gold = "#D4AF37";

// export default function Courses() {
//   const { student, refresh } = useAuth();
//   const availableCourses = db.getCoursesForLevel(student.level, student.department);
//   const registeredCourses = student.courses.filter((c) => c.session === student.currentSession);

//   const [selected, setSelected] = useState([]);
//   const [showForm, setShowForm] = useState(registeredCourses.length > 0);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const toggleCourse = (course) => {
//     const exists = selected.find((c) => c.courseCode === course.courseCode);
//     setSelected(exists ? selected.filter((c) => c.courseCode !== course.courseCode) : [...selected, course]);
//   };

//   const handleRegister = () => {
//     if (selected.length === 0) return setMessage({ type: "danger", text: "Please select at least one course." });
//     db.registerCourses(student.id, selected, student.currentSession);
//     refresh();
//     setShowForm(true);
//     setMessage({ type: "success", text: "Courses registered successfully!" });
//   };

//   const handlePrint = () => window.print();

//   const currentRegistered = db.getCurrentStudent().courses.filter((c) => c.session === student.currentSession);
//   const totalUnits = currentRegistered.reduce((sum, c) => sum + c.creditUnit, 0);

//   return (
//     <DashboardLayout>
//       <div className="no-print-page">
//         <Breadcrumb current="My Courses" />
//         {message.text && <div className={`alert alert-${message.type} py-2`} style={{ fontSize: 14 }}>{message.text}</div>}

//         {!showForm ? (
//           <div style={cardStyle}>
//             <h6 style={{ color: navy, fontWeight: 700, marginBottom: 6 }}>
//               Register Courses  {student.department} • {student.level} • {student.currentSession}
//             </h6>
//             <p style={{ color: "#6c757d", fontSize: 14, marginBottom: 20 }}>
//               Select the courses offered for your level and department, then submit to register.
//             </p>

//             {availableCourses.length === 0 ? (
//               <EmptyState text="No courses available for your level yet." />
//             ) : (
//               <>
//                 <div className="table-responsive">
//                   <table className="table align-middle">
//                     <thead><tr style={{ fontSize: 13.5, color: navy }}><th></th><th>Code</th><th>Title</th><th>Unit</th><th>Semester</th></tr></thead>
//                     <tbody>
//                       {availableCourses.map((c) => {
//                         const checked = !!selected.find((s) => s.courseCode === c.courseCode);
//                         return (
//                           <tr key={c.courseCode} style={{ fontSize: 14 }}>
//                             <td><input type="checkbox" checked={checked} onChange={() => toggleCourse(c)} style={{ width: 18, height: 18 }} /></td>
//                             <td style={{ fontWeight: 600, color: navy }}>{c.courseCode}</td>
//                             <td>{c.courseTitle}</td>
//                             <td>{c.creditUnit}</td>
//                             <td><span className="badge" style={{ background: "#EAF1FB", color: navy }}>{c.semester}</span></td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 10 }}>
//                   <span style={{ fontSize: 14, color: "#6c757d" }}>
//                     Selected: <strong style={{ color: navy }}>{selected.length}</strong> course(s) • {selected.reduce((s, c) => s + c.creditUnit, 0)} unit(s)
//                   </span>
//                   <button onClick={handleRegister} style={{ background: navy, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
//                     Register Courses
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <div style={cardStyle}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
//               <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>
//                 Registered Courses  {student.department} • {student.level} • {student.currentSession}
//               </h6>
//               <div style={{ display: "flex", gap: 10 }}>
//                 <button onClick={() => setShowForm(false)} style={{ background: "#F5F6F8", color: navy, border: "1px solid #ddd", padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13.5 }}>
//                   Edit Registration
//                 </button>
//                 <button onClick={handlePrint} style={{ background: gold, color: navy, border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13.5 }}>
//                   <i className="bi bi-printer me-1"></i> Print Semester Course Form
//                 </button>
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table align-middle">
//                 <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Code</th><th>Title</th><th>Unit</th><th>Semester</th></tr></thead>
//                 <tbody>
//                   {currentRegistered.map((c, i) => (
//                     <tr key={i} style={{ fontSize: 14 }}>
//                       <td style={{ fontWeight: 600, color: navy }}>{c.courseCode}</td>
//                       <td>{c.courseTitle}</td>
//                       <td>{c.creditUnit}</td>
//                       <td><span className="badge" style={{ background: "#EAF1FB", color: navy }}>{c.semester}</span></td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot><tr><td colSpan="2" style={{ fontWeight: 700, color: navy }}>Total Units</td><td colSpan="2" style={{ fontWeight: 700, color: navy }}>{totalUnits}</td></tr></tfoot>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="print-only">
//         <PrintableCourseForm student={student} courses={currentRegistered} totalUnits={totalUnits} />
//       </div>

//       <style>{`
//         .print-only { display: none; }
//         @media print { .no-print-page { display: none !important; } .print-only { display: block !important; } }
//       `}</style>
//     </DashboardLayout>
//   );
// }

// function PrintableCourseForm({ student, courses, totalUnits }) {
//   return (
//     <div style={{ padding: 30, fontFamily: "Arial, sans-serif", color: "#000" }}>
//       <div style={{ textAlign: "center", borderBottom: "3px solid #0F2C59", paddingBottom: 14, marginBottom: 20 }}>
//         <h3 style={{ color: "#0F2C59", fontWeight: 800, marginBottom: 2 }}>Providence International College of Education</h3>
//         <p style={{ margin: 0, fontSize: 14 }}>Student Semester Course Registration Form</p>
//       </div>
//       <table style={{ width: "100%", marginBottom: 20, fontSize: 14 }}>
//         <tbody>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700, width: "50%" }}>Name:</td><td>{student?.fullName}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Matric Number:</td><td>{student?.matricNumber}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Faculty:</td><td>{student?.faculty}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Department:</td><td>{student?.department}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Course of Study:</td><td>{student?.courseOfStudy}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Level:</td><td>{student?.level}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Session:</td><td>{student?.currentSession}</td></tr>
//         </tbody>
//       </table>
//       <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
//         <thead><tr><th style={thStyle}>S/N</th><th style={thStyle}>Course Code</th><th style={thStyle}>Course Title</th><th style={thStyle}>Credit Unit</th><th style={thStyle}>Semester</th></tr></thead>
//         <tbody>
//           {courses.map((c, i) => (
//             <tr key={i}>
//               <td style={tdStyle}>{i + 1}</td><td style={tdStyle}>{c.courseCode}</td><td style={tdStyle}>{c.courseTitle}</td><td style={tdStyle}>{c.creditUnit}</td><td style={tdStyle}>{c.semester}</td>
//             </tr>
//           ))}
//           <tr><td colSpan="3" style={{ ...tdStyle, fontWeight: 700, textAlign: "right" }}>Total Units</td><td style={{ ...tdStyle, fontWeight: 700 }}>{totalUnits}</td><td style={tdStyle}></td></tr>
//         </tbody>
//       </table>
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 60, fontSize: 14 }}>
//         <div style={{ borderTop: "1px solid #000", width: 180, textAlign: "center", paddingTop: 4 }}>Student's Signature</div>
//         <div style={{ borderTop: "1px solid #000", width: 180, textAlign: "center", paddingTop: 4 }}>Course Adviser's Signature</div>
//       </div>
//       <p style={{ textAlign: "center", fontSize: 11, color: "#666", marginTop: 40 }}>Generated from the Providence International College of Education Student Portal.</p>
//     </div>
//   );
// }

// const thStyle = { border: "1px solid #000", padding: "6px 8px", background: "#EAF1FB", textAlign: "left" };
// const tdStyle = { border: "1px solid #000", padding: "6px 8px" };

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


// import React, { useState } from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import { useAuth } from "../context/AuthContext";
// import * as db from "../utils/localDB";

// const navy = "#0F2C59";
// const gold = "#D4AF37";

// export default function Courses() {
//   const { student, refresh } = useAuth();
//   const availableCourses = db.getCoursesForCombination(
//     student.level,
//     student.courseCombination || student.department
//   );
//   const registeredCourses = student.courses.filter((c) => c.session === student.currentSession);

//   const [selected, setSelected] = useState([]);
//   const [showForm, setShowForm] = useState(registeredCourses.length > 0);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const toggleCourse = (course) => {
//     const exists = selected.find((c) => c.courseCode === course.courseCode);
//     setSelected(exists ? selected.filter((c) => c.courseCode !== course.courseCode) : [...selected, course]);
//   };

//   const handleRegister = () => {
//     if (selected.length === 0) return setMessage({ type: "danger", text: "Please select at least one course." });
//     db.registerCourses(student.id, selected, student.currentSession);
//     refresh();
//     setShowForm(true);
//     setMessage({ type: "success", text: "Courses registered successfully!" });
//   };

//   const handlePrint = () => window.print();

//   const currentRegistered = db.getCurrentStudent().courses.filter((c) => c.session === student.currentSession);
//   const totalUnits = currentRegistered.reduce((sum, c) => sum + c.creditUnit, 0);

//   return (
//     <DashboardLayout>
//       <div className="no-print-page">
//         <Breadcrumb current="My Courses" />
//         {message.text && <div className={`alert alert-${message.type} py-2`} style={{ fontSize: 14 }}>{message.text}</div>}

//         {!showForm ? (
//           <div style={cardStyle}>
//             <h6 style={{ color: navy, fontWeight: 700, marginBottom: 2 }}>
//               Register Courses — {student.level} • {student.currentSession}
//             </h6>
//             <p style={{ color: "#6c757d", fontSize: 13.5, marginBottom: 20 }}>
//               {student.courseCombination || student.department}
//             </p>

//             {availableCourses.length === 0 ? (
//               <EmptyState text="No courses available for your level yet." />
//             ) : (
//               <>
//                 <div className="table-responsive">
//                   <table className="table align-middle">
//                     <thead><tr style={{ fontSize: 13.5, color: navy }}><th></th><th>Code</th><th>Title</th><th>Unit</th><th>Semester</th></tr></thead>
//                     <tbody>
//                       {availableCourses.map((c, i) => {
//                         const checked = !!selected.find((s) => s.courseCode === c.courseCode);
//                         return (
//                           <tr key={c.courseCode + i} style={{ fontSize: 14 }}>
//                             <td><input type="checkbox" checked={checked} onChange={() => toggleCourse(c)} style={{ width: 18, height: 18 }} /></td>
//                             <td style={{ fontWeight: 600, color: navy }}>{c.courseCode}</td>
//                             <td>{c.courseTitle}</td>
//                             <td>{c.creditUnit}</td>
//                             <td><span className="badge" style={{ background: "#EAF1FB", color: navy }}>{c.semester}</span></td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 10 }}>
//                   <span style={{ fontSize: 14, color: "#6c757d" }}>
//                     Selected: <strong style={{ color: navy }}>{selected.length}</strong> course(s) • {selected.reduce((s, c) => s + c.creditUnit, 0)} unit(s)
//                   </span>
//                   <button onClick={handleRegister} style={{ background: navy, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontWeight: 600, fontSize: 14.5 }}>
//                     Register Courses
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <div style={cardStyle}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
//               <h6 style={{ color: navy, fontWeight: 700, margin: 0 }}>
//                 Registered Courses — {student.level} • {student.currentSession}
//               </h6>
//               <div style={{ display: "flex", gap: 10 }}>
//                 <button onClick={() => setShowForm(false)} style={{ background: "#F5F6F8", color: navy, border: "1px solid #ddd", padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13.5 }}>
//                   Edit Registration
//                 </button>
//                 <button onClick={handlePrint} style={{ background: gold, color: navy, border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13.5 }}>
//                   <i className="bi bi-printer me-1"></i> Print Semester Course Form
//                 </button>
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table align-middle">
//                 <thead><tr style={{ fontSize: 13.5, color: navy }}><th>Code</th><th>Title</th><th>Unit</th><th>Semester</th></tr></thead>
//                 <tbody>
//                   {currentRegistered.map((c, i) => (
//                     <tr key={i} style={{ fontSize: 14 }}>
//                       <td style={{ fontWeight: 600, color: navy }}>{c.courseCode}</td>
//                       <td>{c.courseTitle}</td>
//                       <td>{c.creditUnit}</td>
//                       <td><span className="badge" style={{ background: "#EAF1FB", color: navy }}>{c.semester}</span></td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot><tr><td colSpan="2" style={{ fontWeight: 700, color: navy }}>Total Units</td><td colSpan="2" style={{ fontWeight: 700, color: navy }}>{totalUnits}</td></tr></tfoot>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="print-only">
//         <PrintableCourseForm student={student} courses={currentRegistered} totalUnits={totalUnits} />
//       </div>

//       <style>{`
//         .print-only { display: none; }
//         @media print { .no-print-page { display: none !important; } .print-only { display: block !important; } }
//       `}</style>
//     </DashboardLayout>
//   );
// }

// function PrintableCourseForm({ student, courses, totalUnits }) {
//   return (
//     <div style={{ padding: 30, fontFamily: "Arial, sans-serif", color: "#000" }}>
//       <div style={{ textAlign: "center", borderBottom: "3px solid #0F2C59", paddingBottom: 14, marginBottom: 20 }}>
//         <h3 style={{ color: "#0F2C59", fontWeight: 800, marginBottom: 2 }}>Providence International College of Education</h3>
//         <p style={{ margin: 0, fontSize: 14 }}>Student Semester Course Registration Form</p>
//       </div>
//       <table style={{ width: "100%", marginBottom: 20, fontSize: 14 }}>
//         <tbody>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700, width: "50%" }}>Name:</td><td>{student?.fullName}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Matric Number:</td><td>{student?.matricNumber}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Faculty:</td><td>{student?.faculty}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Department:</td><td>{student?.department}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Course Combination:</td><td>{student?.courseCombination || student?.courseOfStudy}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Level:</td><td>{student?.level}</td></tr>
//           <tr><td style={{ padding: "4px 0", fontWeight: 700 }}>Session:</td><td>{student?.currentSession}</td></tr>
//         </tbody>
//       </table>
//       <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
//         <thead><tr><th style={thStyle}>S/N</th><th style={thStyle}>Course Code</th><th style={thStyle}>Course Title</th><th style={thStyle}>Credit Unit</th><th style={thStyle}>Semester</th></tr></thead>
//         <tbody>
//           {courses.map((c, i) => (
//             <tr key={i}>
//               <td style={tdStyle}>{i + 1}</td><td style={tdStyle}>{c.courseCode}</td><td style={tdStyle}>{c.courseTitle}</td><td style={tdStyle}>{c.creditUnit}</td><td style={tdStyle}>{c.semester}</td>
//             </tr>
//           ))}
//           <tr><td colSpan="3" style={{ ...tdStyle, fontWeight: 700, textAlign: "right" }}>Total Units</td><td style={{ ...tdStyle, fontWeight: 700 }}>{totalUnits}</td><td style={tdStyle}></td></tr>
//         </tbody>
//       </table>
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 60, fontSize: 14 }}>
//         <div style={{ borderTop: "1px solid #000", width: 180, textAlign: "center", paddingTop: 4 }}>Student's Signature</div>
//         <div style={{ borderTop: "1px solid #000", width: 180, textAlign: "center", paddingTop: 4 }}>Course Adviser's Signature</div>
//       </div>
//       <p style={{ textAlign: "center", fontSize: 11, color: "#666", marginTop: 40 }}>Generated from the Providence International College of Education Student Portal.</p>
//     </div>
//   );
// }

// const thStyle = { border: "1px solid #000", padding: "6px 8px", background: "#EAF1FB", textAlign: "left" };
// const tdStyle = { border: "1px solid #000", padding: "6px 8px" };

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