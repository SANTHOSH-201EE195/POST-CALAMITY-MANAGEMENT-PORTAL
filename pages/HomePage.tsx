
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#4A5568] text-white flex flex-col overflow-hidden">
      <div
        className="absolute top-0 right-0 -mr-64 mt-[-20rem] w-[80rem] h-[80rem] opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <nav className="container mx-auto flex justify-end items-center space-x-6">
          <Link to="/admin-login" className="font-semibold text-lg tracking-wider uppercase border-b-2 border-transparent hover:border-white transition-colors duration-300">ADMIN</Link>
          <Link to="/login" className="font-semibold text-lg tracking-wider uppercase border-b-2 border-transparent hover:border-white transition-colors duration-300">USER</Link>
          <Link to="/track-disaster" className="font-semibold text-lg tracking-wider uppercase border-b-2 border-transparent hover:border-white transition-colors duration-300">Track Disaster</Link>
        </nav>
      </header>
      
      <main className="flex-1 flex items-center justify-center z-0">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 animate-fade-in-down">
            POST CALAMITY MANAGEMENT PORTAL
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 animate-fade-in-up">
            Prevention Is Better Than Cure!
          </p>
          <p className="text-sm text-gray-400">
            © Online Post CALAMITY MANAGEMENT PORTAL
          </p>
        </div>
      </main>

       <style>{`
        @keyframes fade-in-down {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out 0.4s forwards;
            opacity: 0;
        }
        `}</style>
    </div>
  );
};

export default HomePage;
