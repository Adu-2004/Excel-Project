import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils.jsx';
import { ToastContainer } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaTable, FaChartPie, FaHistory, FaCog } from "react-icons/fa";




const sidebarItems = [
    { label: "Analytics",  icon: <FaChartPie />, path: "/home" },
  { label: "Data Table", icon: <FaTable />, path: "/data-table" },
  { label: "History",    icon: <FaHistory />,  path: "/history" },
  { label: "Settings",   icon: <FaCog />,      path: "/settings" },
];



function Navbar() {

 
  const [uploads, setUploads] = useState([]);

  // Function to fetch uploads (history)
  const fetchUploads = async () => {
    try {
      const res = await fetch("http://localhost:3000/history/uploads");
      const data = await res.json();
      setUploads(Array.isArray(data) ? data : []);
    } catch (e) {
      setUploads([]); // fallback
    }
  };


  useEffect(() => {
    fetchUploads();
  }, []);

  // Pass as callback to Upload; will be called after every upload
  const handleUploadSuccess = () => {
    fetchUploads();
  };

     const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:3000/auth/users";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            await fetch(url, headers);
           
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

 const [sidebarOpen, setSidebarOpen] = useState(false)
 const [darkMode, setDarkMode] = useState(false)




  return (
      <div className={`${darkMode? "dark" : ""} dark:bg-gray-300`}> 
      <div className={`fixed bg-gray-200 w-64 h-screen shadow ${ sidebarOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0 dark:bg-gray-500`}>
                <div className='p-3 justify-between'>
                
                    <div className='dark:text-white text-xl font-bold flex justify-between'>Dashboard
                         <button className=' dark:text-white lg:hidden' onClick={() => setSidebarOpen(false)}><IoMdClose /></button>
                    </div>
      
                     <nav className="flex-1 py-8 space-y-2 ">
        {sidebarItems.map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={
              "flex items-center w-full gap-4 px-5 py-3 rounded-lg font-medium " +
              "transition-colors duration-150 text-black-100 bg-gray-200 hover:bg-gradient-to-r from-purple-500 to-pink-500" +
              (location.pathname === item.path ? " bg-pink-500 text-white font-semibold shadow-lg" : "")
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
                      
            </div>
        </div> 



        <main className='flex-1'>
            <header className=' flex justify-between bg-gray-200 dark:bg-gray-500'>
                <button className='  mx-2.5 text-2xl dark:text-white' onClick={() => setSidebarOpen(true)}><GiHamburgerMenu /></button> 
                <h1 className='flex items-center font-bold text-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>ExcelAnalyzer</h1>  
                <div className='justify-end dark:text-white '>      
                {darkMode? (<button className='p-2 bg-amber-100 rounded-full' onClick={() => setDarkMode(false)}><MdLightMode /></button>
                ) :( <button className='p-2 bg-amber-100 rounded-full' onClick={() => setDarkMode(true)}><MdDarkMode /></button>)} 
            <button className='h-9 w-20 mt-1.5 mb-1.5 mx-4 text-white rounded-full bg-gradient-to-r from-blue-500  to-pink-500 cursor-pointer' onClick={handleLogout}>Logout</button>
            <ToastContainer />
            </div>
        </header>
        </main>
                <h1 className='text-4xl font-bold flex justify-center mt-5 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent'>Welcome {loggedInUser}</h1>
    </div>
            
  )
}

export default Navbar;
