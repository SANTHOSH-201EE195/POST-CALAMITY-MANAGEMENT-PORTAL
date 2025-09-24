
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import UserLoginPage from './pages/user/UserLoginPage';
import UserRegisterPage from './pages/user/UserRegisterPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import UserProfilePage from './pages/user/UserProfilePage';
import NeedRegistrationFormPage from './pages/user/NeedRegistrationFormPage';
import ViewApplicationPage from './pages/user/ViewApplicationPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminReportPage from './pages/admin/AdminReportPage';
import UserResetPasswordPage from './pages/user/UserResetPasswordPage';
import AdminResetPasswordPage from './pages/admin/AdminResetPasswordPage';
import AdminSearchPage from './pages/admin/AdminSearchPage';
import AdminManageUsersPage from './pages/admin/AdminManageUsersPage';
import UserDonatePage from './pages/user/UserDonatePage';
import AdminDonationsPage from './pages/admin/AdminDonationsPage';
import TrackDisasterPage from './pages/TrackDisasterPage';

// FIX: Add types for props to resolve TypeScript errors.
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const { user, userRole } = useAuth();
  if (!user || userRole !== role) {
    return <Navigate to={role === 'admin' ? '/admin-login' : '/login'} replace />;
  }
  return <>{children}</>;
};


const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/reset-password" element={<UserResetPasswordPage />} />
          <Route path="/admin-reset-password" element={<AdminResetPasswordPage />} />
          <Route path="/track-disaster" element={<TrackDisasterPage />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute role="user"><UserProfilePage /></ProtectedRoute>} />
          <Route path="/apply" element={<ProtectedRoute role="user"><NeedRegistrationFormPage /></ProtectedRoute>} />
          <Route path="/view-applications" element={<ProtectedRoute role="user"><ViewApplicationPage /></ProtectedRoute>} />
          <Route path="/donate" element={<ProtectedRoute role="user"><UserDonatePage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/applications/:status" element={<ProtectedRoute role="admin"><AdminApplicationsPage /></ProtectedRoute>} />
          <Route path="/admin/report" element={<ProtectedRoute role="admin"><AdminReportPage /></ProtectedRoute>} />
          <Route path="/admin/search" element={<ProtectedRoute role="admin"><AdminSearchPage /></ProtectedRoute>} />
          <Route path="/admin/manage-users" element={<ProtectedRoute role="admin"><AdminManageUsersPage /></ProtectedRoute>} />
          <Route path="/admin/donations" element={<ProtectedRoute role="admin"><AdminDonationsPage /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
