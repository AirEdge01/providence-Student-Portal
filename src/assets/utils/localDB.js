import studentRegistry, { findStudentByMatric } from "../data/studentRegistry";
import { GENERAL_COURSES, DEPARTMENT_COURSES } from "../data/courseCombinations";

// Storage Keys (Declared at the top to prevent ReferenceError)
const STUDENTS_KEY = "pice_students";
const SESSION_KEY = "pice_session";

// ---- Grading scale ----
export const GRADE_OPTIONS = ["A", "B", "C", "D", "E", "F"];
export const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

// ---- Helpers ----
const getAll = () => JSON.parse(localStorage.getItem(STUDENTS_KEY) || "[]");
const saveAll = (students) => localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));

// ---- Auth ----
export function signup(data) {
  const matricClean = String(data.matricNumber || "").toLowerCase().trim();
  const matches = studentRegistry.filter(
    (s) => String(s.matricNumber || "").toLowerCase().trim() === matricClean
  );
  if (matches.length === 0) {
    const err = new Error("You are not eligible to register. Please visit ICT.");
    err.code = "NOT_ELIGIBLE";
    throw err;
  }
  if (matches.length > 1) {
    const err = new Error("Matric number maps to multiple registry records. Contact ICT.");
    err.code = "INVALID_MATRIC_DUPLICATE";
    throw err;
  }
  const registryMatch = matches[0];

  const students = getAll();
  const exists = students.find((s) => s.email === data.email || s.matricNumber === data.matricNumber);
  if (exists) throw new Error("An account with this email or matric number already exists.");

  const newStudent = {
    id: Date.now().toString(),
    fullName: registryMatch.fullName,
    email: data.email,
    phone: data.phone,
    matricNumber: registryMatch.matricNumber,
    password: data.password,
    department: registryMatch.department,
    faculty: registryMatch.faculty,
    courseOfStudy: registryMatch.courseOfStudy,
    courseCombination: registryMatch.courseCombination || "",
    level: registryMatch.level,
    currentSession: "2025/2026",
    passport: "",
    courses: [],
    results: [],
    gpaByLevel: registryMatch.gpa || {},
    cgpa: registryMatch.gpa?.[registryMatch.level] || 0,
  };

  students.push(newStudent);
  saveAll(students);
  localStorage.setItem(SESSION_KEY, newStudent.id);
  return newStudent;
}

export function login(identifier, password) {
  const students = getAll();
  const student = students.find((s) => s.email === identifier || s.matricNumber === identifier);
  if (!student || student.password !== password) {
    throw new Error("Invalid login credentials.");
  }
  localStorage.setItem(SESSION_KEY, student.id);
  return student;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentStudent() {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  const students = getAll();
  return students.find((s) => s.id === id) || null;
}

export function updateStudent(id, updates) {
  const students = getAll();
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) throw new Error("Student not found.");
  students[index] = { ...students[index], ...updates };
  saveAll(students);
  return students[index];
}

// ---- Admin: read all students ----
export function getAllStudents() {
  return getAll();
}

// ---- Courses ----
export function getCoursesForCombination(level, combinationOrDepartment) {
  const general = [];
  const gLevel = GENERAL_COURSES[level];
  if (gLevel) {
    ["First", "Second"].forEach((sem) => {
      (gLevel[sem] || []).forEach((c) => {
        general.push({
          courseCode: c.code,
          courseTitle: c.title,
          creditUnit: c.unit,
          level,
          semester: sem,
        });
      });
    });
  }

  const subjects = String(combinationOrDepartment || "")
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);

  const subjectCourses = [];
  subjects.forEach((subject) => {
    const dept = DEPARTMENT_COURSES[subject];
    const deptLevel = dept && dept[level];
    if (deptLevel) {
      ["First", "Second"].forEach((sem) => {
        (deptLevel[sem] || []).forEach((c) => {
          subjectCourses.push({
            courseCode: c.code,
            courseTitle: c.title,
            creditUnit: c.unit,
            level,
            semester: sem,
          });
        });
      });
    }
  });

  return [...general, ...subjectCourses];
}

export function registerCourses(studentId, selectedCourses, session) {
  const students = getAll();
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error("Student not found.");

  const remaining = student.courses.filter((c) => c.session !== session);
  const newCourses = selectedCourses.map((c) => ({ ...c, session }));
  student.courses = [...remaining, ...newCourses];

  saveAll(students);
  return student;
}

// ---- Password ----
export function changePassword(studentId, currentPassword, newPassword) {
  const students = getAll();
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error("Student not found.");
  if (student.password !== currentPassword) throw new Error("Current password is incorrect.");
  updateStudent(studentId, { password: newPassword });
}

// ---- Results ----
export function upsertResult(studentId, entry) {
  const students = getAll();
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error("Student not found.");

  const gradePoint = GRADE_POINTS[entry.grade] ?? 0;
  const newResult = {
    session: entry.session,
    semester: entry.semester,
    level: entry.level,
    courseCode: entry.courseCode,
    courseTitle: entry.courseTitle,
    creditUnit: entry.creditUnit,
    score: Number(entry.score) || 0,
    grade: entry.grade,
    gradePoint,
  };

  student.results = student.results || [];
  const idx = student.results.findIndex(
    (r) => r.session === entry.session && r.semester === entry.semester && r.courseCode === entry.courseCode
  );
  if (idx >= 0) student.results[idx] = newResult;
  else student.results.push(newResult);

  const totalPoints = student.results.reduce((s, r) => s + (r.gradePoint || 0) * (r.creditUnit || 0), 0);
  const totalUnits = student.results.reduce((s, r) => s + (r.creditUnit || 0), 0);
  student.cgpa = totalUnits > 0 ? totalPoints / totalUnits : 0;

  const levelsWithResults = [...new Set(student.results.map((r) => r.level))];
  const gpaByLevel = { ...student.gpaByLevel };
  levelsWithResults.forEach((lvl) => {
    const lvlResults = student.results.filter((r) => r.level === lvl);
    const lvlPoints = lvlResults.reduce((s, r) => s + (r.gradePoint || 0) * (r.creditUnit || 0), 0);
    const lvlUnits = lvlResults.reduce((s, r) => s + (r.creditUnit || 0), 0);
    gpaByLevel[lvl] = lvlUnits > 0 ? lvlPoints / lvlUnits : 0;
  });
  student.gpaByLevel = gpaByLevel;

  saveAll(students);
  return student;
}
// .....................

// const STUDENTS_KEY = "pice_students";
// const SESSION_KEY = "pice_session";

// import studentRegistry, { findStudentByMatric } from "../data/studentRegistry";

// // ---- Course catalog ----
// // Add courses here. Leave "department" blank/undefined for courses that apply
// // to every student regardless of department (e.g. GST courses).
// // Otherwise, "department" must exactly match a department string used in
// // studentRegistry.js so the right students see the right courses.
// export const courseCatalog = [
//   // General courses (all departments)
//   { courseCode: "GST 101", courseTitle: "Use of English I", creditUnit: 2, level: "100L", semester: "First" },
//   { courseCode: "GST 102", courseTitle: "Use of English II", creditUnit: 2, level: "100L", semester: "Second" },

//   // Early Childhood Education
//   { courseCode: "ECE 101", courseTitle: "Foundations of Early Childhood Education", creditUnit: 3, level: "100L", semester: "First", department: "Early Childhood Education" },
//   { courseCode: "ECE 102", courseTitle: "Child Growth and Development", creditUnit: 2, level: "100L", semester: "Second", department: "Early Childhood Education" },
//   { courseCode: "ECE 201", courseTitle: "Play and Learning in Early Years", creditUnit: 3, level: "200L", semester: "First", department: "Early Childhood Education" },
//   { courseCode: "ECE 301", courseTitle: "Early Childhood Curriculum Design", creditUnit: 3, level: "300L", semester: "First", department: "Early Childhood Education" },

//   // Social Studies
//   { courseCode: "SOS 101", courseTitle: "Introduction to Social Studies", creditUnit: 3, level: "100L", semester: "First", department: "Social Studies" },
//   { courseCode: "SOS 201", courseTitle: "Social Studies Methods", creditUnit: 2, level: "200L", semester: "First", department: "Social Studies" },

//   // English Language
//   { courseCode: "ENG 101", courseTitle: "Introduction to English Studies", creditUnit: 3, level: "100L", semester: "First", department: "English Language" },
//   { courseCode: "ENG 201", courseTitle: "Introduction to Linguistics", creditUnit: 2, level: "200L", semester: "First", department: "English Language" },
//   { courseCode: "ENG 301", courseTitle: "Syntax", creditUnit: 3, level: "300L", semester: "First", department: "English Language" },
// ];

// // ---- Helpers ----
// const getAll = () => JSON.parse(localStorage.getItem(STUDENTS_KEY) || "[]");
// const saveAll = (students) => localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));

// function calculateGrade(score) {
//   // PLACEHOLDER grading scale — replace with the school's official scale
//   if (score >= 70) return { grade: "A", point: 4.0 };
//   if (score >= 60) return { grade: "B", point: 3.0 };
//   if (score >= 50) return { grade: "C", point: 2.0 };
//   if (score >= 45) return { grade: "D", point: 1.0 };
//   return { grade: "F", point: 0.0 };
// }

// // ---- Auth ----
// export function signup(data) {
//   const matricClean = String(data.matricNumber || "").toLowerCase().trim();
//   const matches = studentRegistry.filter(
//     (s) => String(s.matricNumber || "").toLowerCase().trim() === matricClean
//   );
//   if (matches.length === 0) {
//     const err = new Error("You are not eligible to register. Please visit ICT.");
//     err.code = "NOT_ELIGIBLE";
//     throw err;
//   }
//   if (matches.length > 1) {
//     const err = new Error("Matric number maps to multiple registry records. Contact ICT.");
//     err.code = "INVALID_MATRIC_DUPLICATE";
//     throw err;
//   }
//   const registryMatch = matches[0];

//   const students = getAll();
//   const exists = students.find((s) => s.email === data.email || s.matricNumber === data.matricNumber);
//   if (exists) throw new Error("An account with this email or matric number already exists.");

//   const newStudent = {
//     id: Date.now().toString(),
//     fullName: registryMatch.fullName,
//     email: data.email,
//     phone: data.phone,
//     matricNumber: registryMatch.matricNumber,
//     password: data.password,
//     department: registryMatch.department,
//     faculty: registryMatch.faculty,
//     courseOfStudy: registryMatch.courseOfStudy,
//     level: registryMatch.level,
//     currentSession: "2025/2026",
//     passport: "",
//     courses: [],
//     results: [],
//     gpaByLevel: registryMatch.gpa || {},
//     cgpa: registryMatch.gpa?.[registryMatch.level] || 0,
//   };

//   students.push(newStudent);
//   saveAll(students);
//   localStorage.setItem(SESSION_KEY, newStudent.id);
//   return newStudent;
// }

// export function login(identifier, password) {
//   const students = getAll();
//   const student = students.find((s) => s.email === identifier || s.matricNumber === identifier);
//   if (!student || student.password !== password) {
//     throw new Error("Invalid login credentials.");
//   }
//   localStorage.setItem(SESSION_KEY, student.id);
//   return student;
// }

// export function logout() {
//   localStorage.removeItem(SESSION_KEY);
// }

// export function getCurrentStudent() {
//   const id = localStorage.getItem(SESSION_KEY);
//   if (!id) return null;
//   const students = getAll();
//   return students.find((s) => s.id === id) || null;
// }

// export function updateStudent(id, updates) {
//   const students = getAll();
//   const index = students.findIndex((s) => s.id === id);
//   if (index === -1) throw new Error("Student not found.");
//   students[index] = { ...students[index], ...updates };
//   saveAll(students);
//   return students[index];
// }

// // ---- Courses ----
// export function getCoursesForLevel(level, department) {
//   return courseCatalog.filter(
//     (c) => c.level === level && (!c.department || c.department === department)
//   );
// }

// export function registerCourses(studentId, selectedCourses, session) {
//   const students = getAll();
//   const student = students.find((s) => s.id === studentId);
//   if (!student) throw new Error("Student not found.");

//   const remaining = student.courses.filter((c) => c.session !== session);
//   const newCourses = selectedCourses.map((c) => ({ ...c, session }));
//   student.courses = [...remaining, ...newCourses];

//   saveAll(students);
//   return student;
// }

// // ---- Change password ----
// export function changePassword(studentId, currentPassword, newPassword) {
//   const students = getAll();
//   const student = students.find((s) => s.id === studentId);
//   if (!student) throw new Error("Student not found.");
//   if (student.password !== currentPassword) throw new Error("Current password is incorrect.");
//   updateStudent(studentId, { password: newPassword });
// }

// // ---- Admin: publish results to students ----
// export function publishResults(entries, options = { createMissingFromRegistry: false }) {
//   if (!Array.isArray(entries)) throw new Error("Entries must be an array");
//   const students = getAll();
//   let updatedCount = 0;
//   let createdCount = 0;
//   const errors = [];

//   entries.forEach((e) => {
//     const matric = String(e.matricNumber || "").trim();
//     if (!matric) {
//       errors.push({ entry: e, reason: "Missing matricNumber" });
//       return;
//     }

//     let student = students.find((s) => s.matricNumber === matric);

//     if (!student) {
//       if (options.createMissingFromRegistry) {
//         const reg = findStudentByMatric(matric) || studentRegistry.find((s) => s.matricNumber === matric);
//         if (reg) {
//           student = {
//             id: Date.now().toString() + Math.floor(Math.random() * 1000),
//             fullName: reg.fullName || matric,
//             email: "",
//             phone: "",
//             matricNumber: reg.matricNumber,
//             password: "",
//             department: reg.department || "",
//             faculty: reg.faculty || "",
//             courseOfStudy: reg.courseOfStudy || "",
//             level: reg.level || "100L",
//             currentSession: e.session || "2025/2026",
//             passport: "",
//             courses: [],
//             results: [],
//             gpaByLevel: reg.gpa || {},
//             cgpa: Object.values(reg.gpa || {}).slice(-1)[0] || 0,
//           };
//           students.push(student);
//           createdCount++;
//         } else {
//           errors.push({ entry: e, reason: "No registry match to create student" });
//           return;
//         }
//       } else {
//         errors.push({ entry: e, reason: "Student not found" });
//         return;
//       }
//     }

//     const score = Number(e.score || 0);
//     const { grade, point } = calculateGrade(score);
//     const result = {
//       session: e.session || "Unknown",
//       semester: e.semester || "First",
//       level: e.level || student.level || "100L",
//       courseCode: e.courseCode || "",
//       courseTitle: e.courseTitle || "",
//       creditUnit: Number(e.creditUnit || 0),
//       score,
//       grade,
//       gradePoint: point,
//     };

//     student.results = student.results || [];
//     student.results.push(result);

//     const totalPoints = student.results.reduce((s, r) => s + (r.gradePoint || 0) * (r.creditUnit || 0), 0);
//     const totalUnits = student.results.reduce((s, r) => s + (r.creditUnit || 0), 0);
//     student.cgpa = totalUnits > 0 ? totalPoints / totalUnits : 0;

//     updatedCount++;
//   });

//   saveAll(students);
//   return { updated: updatedCount, created: createdCount, errors };
// }





// const STUDENTS_KEY = "pice_students";
// const SESSION_KEY = "pice_session";

// import studentRegistry, { findStudentByMatric } from "../data/studentRegistry";
// import { GENERAL_COURSES, DEPARTMENT_COURSES } from "../data/courseCombinations";

// // ---- Grading scale (PLACEHOLDER — replace with the school's official scale) ----
// export const GRADE_OPTIONS = ["A", "B", "C", "D", "E", "F"];
// export const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

// // ---- Helpers ----
// const getAll = () => JSON.parse(localStorage.getItem(STUDENTS_KEY) || "[]");
// const saveAll = (students) => localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));

// // ---- Auth ----
// export function signup(data) {
//   const matricClean = String(data.matricNumber || "").toLowerCase().trim();
//   const matches = studentRegistry.filter(
//     (s) => String(s.matricNumber || "").toLowerCase().trim() === matricClean
//   );
//   if (matches.length === 0) {
//     const err = new Error("You are not eligible to register. Please visit ICT.");
//     err.code = "NOT_ELIGIBLE";
//     throw err;
//   }
//   if (matches.length > 1) {
//     const err = new Error("Matric number maps to multiple registry records. Contact ICT.");
//     err.code = "INVALID_MATRIC_DUPLICATE";
//     throw err;
//   }
//   const registryMatch = matches[0];

//   const students = getAll();
//   const exists = students.find((s) => s.email === data.email || s.matricNumber === data.matricNumber);
//   if (exists) throw new Error("An account with this email or matric number already exists.");

//   const newStudent = {
//     id: Date.now().toString(),
//     fullName: registryMatch.fullName,
//     email: data.email,
//     phone: data.phone,
//     matricNumber: registryMatch.matricNumber,
//     password: data.password,
//     department: registryMatch.department,
//     faculty: registryMatch.faculty,
//     courseOfStudy: registryMatch.courseOfStudy,
//     courseCombination: registryMatch.courseCombination || "",
//     level: registryMatch.level,
//     currentSession: "2025/2026",
//     passport: "",
//     courses: [],
//     results: [],
//     gpaByLevel: registryMatch.gpa || {},
//     cgpa: registryMatch.gpa?.[registryMatch.level] || 0,
//   };

//   students.push(newStudent);
//   saveAll(students);
//   localStorage.setItem(SESSION_KEY, newStudent.id);
//   return newStudent;
// }

// export function login(identifier, password) {
//   const students = getAll();
//   const student = students.find((s) => s.email === identifier || s.matricNumber === identifier);
//   if (!student || student.password !== password) {
//     throw new Error("Invalid login credentials.");
//   }
//   localStorage.setItem(SESSION_KEY, student.id);
//   return student;
// }

// export function logout() {
//   localStorage.removeItem(SESSION_KEY);
// }

// export function getCurrentStudent() {
//   const id = localStorage.getItem(SESSION_KEY);
//   if (!id) return null;
//   const students = getAll();
//   return students.find((s) => s.id === id) || null;
// }

// export function updateStudent(id, updates) {
//   const students = getAll();
//   const index = students.findIndex((s) => s.id === id);
//   if (index === -1) throw new Error("Student not found.");
//   students[index] = { ...students[index], ...updates };
//   saveAll(students);
//   return students[index];
// }

// // ---- Admin: read all students ----
// export function getAllStudents() {
//   return getAll();
// }

// // ---- Courses (based on faculty/department/course combination) ----
// export function getCoursesForCombination(level, combinationOrDepartment) {
//   const general = [];
//   const gLevel = GENERAL_COURSES[level];
//   if (gLevel) {
//     ["First", "Second"].forEach((sem) => {
//       (gLevel[sem] || []).forEach((c) => {
//         general.push({
//           courseCode: c.code,
//           courseTitle: c.title,
//           creditUnit: c.unit,
//           level,
//           semester: sem,
//         });
//       });
//     });
//   }

//   const subjects = String(combinationOrDepartment || "")
//     .split("/")
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const subjectCourses = [];
//   subjects.forEach((subject) => {
//     const dept = DEPARTMENT_COURSES[subject];
//     const deptLevel = dept && dept[level];
//     if (deptLevel) {
//       ["First", "Second"].forEach((sem) => {
//         (deptLevel[sem] || []).forEach((c) => {
//           subjectCourses.push({
//             courseCode: c.code,
//             courseTitle: c.title,
//             creditUnit: c.unit,
//             level,
//             semester: sem,
//           });
//         });
//       });
//     }
//   });

//   return [...general, ...subjectCourses];
// }

// export function registerCourses(studentId, selectedCourses, session) {
//   const students = getAll();
//   const student = students.find((s) => s.id === studentId);
//   if (!student) throw new Error("Student not found.");

//   const remaining = student.courses.filter((c) => c.session !== session);
//   const newCourses = selectedCourses.map((c) => ({ ...c, session }));
//   student.courses = [...remaining, ...newCourses];

//   saveAll(students);
//   return student;
// }

// import studentRegistry, { findStudentByMatric } from "../data/studentRegistry";
// import { GENERAL_COURSES, DEPARTMENT_COURSES } from "../data/courseCombinations";

// const STUDENTS_KEY = "pice_students";
// const SESSION_KEY = "pice_session";

// // ---- Grading scale ----
// export const GRADE_OPTIONS = ["A", "B", "C", "D", "E", "F"];
// export const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

// // ---- Helpers ----
// const getAll = () => JSON.parse(localStorage.getItem(STUDENTS_KEY) || "[]");
// const saveAll = (students) => localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));

// // ---- Auth ----
// export function signup(data) {
//   const matricClean = String(data.matricNumber || "").toLowerCase().trim();
//   const matches = studentRegistry.filter(
//     (s) => String(s.matricNumber || "").toLowerCase().trim() === matricClean
//   );
//   if (matches.length === 0) {
//     const err = new Error("You are not eligible to register. Please visit ICT.");
//     err.code = "NOT_ELIGIBLE";
//     throw err;
//   }
//   if (matches.length > 1) {
//     const err = new Error("Matric number maps to multiple registry records. Contact ICT.");
//     err.code = "INVALID_MATRIC_DUPLICATE";
//     throw err;
//   }
//   const registryMatch = matches[0];

//   const students = getAll();
//   const exists = students.find((s) => s.email === data.email || s.matricNumber === data.matricNumber);
//   if (exists) throw new Error("An account with this email or matric number already exists.");

//   const newStudent = {
//     id: Date.now().toString(),
//     fullName: registryMatch.fullName,
//     email: data.email,
//     phone: data.phone,
//     matricNumber: registryMatch.matricNumber,
//     password: data.password,
//     department: registryMatch.department,
//     faculty: registryMatch.faculty,
//     courseOfStudy: registryMatch.courseOfStudy,
//     courseCombination: registryMatch.courseCombination || "",
//     level: registryMatch.level,
//     currentSession: "2025/2026",
//     passport: "",
//     courses: [],
//     results: [],
//     gpaByLevel: registryMatch.gpa || {},
//     cgpa: registryMatch.gpa?.[registryMatch.level] || 0,
//   };

//   students.push(newStudent);
//   saveAll(students);
//   localStorage.setItem(SESSION_KEY, newStudent.id);
//   return newStudent;
// }

// export function login(identifier, password) {
//   const students = getAll();
//   const student = students.find((s) => s.email === identifier || s.matricNumber === identifier);
//   if (!student || student.password !== password) {
//     throw new Error("Invalid login credentials.");
//   }
//   localStorage.setItem(SESSION_KEY, student.id);
//   return student;
// }

// export function logout() {
//   localStorage.removeItem(SESSION_KEY);
// }

// export function getCurrentStudent() {
//   const id = localStorage.getItem(SESSION_KEY);
//   if (!id) return null;
//   const students = getAll();
//   return students.find((s) => s.id === id) || null;
// }

// export function updateStudent(id, updates) {
//   const students = getAll();
//   const index = students.findIndex((s) => s.id === id);
//   if (index === -1) throw new Error("Student not found.");
//   students[index] = { ...students[index], ...updates };
//   saveAll(students);
//   return students[index];
// }

// // ---- Admin: read all students ----
// export function getAllStudents() {
//   return getAll();
// }

// // ---- Courses (based on faculty/department/course combination) ----
// export function getCoursesForCombination(level, combinationOrDepartment) {
//   const general = [];
//   const gLevel = GENERAL_COURSES[level];
//   if (gLevel) {
//     ["First", "Second"].forEach((sem) => {
//       (gLevel[sem] || []).forEach((c) => {
//         general.push({
//           courseCode: c.code,
//           courseTitle: c.title,
//           creditUnit: c.unit,
//           level,
//           semester: sem,
//         });
//       });
//     });
//   }

//   const subjects = String(combinationOrDepartment || "")
//     .split("/")
//     .map((s) => s.trim())
//     .filter(Boolean);

//   const subjectCourses = [];
//   subjects.forEach((subject) => {
//     const dept = DEPARTMENT_COURSES[subject];
//     const deptLevel = dept && dept[level];
//     if (deptLevel) {
//       ["First", "Second"].forEach((sem) => {
//         (deptLevel[sem] || []).forEach((c) => {
//           subjectCourses.push({
//             courseCode: c.code,
//             courseTitle: c.title,
//             creditUnit: c.unit,
//             level,
//             semester: sem,
//           });
//         });
//       });
//     }
//   });

//   return [...general, ...subjectCourses];
// }

// export function registerCourses(studentId, selectedCourses, session) {
//   const students = getAll();
//   const student = students.find((s) => s.id === studentId);
//   if (!student) throw new Error("Student not found.");

//   const remaining = student.courses.filter((c) => c.session !== session);
//   const newCourses = selectedCourses.map((c) => ({ ...c, session }));
//   student.courses = [...remaining, ...newCourses];

//   saveAll(students);
//   return student;
// }

// // ---- Change password ----
// export function changePassword(studentId, currentPassword, newPassword) {
//   const students = getAll();
//   const student = students.find((s) => s.id === studentId);
//   if (!student) throw new Error("Student not found.");
//   if (student.password !== currentPassword) throw new Error("Current password is incorrect.");
//   updateStudent(studentId, { password: newPassword });
// }

// // ---- Admin: publish/update a single result ----
// export function upsertResult(studentId, entry) {
//   const students = getAll();
//   const student = students.find((s) => s.id === studentId);
//   if (!student) throw new Error("Student not found.");

//   const gradePoint = GRADE_POINTS[entry.grade] ?? 0;
//   const newResult = {
//     session: entry.session,
//     semester: entry.semester,
//     level: entry.level,
//     courseCode: entry.courseCode,
//     courseTitle: entry.courseTitle,
//     creditUnit: entry.creditUnit,
//     score: Number(entry.score) || 0,
//     grade: entry.grade,
//     gradePoint,
//   };

//   student.results = student.results || [];
//   const idx = student.results.findIndex(
//     (r) => r.session === entry.session && r.semester === entry.semester && r.courseCode === entry.courseCode
//   );
//   if (idx >= 0) student.results[idx] = newResult;
//   else student.results.push(newResult);

//   // Recompute overall CGPA from all real results
//   const totalPoints = student.results.reduce((s, r) => s + (r.gradePoint || 0) * (r.creditUnit || 0), 0);
//   const totalUnits = student.results.reduce((s, r) => s + (r.creditUnit || 0), 0);
//   student.cgpa = totalUnits > 0 ? totalPoints / totalUnits : 0;

//   // Recompute GPA per level from real results
//   const levelsWithResults = [...new Set(student.results.map((r) => r.level))];
//   const gpaByLevel = { ...student.gpaByLevel };
//   levelsWithResults.forEach((lvl) => {
//     const lvlResults = student.results.filter((r) => r.level === lvl);
//     const lvlPoints = lvlResults.reduce((s, r) => s + (r.gradePoint || 0) * (r.creditUnit || 0), 0);
//     const lvlUnits = lvlResults.reduce((s, r) => s + (r.creditUnit || 0), 0);
//     gpaByLevel[lvl] = lvlUnits > 0 ? lvlPoints / lvlUnits : 0;
//   });
//   student.gpaByLevel = gpaByLevel;

//   saveAll(students);
//   return student;
// }