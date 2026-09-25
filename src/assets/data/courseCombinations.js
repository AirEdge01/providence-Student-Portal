// General courses every student takes regardless of department (EDU + GSE series).
// Extracted from the syllabus — same block repeats under every department.
export const GENERAL_COURSES = {
  "100L": {
    First: [
      { code: "EDU111", title: "Hist ory of Education", unit: 1 },
      { code: "EDU112", title: "Developmental Psychology (Including Adolescent)", unit: 2 },
      { code: "EDU113", title: "Principles and Methods of Teaching in Junior Secondary Schools", unit: 2 },
      { code: "GSE111", title: "General English I", unit: 1 },
      { code: "GSE112", title: "Introduction to Library Studies", unit: 1 },
      { code: "GSE113", title: "Basic General Mathematics", unit: 1 },
    ],
    Second: [
      { code: "EDU121", title: "Sociology of Education for Junior Secondary Schools", unit: 1 },
      { code: "EDU122", title: "Introduction to Teacher Education for Junior Secondary School", unit: 1 },
      { code: "EDU123", title: "Educational Psychology (Human Learning)", unit: 2 },
      { code: "GSE121", title: "General English II", unit: 1 },
      { code: "GSE122", title: "Basic General Mathematics II", unit: 1 },
      { code: "GSE123", title: "Introduction to Computer Studies I", unit: 1 },
      { code: "GSE124", title: "Family Life and Emerging Health Issues", unit: 1 },
    ],
  },
  "200L": {
    First: [
      { code: "EDU211", title: "Philosophy of Education", unit: 1 },
      { code: "EDU212", title: "Classroom Management and Organization", unit: 1 },
      { code: "EDU213", title: "Educational Technology: Theory and Practice", unit: 2 },
      { code: "EDU214", title: "Micro Teaching: Theory", unit: 1 },
      { code: "GSE211", title: "General English III", unit: 1 },
      { code: "GSE213", title: "Introduction to Computer Studies II", unit: 1 },
      { code: "GSE214", title: "Trafficking in Persons Issues", unit: 1 },
    ],
    Second: [
      { code: "EDU221", title: "Education for Special Target Group", unit: 1 },
      { code: "EDU222", title: "Curriculum Studies", unit: 1 },
      { code: "EDU223", title: "Measurement and Evaluation", unit: 2 },
      { code: "EDU224", title: "Micro Teaching Practicum (Including Observation)", unit: 2 },
      { code: "GSE221", title: "General English IV", unit: 1 },
      { code: "GSE222", title: "Basic General Mathematics IV", unit: 1 },
      { code: "GSE223", title: "Citizenship Education", unit: 1 },
      { code: "GSE224", title: "Entrepreneurship", unit: 1 },
    ],
  },
  "300L": {
    First: [{ code: "EDU311", title: "Teaching Practice", unit: 6 }],
    Second: [
      { code: "EDU321", title: "Research Methods and Project", unit: 2 },
      { code: "EDU322", title: "Educational Administration, Planning & Supervision", unit: 2 },
      { code: "EDU323", title: "Introduction to Theory and Practice of Guidance and Counselling", unit: 1 },
      { code: "GSE321", title: "General English V", unit: 1 },
      { code: "GSE322", title: "Basic General Mathematics V", unit: 1 },
    ],
  },
};

// Department-specific (major/minor subject) courses.
// Add more departments below following this exact same shape.
export const DEPARTMENT_COURSES = {
  English: {
    "100L": {
      First: [
        { code: "ENG111", title: "Practical Listening Skills", unit: 1 },
        { code: "ENG112", title: "Introduction to Phonetics and Phonology", unit: 2 },
        { code: "ENG113", title: "Basic Grammar", unit: 2 },
        { code: "ENG114", title: "Introduction to Literature", unit: 1 },
      ],
      Second: [
        { code: "ENG121", title: "Basic Reading Skills and Comprehension", unit: 2 },
        { code: "ENG122", title: "English Language and Literature Methods", unit: 2 },
        { code: "ENG123", title: "Modern African Literature / Female Writers in Africa", unit: 2 },
      ],
    },
    "200L": {
      First: [
        { code: "ENG211", title: "The Structure of English", unit: 2 },
        { code: "ENG212", title: "Applied English Linguistics", unit: 2 },
        { code: "ENG213", title: "Selected European Authors", unit: 2 },
        { code: "ENG214", title: "Research Methods", unit: 2 },
      ],
      Second: [
        { code: "ENG221", title: "Composition Writing", unit: 2 },
        { code: "ENG223", title: "Critical Theory and Practical Criticism", unit: 2 },
        { code: "ENG225", title: "Stylistics", unit: 2 },
      ],
    },
    "300L": {
      First: [],
      Second: [
        { code: "ENG322", title: "Varieties of English & Stylistics", unit: 1 },
        { code: "ENG324", title: "Language Testing", unit: 1 },
      ],
    },
  },

  Yoruba: {
    "100L": {
      First: [
        { code: "YOR111", title: "Akoto Yoruba", unit: 2 },
        { code: "YOR112", title: "Ilo Ede Yoruba", unit: 2 },
        { code: "YOR113", title: "Fonetiiki Yoruba", unit: 1 },
        { code: "YOR114", title: "Ifaara si Litireso Yoruba", unit: 1 },
      ],
      Second: [
        { code: "YOR121", title: "Fonoloji Yoruba", unit: 2 },
        { code: "YOR124", title: "Itan Aroso Apileko Yoruba", unit: 2 },
      ],
    },
    "200L": {
      First: [
        { code: "YOR211", title: "Mofoloji Yoruba", unit: 1 },
        { code: "YOR212", title: "Girama Yoruba I", unit: 1 },
        { code: "YOR213", title: "Ere-Onise Apileko Yoruba", unit: 1 },
        { code: "YOR214", title: "Ogbon Ikoni ni Yoruba I", unit: 2 },
      ],
      Second: [
        { code: "YOR222", title: "Ifikora Ise ati Ikowe Alatinuda Yoruba", unit: 2 },
        { code: "YOR224", title: "Ogbon Ikoni ni Yoruba II", unit: 1 },
      ],
    },
    "300L": {
      First: [],
      Second: [
        { code: "YOR322", title: "Agbeyewo Ise-ona Litireso ati Imo Isowolo-ede", unit: 2 },
        { code: "YOR323", title: "Imo Ero ati Sayensi Yoruba", unit: 1 },
      ],
    },
  },

  French: {
    "100L": {
      First: [
        { code: "FRE111", title: "Comprehension Orale I", unit: 1 },
        { code: "FRE112", title: "Comprehension ecrite et grammaire en contexte I", unit: 1 },
        { code: "FRE113", title: "Production/Expression ecrite I", unit: 1 },
        { code: "FRE114", title: "Production/Expression orale I", unit: 1 },
        { code: "FRE115", title: "Pratique de la langue I", unit: 1 },
      ],
      Second: [
        { code: "FRE121", title: "Comprehension Orale II", unit: 1 },
        { code: "FRE122", title: "Comprehension ecrite et grammaire en contexte II", unit: 1 },
        { code: "FRE123", title: "Production/Expression ecrite II", unit: 1 },
        { code: "FRE124", title: "Production/Expression orale II", unit: 1 },
      ],
    },
    "200L": {
      First: [
        { code: "FRE211", title: "Comprehension/Expression Orale I", unit: 1 },
        { code: "FRE212", title: "Grammaire en contexte I", unit: 1 },
        { code: "FRE213", title: "Comprehension/Expression ecrite I", unit: 1 },
        { code: "FRE214", title: "Pratique de l'oral: production, phonologie et prosodie", unit: 1 },
        { code: "FRE215", title: "Methodologie du francais langue etrangere (FLE) I", unit: 1 },
      ],
      Second: [
        { code: "FRE221", title: "Comprehension/Expression Orale II", unit: 1 },
        { code: "FRE222", title: "Grammaire en contexte II", unit: 1 },
        { code: "FRE223", title: "Comprehension/Expression ecrite II", unit: 1 },
      ],
    },
    "300L": { First: [], Second: [] }, // Not provided in the source document yet
  },

  "Social Studies": {
    "100L": {
      First: [
        { code: "SOS111", title: "Foundations of Social Studies", unit: 2 },
        { code: "SOS112", title: "Man and His Social Environment", unit: 2 },
        { code: "SOS113", title: "Man and His Physical Environment", unit: 2 },
      ],
      Second: [
        { code: "SOS121", title: "Introduction to NERDC National Curriculum for Social Studies", unit: 2 },
        { code: "SOS122", title: "Nigeria as a Nation", unit: 2 },
        { code: "SOS124", title: "Man and His Economic Activities", unit: 2 },
      ],
    },
    "200L": {
      First: [{ code: "SOS211", title: "Nigerian Political Life", unit: 2 }],
      Second: [
        { code: "SOS221", title: "Issues and Problems of National Development and Modernization", unit: 2 },
        { code: "SOS222", title: "Citizenship Education", unit: 2 },
        { code: "SOS223", title: "Social Services and Social Change in Nigeria", unit: 2 },
      ],
    },
    "300L": {
      First: [],
      Second: [
        { code: "SOS321", title: "Population and Family Life Education", unit: 2 },
        { code: "SOS323", title: "Social Institutions", unit: 2 },
      ],
    },
  },

  History: {
    "100L": {
      First: [
        { code: "HIS111", title: "Historiography", unit: 2 },
        { code: "HIS112", title: "Nigeria Up to 1800", unit: 2 },
        { code: "HIS113", title: "West Africa Up to 1800", unit: 1 },
      ],
      Second: [
        { code: "HIS121", title: "Local and Regional History", unit: 1 },
        { code: "HIS122", title: "East and Central Africa up to 1800", unit: 1 },
        { code: "HIS123", title: "Major World Civilizations", unit: 1 },
      ],
    },
    "200L": {
      First: [
        { code: "HIS211", title: "Methodology", unit: 2 },
        { code: "HIS212", title: "Research Methods", unit: 1 },
        { code: "HIS213", title: "Field Trips to Historical Sites and Monuments", unit: 1 },
        { code: "HIS214", title: "European Conquest and African Resistance", unit: 1 },
      ],
      Second: [
        { code: "HIS221", title: "Economic History of Nigeria from 1800", unit: 2 },
        { code: "HIS222", title: "Nigeria in the 19th and 20th Centuries", unit: 2 },
        { code: "HIS223", title: "Introduction to Archaeology", unit: 1 },
      ],
    },
    "300L": {
      First: [],
      Second: [
        { code: "HIS321", title: "Africa in the 20th Century", unit: 2 },
        { code: "HIS322", title: "Themes in Southern African History", unit: 2 },
        { code: "HIS323", title: "Trends in World History since 1750", unit: 2 },
      ],
    },
  },

  // Add more departments here (Economics, Geography, Islamic Studies, Political Science,
  // Business Education, Biology, Computer Science, Integrated Science, Mathematics,
  // Physical & Health Education) following the exact structure above.
};