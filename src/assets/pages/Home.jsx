// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="w-100 min-vh-100 d-flex flex-column m-0 p-0 overflow-x-hidden bg-light">
      
//       {/* 1. ANNOUNCEMENT MARQUEE */}
//       <div 
//         className="w-100 py-2 px-3 fw-semibold shadow-sm text-dark" 
//         style={{ backgroundColor: '#ffc107' }}
//       >
//         <div className="container-fluid px-2 px-md-4 d-flex align-items-center">
//           <span 
//             className="badge me-2 px-2 py-1 flex-shrink-0" 
//             style={{ backgroundColor: '#0a192f', color: '#ffc107' }}
//           >
//             NOTICE
//           </span>
//           <marquee behavior="scroll" direction="left" scrollamount="6" className="mb-0 w-100">
//             🔔 Admission application forms for the 2026/2027 Academic Session (AAUA Sandwich Degree & Direct NCE Programmes) are currently open! | Physical screening holding at the main campus.
//           </marquee>
//         </div>
//       </div>

//       {/* 2. BRANDED HERO SECTION */}
//       <section 
//         className="w-100 position-relative text-white py-5 d-flex align-items-center" 
//         style={{ minHeight: '90vh', background: 'linear-gradient(135deg, #0a192f 0%, #172a45 100%)' }}
//       >
//         <div className="container-fluid px-3 px-sm-4 px-md-5 py-4">
//           <div className="row align-items-center w-100 m-0 g-4">
//             <div className="col-12 col-lg-7 px-2">
//               <span 
//                 className="badge fw-bold px-3 py-2 rounded-pill mb-3" 
//                 style={{ backgroundColor: '#ffc107', color: '#0a192f' }}
//               >
//                 OFFICIAL ACADEMIC PORTAL
//               </span>
//               <h1 className="display-3 fw-extrabold mb-3 lh-sm text-break">
//                 Building Excellence Through Quality Education
//               </h1>
//               <p className="lead text-white-50 mb-4 fs-5 fs-md-4">
//                 Providence International College of Education provides structured, high-caliber higher education tracks integrated seamlessly within one unified academic standard.
//               </p>
              
//               <div className="d-flex gap-3 flex-wrap mb-4">
//                 <button 
//                   onClick={() => navigate('/login')} 
//                   className="btn btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm"
//                   style={{ backgroundColor: '#ffc107', color: '#0a192f', border: 'none' }}
//                 >
//                   Student Portal <i className="bi bi-arrow-right ms-2"></i>
//                 </button>
//                 <button 
//                   onClick={() => navigate('/admission')} 
//                   className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-semibold"
//                 >
//                   Apply For Admission
//                 </button>
//               </div>

//               {/* Quick Metrics */}
//               <div className="row g-3 pt-3 border-top border-secondary text-white-50">
//                 <div className="col-4">
//                   <h4 className="fw-bold mb-0" style={{ color: '#ffc107' }}>100%</h4>
//                   <small>Accredited Courses</small>
//                 </div>
//                 <div className="col-4">
//                   <h4 className="fw-bold mb-0" style={{ color: '#ffc107' }}>2 Tracks</h4>
//                   <small>Degree & NCE</small>
//                 </div>
//                 <div className="col-4">
//                   <h4 className="fw-bold mb-0" style={{ color: '#ffc107' }}>AAUA</h4>
//                   <small>Degree Partner</small>
//                 </div>
//               </div>
//             </div>

//             {/* Branded Quick Access Card */}
//             <div className="col-12 col-lg-5 px-2 mt-4 mt-lg-0">
//               <div className="p-4 p-md-5 bg-white rounded-4 shadow-lg text-start w-100">
//                 <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: '#0a192f' }}>
//                   <i className="bi bi-shield-lock me-2"></i>Academic Tracks Access
//                 </h5>
//                 <div 
//                   className="p-3 bg-light rounded-3 mb-3 border-start border-4" 
//                   style={{ borderColor: '#0a192f' }}
//                 >
//                   <h6 className="fw-bold mb-1" style={{ color: '#0a192f' }}>AAUA Sandwich Degree</h6>
//                   <p className="small text-muted mb-2">
//                     In affiliation with Adekunle Ajasin University of Education.
//                   </p>
//                   <Link 
//                     to="/login" 
//                     className="btn btn-sm text-white rounded-pill"
//                     style={{ backgroundColor: '#0a192f' }}
//                   >
//                     Access Degree Portal
//                   </Link>
//                 </div>
//                 <div 
//                   className="p-3 bg-light rounded-3 border-start border-4" 
//                   style={{ borderColor: '#ffc107' }}
//                 >
//                   <h6 className="fw-bold mb-1" style={{ color: '#0a192f' }}>Direct NCE Programme</h6>
//                   <p className="small text-muted mb-2">
//                     Direct National Certificate in Education Programme.
//                   </p>
//                   <Link 
//                     to="/login" 
//                     className="btn btn-sm rounded-pill fw-semibold"
//                     style={{ backgroundColor: '#ffc107', color: '#0a192f' }}
//                   >
//                     Access NCE Portal
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. ACADEMIC TRACKS OVERVIEW */}
//       <section id="programmes" className="w-100 py-5 bg-white">
//         <div className="container-fluid px-3 px-sm-4 px-md-5 py-4">
//           <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
//             <span 
//               className="badge fw-bold px-3 py-2 rounded-pill mb-2" 
//               style={{ backgroundColor: '#e2e8f0', color: '#0a192f' }}
//             >
//               UNIFIED FRAMEWORK
//             </span>
//             <h2 className="display-5 fw-bold" style={{ color: '#0a192f' }}>Unified Academic Tracks</h2>
//             <p className="text-muted fs-5">Managed centrally under a standardized evaluation framework</p>
//           </div>

//           <div className="row g-4 w-100 m-0">
//             <div className="col-12 col-md-6 px-2">
//               <div 
//                 className="p-4 p-md-5 bg-light rounded-4 shadow-sm h-100 border-top border-4" 
//                 style={{ borderColor: '#0a192f' }}
//               >
//                 <div className="d-flex align-items-center gap-3 mb-3">
//                   <div className="p-3 text-white rounded-3" style={{ backgroundColor: '#0a192f' }}>
//                     <i className="bi bi-journal-bookmark-fill fs-2"></i>
//                   </div>
//                   <div>
//                     <h3 className="fw-bold mb-0" style={{ color: '#0a192f' }}>Degree Programme</h3>
//                     <span className="badge text-white fw-semibold" style={{ backgroundColor: '#172a45' }}>AAUA Affiliated</span>
//                   </div>
//                 </div>
//                 <h5 className="fw-semibold mb-2" style={{ color: '#0a192f' }}>Adekunle Ajasin University Degree Track</h5>
//                 <p className="text-muted fs-6 mb-3">
//                   In affiliation with Providence International College of Education. Structured around <strong>Contact Sessions</strong>, serving 100L–500L Regular and 200L–500L Direct Entry tracks.
//                 </p>
//                 <ul className="list-unstyled text-secondary small mb-4">
//                   <li className="mb-1"><i className="bi bi-check-circle-fill me-2" style={{ color: '#0a192f' }}></i>B.Ed Educational Management</li>
//                   <li className="mb-1"><i className="bi bi-check-circle-fill me-2" style={{ color: '#0a192f' }}></i>B.Sc (Ed) Computer Science</li>
//                   <li className="mb-1"><i className="bi bi-check-circle-fill me-2" style={{ color: '#0a192f' }}></i>B.A (Ed) English Language</li>
//                 </ul>
//                 <Link 
//                   to="/programmes" 
//                   className="btn rounded-pill px-4"
//                   style={{ border: '2px solid #0a192f', color: '#0a192f' }}
//                 >
//                   Explore Degree Courses
//                 </Link>
//               </div>
//             </div>

//             <div className="col-12 col-md-6 px-2">
//               <div 
//                 className="p-4 p-md-5 bg-light rounded-4 shadow-sm h-100 border-top border-4" 
//                 style={{ borderColor: '#ffc107' }}
//               >
//                 <div className="d-flex align-items-center gap-3 mb-3">
//                   <div className="p-3 text-dark rounded-3" style={{ backgroundColor: '#ffc107' }}>
//                     <i className="bi bi-award-fill fs-2"></i>
//                   </div>
//                   <div>
//                     <h3 className="fw-bold mb-0" style={{ color: '#0a192f' }}>NCE Programme</h3>
//                     <span className="badge text-dark fw-semibold" style={{ backgroundColor: '#ffc107' }}>Direct Institutional Track</span>
//                   </div>
//                 </div>
//                 <h5 className="fw-semibold mb-2" style={{ color: '#0a192f' }}>NCE Direct Certificate Track</h5>
//                 <p className="text-muted fs-6 mb-3">
//                   Providence Direct NCE curriculum organized sequentially from NCE I through NCE III with institutional GPA/CGPA computation standards.
//                 </p>
//                 <ul className="list-unstyled text-secondary small mb-4">
//                   <li className="mb-1"><i className="bi bi-check-circle-fill me-2" style={{ color: '#ffc107' }}></i>Primary Education Studies (PES)</li>
//                   <li className="mb-1"><i className="bi bi-check-circle-fill me-2" style={{ color: '#ffc107' }}></i>Early Childhood Care Education (ECCE)</li>
//                   <li className="mb-1"><i className="bi bi-check-circle-fill me-2" style={{ color: '#ffc107' }}></i>Business Education & Sciences</li>
//                 </ul>
//                 <Link 
//                   to="/programmes" 
//                   className="btn text-dark rounded-pill px-4 fw-semibold"
//                   style={{ backgroundColor: '#ffc107' }}
//                 >
//                   Explore NCE Courses
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. ADMISSIONS GUIDE */}
//       <section className="w-100 py-5 text-white" style={{ backgroundColor: '#0a192f' }}>
//         <div className="container-fluid px-3 px-sm-4 px-md-5 py-4">
//           <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
//             <span 
//               className="badge fw-bold px-3 py-2 rounded-pill mb-2" 
//               style={{ backgroundColor: '#ffc107', color: '#0a192f' }}
//             >
//               APPLICATION PROCESS
//             </span>
//             <h2 className="display-5 fw-bold">How To Apply In 4 Steps</h2>
//             <p className="text-white-50 fs-5">Start your academic journey with Providence College</p>
//           </div>

//           <div className="row g-4 w-100 m-0">
//             <div className="col-12 col-sm-6 col-lg-3 px-2">
//               <div 
//                 className="p-4 rounded-4 h-100" 
//                 style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
//               >
//                 <div className="display-4 fw-bold mb-2" style={{ color: '#ffc107' }}>01</div>
//                 <h5 className="fw-bold">Create Account</h5>
//                 <p className="small text-white-50 mb-0">Register on the admission portal using your active email address and phone number.</p>
//               </div>
//             </div>
//             <div className="col-12 col-sm-6 col-lg-3 px-2">
//               <div 
//                 className="p-4 rounded-4 h-100" 
//                 style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
//               >
//                 <div className="display-4 fw-bold mb-2" style={{ color: '#ffc107' }}>02</div>
//                 <h5 className="fw-bold">Select Track</h5>
//                 <p className="small text-white-50 mb-0">Choose between the AAUA Sandwich Degree or the Direct NCE certificate track.</p>
//               </div>
//             </div>
//             <div className="col-12 col-sm-6 col-lg-3 px-2">
//               <div 
//                 className="p-4 rounded-4 h-100" 
//                 style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
//               >
//                 <div className="display-4 fw-bold mb-2" style={{ color: '#ffc107' }}>03</div>
//                 <h5 className="fw-bold">Upload Credentials</h5>
//                 <p className="small text-white-50 mb-0">Attach your O'Level results, birth certificate, and passport photographs.</p>
//               </div>
//             </div>
//             <div className="col-12 col-sm-6 col-lg-3 px-2">
//               <div 
//                 className="p-4 rounded-4 h-100" 
//                 style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
//               >
//                 <div className="display-4 fw-bold mb-2" style={{ color: '#ffc107' }}>04</div>
//                 <h5 className="fw-bold">Submit Application</h5>
//                 <p className="small text-white-50 mb-0">Complete application payment online and print your official screening slip.</p>
//               </div>
//             </div>
//           </div>

//           <div className="text-center mt-5">
//             <button 
//               onClick={() => navigate('/admission')} 
//               className="btn btn-lg rounded-pill px-5 fw-bold"
//               style={{ backgroundColor: '#ffc107', color: '#0a192f', border: 'none' }}
//             >
//               Start Admission Application
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 5. BRANDED FOOTER */}
//       <footer className="w-100 text-white py-5 mt-auto" style={{ backgroundColor: '#071120' }}>
//         <div className="container-fluid px-3 px-sm-4 px-md-5">
//           <div className="row g-4 w-100 m-0 pb-4 border-bottom border-secondary">
//             <div className="col-12 col-md-4 px-2">
//               <h4 className="fw-bold mb-3" style={{ color: '#ffc107' }}>Providence College</h4>
//               <p className="text-white-50 small mb-3">
//                 Providence International College of Education is committed to delivering quality higher education through accredited degree and diploma tracks.
//               </p>
//               <div className="d-flex gap-3">
//                 <a href="#facebook" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
//                 <a href="#twitter" className="text-white fs-5"><i className="bi bi-twitter-x"></i></a>
//                 <a href="#linkedin" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
//               </div>
//             </div>

//             <div className="col-6 col-md-2 px-2">
//               <h6 className="fw-bold text-white mb-3">Quick Links</h6>
//               <ul className="list-unstyled text-white-50 small">
//                 <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
//                 <li className="mb-2"><Link to="/programmes" className="text-white-50 text-decoration-none">Programmes</Link></li>
//                 <li className="mb-2"><Link to="/admissions" className="text-white-50 text-decoration-none">Admissions</Link></li>
//                 <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
//               </ul>
//             </div>

//             <div className="col-6 col-md-2 px-2">
//               <h6 className="fw-bold text-white mb-3">Portals</h6>
//               <ul className="list-unstyled text-white-50 small">
//                 <li className="mb-2"><Link to="/login" className="text-white-50 text-decoration-none">Student Login</Link></li>
//                 <li className="mb-2"><Link to="/login" className="text-white-50 text-decoration-none">Staff Portal</Link></li>
//                 <li className="mb-2"><Link to="/admission" className="text-white-50 text-decoration-none">Application Form</Link></li>
//               </ul>
//             </div>

//             <div className="col-12 col-md-4 px-2">
//               <h6 className="fw-bold text-white mb-3">Contact Information</h6>
//               <p className="text-white-50 small mb-1">
//                 <i className="bi bi-geo-alt-fill me-2" style={{ color: '#ffc107' }}></i>College Main Campus, Oyo State, Nigeria
//               </p>
//               <p className="text-white-50 small mb-1">
//                 <i className="bi bi-envelope-fill me-2" style={{ color: '#ffc107' }}></i>info@providencecollege.edu.ng
//               </p>
//               <p className="text-white-50 small mb-0">
//                 <i className="bi bi-telephone-fill me-2" style={{ color: '#ffc107' }}></i>+234 (0) 800 PICE EDU
//               </p>
//             </div>
//           </div>

//           <div className="text-center pt-4">
//             <p className="small mb-0 text-white-50">
//               &copy; {new Date().getFullYear()} Providence International College of Education. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// }