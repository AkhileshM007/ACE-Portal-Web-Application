// JavaScript
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import MemberDashboard from "./pages/MemberDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AccountPage from "./pages/AccountPage";
import EventsPage from "./pages/EventsPage";
import NewsLetters from "./components/NewsLetter";
import ManageMembers from "./components/ManageMembers";
import ManageEvents from "./components/ManageEvents";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              <Route path="/admin/*" element={
                <ProtectedRoute role="admin">
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="members" element={<ManageMembers />} />
                    <Route path="events" element={<ManageEvents />} />
                  </Routes>
                </ProtectedRoute>
              } />

              <Route path="/member/*" element={
                <ProtectedRoute role="member">
                  <Routes>
                    <Route path="dashboard" element={<MemberDashboard />} />
                    <Route path="account" element={<AccountPage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="newsletters" element={<NewsLetters />} />
                  </Routes>
                </ProtectedRoute>
              } />

              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;