import {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils.jsx';
import { FaUser} from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:3000/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
          
       <div className='h-screen w-screen bg-gradient-to-r from-blue-500  to-pink-500 flex items-center justify-center'>  
        <div className='bg-white p-8 md:px-12 rounded-lg w-full max-full max-w-md shadow-lg'>
            <h1 className='text-xl mr-[220px] mb-2 font-bold'>Signup</h1>
            <form className='flex flex-col gap-2' onSubmit={handleSignup}>
                <div className='flex flex-col'>              
                    <label className='text-xl mb-4' htmlFor='name'>Name</label>
                    <i className='flex justify-end mr-3'><FaUser/></i> 
                    <input className=' min-w-90 p-2 mt-8 border-b border-black outline-none absolute placeholder:italic'                    
                        onChange={handleChange}
                        type='text'
                        name='name'
                          autoFocus
                        placeholder="Enter your name..."
                        value={signupInfo.name}               
                    />  
                </div>
                <div className='flex flex-col'>
                    <label className='text-xl mb-4 mt-4' htmlFor='email'>Email</label>
                 <i className='flex justify-end mr-3'><MdEmail/></i>
                    <input className='min-w-90 p-2 mt-12 border-b border-black outline-none absolute placeholder:italic' 
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-xl mb-4 mt-4' htmlFor='password'>Password</label>
                    <i className='flex justify-end mr-3'><RiLockPasswordFill /></i>
                    <input className='min-w-90 p-2 mt-12 border-b border-black outline-none absolute placeholder:italic'
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                <button  className='mt-10 bg-[#667eea] border-none text-xl text-white rounded-md p-2 cursor-pointer my-2' type='submit'>Signup</button>
                <span className='px-16' >Already have an account?
                    <Link to="/login"><u className='italic text-blue-500'> Login</u></Link>
                </span>
            </form>
            <ToastContainer />
        </div>
        </div>
       
    )
}

export default Signup 

