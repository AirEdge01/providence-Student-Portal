import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshStudent = async () => {
    try {
      const res = await api.get("/students/profile");
      setStudent(res.data.student);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshStudent();
  }, []);

  return (
    <StudentContext.Provider value={{ student, setStudent, loading, refreshStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => useContext(StudentContext);