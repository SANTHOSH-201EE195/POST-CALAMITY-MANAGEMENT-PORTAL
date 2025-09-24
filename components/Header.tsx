
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MenuIcon, SearchIcon, UserCircleIcon, BellIcon, ChevronDownIcon, DonateIcon } from './icons';

const Header = ({ toggleSidebar, pageTitle }) => {
  const { user, userRole, logout, notifications } = useAuth();
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate(userRole === 'admin' ? '/admin-login' : '/login');
  };
  
  const handleClickOutside = (event) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setUserDropdownOpen(false);
    }
    if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
      setNotificationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userName = userRole === 'admin' ? 'Admin' : `${user?.firstName} ${user?.lastName}`;

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden">
          <MenuIcon />
        </button>
        <div className="relative mx-4 lg:mx-0">
          <h1 className="text-xl font-semibold text-gray-700">{pageTitle}</h1>
        </div>
      </div>

      <div className="flex items-center">
         <div className="relative">
          <input
            className="w-full sm:w-64 md:w-80 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search..."
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
             <SearchIcon className="w-5 h-5"/>
          </button>
        </div>

        {userRole === 'admin' && (
          <div className="relative mx-4" ref={notificationDropdownRef}>
            <button onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)} className="relative text-gray-600 hover:text-gray-800 focus:outline-none">
              <BellIcon />
              {notifications.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 mt-1 -mr-1 bg-red-500 rounded-full"></span>}
            </button>
            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10">
                <div className="py-2 px-4 font-bold text-gray-700 border-b">Notifications ({notifications.length})</div>
                <div className="max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                  <Link key={notif.id} to={notif.link} className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                     {notif.type === 'application' ? (
                        <UserCircleIcon className="h-8 w-8 rounded-full object-cover mx-1 text-gray-400"/>
                     ) : (
                        <DonateIcon className="h-8 w-8 p-1 rounded-full object-cover mx-1 text-purple-500 bg-purple-100" />
                     )}
                    <p className="text-gray-600 text-sm mx-2">
                      {notif.message}
                      <span className="text-xs text-gray-500 block">{new Date(notif.date).toLocaleString()}</span>
                    </p>
                  </Link>
                ))}
                </div>
                <Link to="/admin/applications/all" className="block bg-gray-800 text-white text-center font-bold py-2">See all applications</Link>
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={userDropdownRef}>
          <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center space-x-2 relative ml-3 focus:outline-none">
             <UserCircleIcon className="w-8 h-8 text-gray-600"/>
            <span className="hidden md:inline text-gray-700 font-semibold">{userName}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-600"/>
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
              {userRole === 'user' && <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Edit Profile</Link>}
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
