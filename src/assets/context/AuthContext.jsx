// import React, { createContext, useContext, useState } from "react";
// import * as db from "../utils/localDB";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [student, setStudent] = useState(db.getCurrentStudent());

//   const refresh = () => setStudent(db.getCurrentStudent());

//   const login = (identifier, password) => {
//     const s = db.login(identifier, password);
//     db.seedDemoResults(s.id); // adds sample results so Results/History pages aren't empty
//     setStudent(db.getCurrentStudent());
//     return s;
//   };

//   const signup = (data) => {
//     const s = db.signup(data);
//     setStudent(s);
//     return s;
//   };

//   const logout = () => {
//     db.logout();
//     setStudent(null);
//   };

//   return (
//     <AuthContext.Provider value={{ student, login, signup, logout, refresh }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useContext, useState } from "react";
import * as db from "../utils/localDB";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(db.getCurrentStudent());

  const refresh = () => setStudent(db.getCurrentStudent());

  const login = (identifier, password) => {
    const s = db.login(identifier, password);
    setStudent(db.getCurrentStudent());
    return s;
  };

  const signup = (data) => {
    const s = db.signup(data);
    setStudent(s);
    return s;
  };

  const logout = () => {
    db.logout();
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, login, signup, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);