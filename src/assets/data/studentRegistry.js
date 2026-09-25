// // This is the official list of eligible students, normally provided by the school.
// // Only students whose matric number appears here can access the portal.
const studentRegistry = [
  {
    matricNumber: "PICE/2024/0001",
    fullName: "Adebayo Grace Oluwaseun",
    department: "Early Childhood Education",
    faculty: "Faculty of Education",
    courseOfStudy: "Early Childhood Education",
    level: "300L",
    gpa: {
      "100L": 3.85,
      "200L": 3.72,
      "300L": 3.68,
    },
  },
  {
    matricNumber: "PICE/2024/0002",
    fullName: "Chukwu Emeka David",
    department: "Social Studies",
    faculty: "Faculty of Education",
    courseOfStudy: "Social Studies Education",
    level: "200L",
    gpa: {
      "100L": 3.40,
      "200L": 3.55,
    },
  },
  {
    matricNumber: "PICE/2025/0015",
    fullName: "Musa Fatima Zainab",
    department: "English Language",
    faculty: "Faculty of Arts and Social Sciences",
    courseOfStudy: "English Language Education",
    level: "100L",
    gpa: {
      "100L": 3.20,
    },
  },

   {
    matricNumber: "PICE/2025/0016",
    fullName: "Aare Israel Oyewale",
    department: "English Language",
    faculty: "Faculty of Arts and Social Sciences",
    courseOfStudy: "English Language Education",
    level: "200L",
    gpa: {
      "100L": 3.20,
      "200L": 3.45,
    },
  },

  {
    matricNumber: "PICE/2025/0017",
    fullName: " Israel Chief",
    department: "English Language",
    faculty: "Faculty of Arts and Social Sciences",
    courseOfStudy: "English Language Education",
    level: "300L",
    gpa: {
      "100L": 3.20,
      "200L": 3.45,
        "300L": 3.60,
    },
  },

//   {
//     matricNumber: "PICE/2025/0015",
//     fullName: "Musa Fatima Zainab",
//     department: "English Language",
//     faculty: "Faculty of Arts and Social Sciences",
//     courseOfStudy: "English Language Education",
//     level: "100L",
//     gpa: {
//       "100L": 3.20,
//     },
//   },

];

export function findStudentByMatric(matricNumber) {
  return studentRegistry.find(
    (s) => s.matricNumber.toLowerCase() === matricNumber.toLowerCase().trim()
  );
}

export default studentRegistry;




// // This is the official list of eligible students, normally provided by the school.
// // Only students whose matric number appears here can access the portal.
// const studentRegistry = [
//   {
//     matricNumber: "PICE/2024/0001",
//     fullName: "Adebayo Grace Oluwaseun",
//     department: "Early Childhood Education",
//     faculty: "Faculty of Education",
//     courseOfStudy: "Early Childhood Education",
//     courseCombination: "", // single-subject programme — no combination
//     level: "300L",
//     gpa: {
//       "100L": 3.85,
//       "200L": 3.72,
//       "300L": 3.68,
//     },
//   },
//   {
//     matricNumber: "PICE/2024/0002",
//     fullName: "Chukwu Emeka David",
//     department: "Social Studies",
//     faculty: "Faculty of Education",
//     courseOfStudy: "Social Studies Education",
//     courseCombination: "Social Studies / History",
//     level: "200L",
//     gpa: {
//       "100L": 3.40,
//       "200L": 3.55,
//     },
//   },
//   {
//     matricNumber: "PICE/2025/0015",
//     fullName: "Musa Fatima Zainab",
//     department: "English Language",
//     faculty: "Faculty of Arts and Social Sciences",
//     courseOfStudy: "English Language Education",
//     courseCombination: "English / Yoruba",
//     level: "100L",
//     gpa: {
//       "100L": 3.20,
//     },
//   },
//   {
//     matricNumber: "PICE/2025/0016",
//     fullName: "Aare Israel Oyewale",
//     department: "English Language",
//     faculty: "Faculty of Arts and Social Sciences",
//     courseOfStudy: "English Language Education",
//     courseCombination: "English / French",
//     level: "200L",
//     gpa: {
//       "100L": 3.20,
//       "200L": 3.45,
//     },
//   },
//   {
//     matricNumber: "PICE/2025/0017",
//     fullName: " Israel Chief",
//     department: "English Language",
//     faculty: "Faculty of Arts and Social Sciences",
//     courseOfStudy: "English Language Education",
//     courseCombination: "English / Yoruba",
//     level: "300L",
//     gpa: {
//       "100L": 3.20,
//       "200L": 3.45,
//       "300L": 3.60,
//     },
//   },
// ];

// export function findStudentByMatric(matricNumber) {
//   return studentRegistry.find(
//     (s) => s.matricNumber.toLowerCase() === matricNumber.toLowerCase().trim()
//   );
// }

// export default studentRegistry;