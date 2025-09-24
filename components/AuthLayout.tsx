
import React from 'react';
import { Link } from 'react-router-dom';

// FIX: Add types for props to resolve TypeScript errors.
const AuthLayout = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#2d3748]">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 bg-[#f6ad55] text-white p-8 sm:p-12 flex flex-col justify-center items-start">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-lg mb-6">{subtitle}</p>
            <div className="w-16 h-1 bg-white mb-8"></div>
            <Link 
              to="/" 
              className="text-white font-semibold border-2 border-white py-2 px-4 rounded-full hover:bg-white hover:text-[#f6ad55] transition-colors duration-300"
            >
              Back Home
            </Link>
          </div>
          <div className="w-full md:w-3/5 p-8 sm:p-12">
            {children}
          </div>
        </div>
      </div>
      <footer className="text-center py-4 text-gray-400">
        Copyright © Post Calamity Management Portal
      </footer>
    </div>
  );
};

export default AuthLayout;
