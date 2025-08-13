/*import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils.jsx';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:3000/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
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
        <div className='h-screen w-screen  bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center'>
       <div className='bg-white p-8 md:px-12 rounded-lg w-full max-full max-w-md'>
            <h1 className='text-xl mr-[220px] mb-2 font-bold'>Login</h1>
            <form className='flex flex-col gap-2' onSubmit={handleLogin}>
                <div className='flex flex-col'>
                    <label className='text-xl mb-4 mt-4' htmlFor='email'>Email</label>
                     <i className='flex justify-end mr-3'><MdEmail/></i>
                    <input className='w-90 p-2 mt-12 border-b border-black outline-none absolute placeholder:italic' 
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-left text-xl mb-4 mt-4' htmlFor='password'>Password</label>
                 <i className='flex justify-end mr-3'><RiLockPasswordFill /></i>
                    <input className='w-90 p-2 mt-12 border-b border-black outline-none absolute placeholder:italic'
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button className='mt-10 bg-[#667eea] border-none text-xl text-white rounded-md p-2 cursor-pointer my-2' type='submit'>Login</button>
                <span className='px-16' >Does't have an account?
                    <Link to="/signup"><u className='italic text-blue-500'> Signup</u></Link>
                </span>
            </form>
            <ToastContainer />
        </div>
       </div>
    )
}

export default Login */
///////////////////////////////////
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils.jsx';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    role: 'user' // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, role } = loginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      // Role-based API Endpoint
      const url =
        role === 'admin'
          ? `http://localhost:3000/api/admin/login`
          : `http://localhost:3000/auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      console.log("Login Response:", result);

      // Destructure and handle based on your API format
      const { success, message, token, jwtToken, name, role: userRole, error } = result;

      if (success) {
        handleSuccess(message);

        // Save token based on which property is returned
        localStorage.setItem('token', jwtToken || token);
        localStorage.setItem('loggedInUser', name || email);
        localStorage.setItem('role', role);

        // Redirect based on role
        setTimeout(() => {
          navigate(role === 'admin' ? '/admin/dashboard' : '/home');
        }, 1000);

      } else if (error) {
        const details = error?.details?.[0]?.message || message || 'Login failed';
        handleError(details);
      } else {
        handleError(message || 'Login failed');
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className='h-screen w-screen bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center'>
      <div className='bg-white p-8 md:px-12 rounded-lg w-full max-w-md shadow-xl'>
        <h1 className='text-2xl text-center mb-6 font-bold'>Login</h1>

        {/* Role Selection */}
        <div className="flex justify-center gap-6 mb-6">
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type="radio"
              name="role"
              value="user"
              checked={loginInfo.role === 'user'}
              onChange={handleChange}
            />
            User
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={loginInfo.role === 'admin'}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>

        <form className='flex flex-col gap-6' onSubmit={handleLogin}>
          {/* Email Field */}
          <div className='relative flex flex-col'>
            <label className='text-lg font-semibold' htmlFor='email'>Email</label>
            <div className='flex items-center border-b border-gray-400'>
              <MdEmail className='text-gray-500 mr-2' />
              <input
                className='w-full p-2 outline-none placeholder:italic'
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter your email...'
                value={loginInfo.email}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className='relative flex flex-col'>
            <label className='text-lg font-semibold' htmlFor='password'>Password</label>
            <div className='flex items-center border-b border-gray-400'>
              <RiLockPasswordFill className='text-gray-500 mr-2' />
              <input
                className='w-full p-2 outline-none placeholder:italic'
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter your password...'
                value={loginInfo.password}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className='mt-4 bg-[#667eea] hover:bg-indigo-600 transition-all duration-300 border-none text-lg text-white rounded-md p-3 cursor-pointer'
            type='submit'
          >
            Login
          </button>

          {/* Signup Link */}
          <span className='text-center mt-4'>
            Don’t have an account?
            <Link to="/signup">
              <u className='italic text-blue-500'> Signup</u>
            </Link>
          </span>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
