
import React, { createContext, useContext, useReducer } from 'react';
import { MOCK_USERS, MOCK_APPLICATIONS, MOCK_ADMIN } from '../services/mockApiService';

const initialApplicationNotifications = MOCK_APPLICATIONS
    .filter(app => app.status === 'New')
    .slice(0, 5)
    .map(app => ({
        id: `notif-app-${app.id}`,
        type: 'application',
        message: `${app.applicantName} submitted a new application.`,
        date: app.submissionDate,
        link: '/admin/applications/new'
    }));

const initialState = {
  user: null,
  userRole: null,
  isAuthenticated: false,
  users: MOCK_USERS,
  applications: MOCK_APPLICATIONS,
  notifications: initialApplicationNotifications,
  donations: [],
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userRole: action.payload.role,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userRole: null,
      };
    case 'REGISTER_SUCCESS':
      const newUsers = [...state.users, action.payload.user];
      return {
        ...state,
        users: newUsers,
        isAuthenticated: true,
        user: action.payload.user,
        userRole: 'user',
      };
    case 'SUBMIT_APPLICATION_SUCCESS': {
        const newApplications = [...state.applications, action.payload.application];
        const newAppNotification = {
            id: `notif-app-${action.payload.application.id}`,
            type: 'application',
            message: `${action.payload.application.applicantName} submitted a new application.`,
            date: action.payload.application.submissionDate,
            link: '/admin/applications/new'
        };
        const updatedNotifications = [newAppNotification, ...state.notifications].slice(0, 10);
        return {
            ...state,
            applications: newApplications,
            notifications: updatedNotifications
        };
    }
    case 'UPDATE_USER_SUCCESS':
        return {
            ...state,
            user: {...state.user, ...action.payload.user},
            users: state.users.map(u => u.id === action.payload.user.id ? {...u, ...action.payload.user} : u)
        };
    case 'UPDATE_APPLICATION_STATUS': {
        const updatedApplications = state.applications.map(app =>
            app.id === action.payload.appId
                ? { ...app, status: action.payload.status, remark: action.payload.remark || app.remark }
                : app
        );
        const newAppNotifications = updatedApplications
            .filter(app => app.status === 'New')
            .map(app => ({
                id: `notif-app-${app.id}`,
                type: 'application',
                message: `${app.applicantName} submitted a new application.`,
                date: app.submissionDate,
                link: '/admin/applications/new'
            }));
        
        const otherNotifications = state.notifications.filter(n => n.type !== 'application');
        const finalNotifications = [...newAppNotifications, ...otherNotifications].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,10);

        return {
            ...state,
            applications: updatedApplications,
            notifications: finalNotifications,
        };
    }
    case 'UPDATE_USER_STATUS':
        return {
            ...state,
            users: state.users.map(u => u.id === action.payload.userId ? {...u, active: action.payload.active} : u)
        };
    case 'ADD_DONATION_SUCCESS': {
        const newDonationNotification = {
            id: `notif-don-${action.payload.donation.id}`,
            type: 'donation',
            message: `${action.payload.donation.userName} donated ₹${action.payload.donation.amount.toLocaleString()}.`,
            date: action.payload.donation.donationDate,
            link: '/admin/donations'
        };
        const updatedNotifications = [newDonationNotification, ...state.notifications].slice(0, 10);
        return {
            ...state,
            donations: [...state.donations, action.payload.donation],
            notifications: updatedNotifications,
        };
    }
    default:
      return state;
  }
};

const AuthContext = createContext(undefined);

// FIX: Add type for children prop.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (credentials, role) => {
    if (role === 'user') {
      const user = state.users.find(u => u.mobile === credentials.mobile && u.password === credentials.password);
      if (user && user.active) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, role: 'user' } });
        return true;
      }
    } else {
      if (credentials.username === MOCK_ADMIN.username && credentials.password === MOCK_ADMIN.password) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: MOCK_ADMIN, role: 'admin' } });
        return true;
      }
    }
    return false;
  };

  const register = async (userData) => {
    const existingUser = state.users.find(u => u.mobile === userData.mobile);
    if (existingUser) return false;

    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      registrationDate: new Date().toISOString(),
      active: true,
    };
    dispatch({ type: 'REGISTER_SUCCESS', payload: { user: newUser } });
    return true;
  };
  
  const submitApplication = async (appData) => {
    if (!state.user || state.userRole !== 'user') return false;
    const newApp = {
        ...appData,
        id: `app-${Date.now()}`,
        userId: state.user.id,
        submissionDate: new Date().toISOString(),
        status: 'New',
    };
    dispatch({type: 'SUBMIT_APPLICATION_SUCCESS', payload: {application: newApp}});
    return true;
  };

  const updateUser = async (userData) => {
    if (!state.user || state.userRole !== 'user') return false;
    const updatedUser = {...state.user, ...userData};
    dispatch({type: 'UPDATE_USER_SUCCESS', payload: {user: updatedUser}});
    return true;
  }

  const updateApplicationStatus = async (appId, status, remark) => {
    if (!state.user || state.userRole !== 'admin') return false;
    const appExists = state.applications.some(app => app.id === appId);
    if (!appExists) return false;

    dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { appId, status, remark } });
    return true;
  };

  const updateUserStatus = async (userId, active) => {
    if (!state.user || state.userRole !== 'admin') return false;
    const userExists = state.users.some(u => u.id === userId);
    if (!userExists) return false;
    dispatch({ type: 'UPDATE_USER_STATUS', payload: { userId, active } });
    return true;
  };

  const addDonation = async (donationData) => {
    if (!state.user || state.userRole !== 'user') return false;
    const currentUser = state.user;
    const newDonation = {
        id: `don-${Date.now()}`,
        userId: currentUser.id,
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
        amount: donationData.amount,
        message: donationData.message,
        donationDate: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_DONATION_SUCCESS', payload: { donation: newDonation } });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, submitApplication, updateUser, updateApplicationStatus, updateUserStatus, addDonation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
