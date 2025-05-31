import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

import toast from 'react-hot-toast';

const Login = () => {
  const { axios, setToken } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/admin/login', { email, password })
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        toast.success('Login successful!');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }

  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white'>
        <div className='flex flex-col items-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>Admin</span> Login
            </h1>
            <p className='text-sm font-light text-gray-600'>
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className='w-full'>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-1 text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id='email'
                type='email'
                required
                placeholder='your email id'
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='password' className='block mb-1 text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id='password'
                type='password'
                required
                placeholder='your password'
                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
