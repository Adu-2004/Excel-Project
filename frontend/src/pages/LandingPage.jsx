import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-emerald-400 to-emerald-100 flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')]" />
      <main className="relative z-10 max-w-2xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl px-10 py-16 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-indigo-800 mb-6 drop-shadow">
          Excel Data Insights
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Instantly turn your spreadsheets into interactive charts and analytics. 
          Upload, analyze, and visualize. Start making your data work for you!
        </p>
        <button
          className="mt-3 inline-block px-10 py-4 bg-emerald-600 text-white font-bold rounded-full shadow-lg text-lg hover:bg-emerald-700 transition"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
        <p className="mt-10 text-gray-400 text-xs">No account? <span className="text-emerald-600 font-semibold">Sign up free!</span></p>
      </main>
      <footer className="absolute bottom-0 w-full text-center p-4 text-indigo-900 bg-white bg-opacity-70 text-sm tracking-wide">
        &copy; {new Date().getFullYear()} Excel Data Insights. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
