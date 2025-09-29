/*import React from "react";
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
*/
// src/pages/LandingPage.jsx
import { FaChartBar, FaChartLine, FaChartPie, FaTable, FaChartArea } from 'react-icons/fa';

const features = [
  {
    title: "Bar Charts",
    icon: <FaChartBar className="h-8 w-8 text-indigo-500" />,
    desc: "Visualize category-wise comparisons and spot trends effortlessly."
  },
  {
    title: "Line Charts",
    icon: <FaChartLine className="h-8 w-8 text-blue-500" />,
    desc: "Track changes or progression in your data over time."
  },
  {
    title: "Pie Charts",
    icon: <FaChartPie className="h-8 w-8 text-pink-500" />,
    desc: "Showcase proportions and data distributions at a glance."
  },
  {
    title: "Histograms",
    icon: <FaChartArea className="h-8 w-8 text-green-500" />,
    desc: "Analyze data frequency and outliers with clarity."
  },
  {
    title: "Data Tables",
    icon: <FaTable className="h-8 w-8 text-yellow-500" />,
    desc: "Dive into raw numbers or export for reporting."
  },
];

const steps = [
  {
    title: "Upload Excel File",
    desc: "Drag & drop or browse your Excel (.xlsx) file securely.",
    num: 1,
  },
  {
    title: "Instant Analysis",
    desc: "Our platform reads your data and creates interactive charts in seconds.",
    num: 2,
  },
  {
    title: "Explore & Export",
    desc: "Inspect data tables, customize visuals, and export charts to PNG or PDF.",
    num: 3,
  }
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col text-gray-800 tracking-tight">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl text-indigo-600 tracking-wider">Excel Analytics</span>
          <div className="flex gap-6 text-gray-500">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#workflow" className="hover:text-indigo-600">How it Works</a>
            <a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
          <button
  onClick={() => window.location.href = '/login'}
  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
>
  Get Start
</button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col justify-center items-center text-center py-20 px-4 bg-gradient-to-br from-indigo-100 via-white to-blue-100">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-700 leading-tight">
          Instantly Visualize Your <span className="text-blue-600">Excel Data</span>  
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-gray-600 max-w-2xl">
          Effortlessly upload Excel files and transform them into interactive, beautiful charts & tables—without any coding or complex setup. Fast, secure, and student-friendly.
        </p>
        <a
          href="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md transition mt-2"
        >
          Upload & Analyze Excel
        </a>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <div>{f.icon}</div>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{f.title}</h3>
              <p className="text-gray-500 text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="workflow" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-16">
            {steps.map((step) => (
              <div key={step.num} className="flex-1 flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow">
                    {step.num}
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-tr from-indigo-50 via-white to-blue-50 py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
      Loved by Students & Professionals
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Testimonial 1 */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <p className="text-gray-600 italic">
          "This platform simplified my learning process. The step-by-step explanations and real-world examples helped me gain confidence in coding."
        </p>
        <div className="mt-4">
          <h4 className="font-semibold text-indigo-700">Rohit Kulkarni</h4>
          <span className="text-sm text-gray-500">B.Tech Student, Pune</span>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <p className="text-gray-600 italic">
          "I was preparing for coding interviews, and the resources here made problem-solving much easier. The structured approach really works."
        </p>
        <div className="mt-4">
          <h4 className="font-semibold text-indigo-700">Sneha Patil</h4>
          <span className="text-sm text-gray-500">Final Year Student, Mumbai University</span>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <p className="text-gray-600 italic">
          "The analytics dashboard and interactive projects gave me practical exposure. It’s a must-have learning experience for students and professionals alike."
        </p>
        <div className="mt-4">
          <h4 className="font-semibold text-indigo-700">Aman Singh</h4>
          <span className="text-sm text-gray-500">MERN Enthusiast, Delhi</span>
        </div>
      </div>
      
    </div>
  </div>
</section>


      {/* Footer */}
      <footer id="contact" className="bg-white border-t py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Excel Analytics Platform. All rights reserved.
          </div>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a className="hover:text-indigo-700" href="/privacy">Privacy Policy</a>
            <a className="hover:text-indigo-700" href="/terms">Terms</a>
            <a className="hover:text-indigo-700" href="mailto:support@excelanalytics.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
