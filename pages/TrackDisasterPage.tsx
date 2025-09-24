
import React from 'react';
import { Link } from 'react-router-dom';

const HomeIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
);

const UnderConstructionIcon = ({ className = 'w-16 h-16' }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 95,90 5,90" className="text-[#f6ad55]" fill="currentColor"/>
      <rect x="45" y="40" width="10" height="25" fill="black" />
      <circle cx="50" cy="75" r="5" fill="black" />
    </svg>
);


const TrackDisasterPage = () => {
    return (
        <div className="min-h-screen bg-[#2d3748] text-white p-4 sm:p-8 flex flex-col">
            <div className="max-w-7xl mx-auto w-full">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f6ad55]">
                        Disaster Tracking
                    </h1>
                    <Link to="/" className="flex items-center space-x-2 bg-[#E2A051] hover:bg-[#ca9045] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                        <HomeIcon className="w-5 h-5"/>
                        <span>Back Home</span>
                    </Link>
                </header>
            </div>
            <main className="flex-grow flex items-center justify-center">
                 <div className="text-center max-w-3xl px-4">
                    <UnderConstructionIcon className="mx-auto h-28 w-28" />
                    <h2 className="mt-8 text-4xl font-extrabold tracking-wider uppercase text-[#f6ad55] sm:text-5xl">
                        Under Construction
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        This feature is currently under development to bring you accurate, real-time disaster tracking and alerts.
                    </p>
                    <p className="mt-2 text-md leading-8 text-gray-400">
                        Our team is working hard to implement this functionality. Please check back soon for updates.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TrackDisasterPage;
