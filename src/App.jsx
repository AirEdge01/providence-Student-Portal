import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Signup from "./assets/pages/Signup.jsx";
import Login from "./assets/pages/Login.jsx";
import StudentDashboard from "./assets/pages/StudentDashboard.jsx";
import Profile from "./assets/pages/Profile.jsx";
import Courses from "./assets/pages/Courses.jsx";
import Results from "./assets/pages/Results.jsx";
import PostResults from "./assets/pages/PostResults.jsx";
import AcademicHistory from "./assets/pages/AcademicHistory.jsx";
import ChangePassword from "./assets/pages/ChangePassword.jsx";
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";
import { AuthProvider } from "./assets/context/AuthContext.jsx";
import NotEligible from "./assets/pages/NotEligible.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/courses"
                    element={
                        <ProtectedRoute>
                            <Courses />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/results"
                    element={
                        <ProtectedRoute>
                            <Results />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/post-results"
                    element={<PostResults />}
                />

                <Route
                    path="/dashboard/history"
                    element={
                        <ProtectedRoute>
                            <AcademicHistory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/not-eligible"
                    element={<NotEligibleWrapper />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </AuthProvider>
    );
}

function NotEligibleWrapper() {
    const location = useLocation();

    return (
        <NotEligible
            matricNumber={location.state?.matricNumber}
        />
    );
}