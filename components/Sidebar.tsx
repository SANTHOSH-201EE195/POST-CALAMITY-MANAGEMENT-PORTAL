
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomeIcon, DashboardIcon, FormIcon, ViewIcon, SearchIcon, ApplicationIcon, ReportIcon, ChevronDownIcon, UserGroupIcon, DonateIcon } from './icons';

const Sidebar = ({ isOpen }) => {
  const { userRole } = useAuth();
  const [appMenuOpen, setAppMenuOpen] = useState(true);
  
  const commonClasses = "flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200";
  const activeClassName = "bg-gray-700 text-white";

  const userLinks = [
    { to: "/dashboard", icon: <DashboardIcon className="w-5 h-5"/>, text: "Dashboard" },
    { to: "/apply", icon: <FormIcon className="w-5 h-5"/>, text: "Registration Form" },
    { to: "/view-applications", icon: <ViewIcon className="w-5 h-5"/>, text: "View Application" },
    { to: "/donate", icon: <DonateIcon className="w-5 h-5"/>, text: "Donate" },
    { to: "#", icon: <SearchIcon className="w-5 h-5"/>, text: "Search" },
  ];
  
  const appSubLinks = [
      { to: "/admin/applications/new", text: "New Application" },
      { to: "/admin/applications/verified", text: "Verified Application" },
      { to: "/admin/applications/rejected", text: "Rejected Application" },
      { to: "/admin/applications/all", text: "All Application" },
  ];

  return (
    <aside className={`flex-shrink-0 ${isOpen ? 'w-64' : 'w-0'} lg:w-64 bg-[#2d3748] flex flex-col transition-width duration-300 overflow-hidden`}>
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <Link to="/">
            <h1 className="text-white text-2xl font-bold whitespace-nowrap">PCM Portal</h1>
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavLink to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} className={({isActive}) => `${commonClasses} ${isActive ? activeClassName : ''}`}>
            <HomeIcon className="w-5 h-5" />
            <span className="mx-4 font-medium">Home</span>
        </NavLink>

        {userRole === 'user' && userLinks.map(link => (
             <NavLink key={link.to} to={link.to} className={({isActive}) => `${commonClasses} ${isActive && link.to !== '#' ? activeClassName : ''}`}>
                {link.icon}
                <span className="mx-4 font-medium">{link.text}</span>
            </NavLink>
        ))}

        {userRole === 'admin' && (
            <>
                <NavLink to="/admin/dashboard" className={({isActive}) => `${commonClasses} ${isActive ? activeClassName : ''}`}>
                    <DashboardIcon className="w-5 h-5"/>
                    <span className="mx-4 font-medium">Dashboard</span>
                </NavLink>
                <div>
                    <button onClick={() => setAppMenuOpen(!appMenuOpen)} className={`${commonClasses} w-full justify-between`}>
                        <div className="flex items-center">
                            <ApplicationIcon className="w-5 h-5"/>
                            <span className="mx-4 font-medium">Application</span>
                        </div>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${appMenuOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    {appMenuOpen && (
                        <div className="ml-8 mt-2 space-y-2">
                            {appSubLinks.map(link => (
                                <NavLink key={link.to} to={link.to} className={({isActive}) => `block px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-700 hover:text-white ${isActive ? 'text-orange-400 font-semibold' : ''}`}>{link.text}</NavLink>
                            ))}
                        </div>
                    )}
                </div>
                <NavLink to="/admin/manage-users" className={({isActive}) => `${commonClasses} ${isActive ? activeClassName : ''}`}>
                    <UserGroupIcon className="w-5 h-5"/>
                    <span className="mx-4 font-medium">Manage Users</span>
                </NavLink>
                <NavLink to="/admin/donations" className={({isActive}) => `${commonClasses} ${isActive ? activeClassName : ''}`}>
                    <DonateIcon className="w-5 h-5"/>
                    <span className="mx-4 font-medium">Donations</span>
                </NavLink>
                <NavLink to="/admin/report" className={({isActive}) => `${commonClasses} ${isActive ? activeClassName : ''}`}>
                    <ReportIcon className="w-5 h-5"/>
                    <span className="mx-4 font-medium">Report</span>
                </NavLink>
                <NavLink to="/admin/search" className={({isActive}) => `${commonClasses} ${isActive ? activeClassName : ''}`}>
                    <SearchIcon className="w-5 h-5"/>
                    <span className="mx-4 font-medium">Search</span>
                </NavLink>
            </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
