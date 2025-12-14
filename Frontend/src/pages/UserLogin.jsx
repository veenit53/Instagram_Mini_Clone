import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // setUserData({ email: email, password: password });
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if(response.status === 200 ){
      const data = response.data;
      setUserData(data.user);
      localStorage.setItem('token', data.token);

      navigate('/home');
    }
    
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 flex flex-col h-screen justify-between'>

        <div>
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2 '> Email </h3>
          <input 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder: text-base'
            type="email" 
            placeholder='email@example.com' 
          />

          <h3 className='text-lg font-medium mb-2 '> Password </h3>
          <input 
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder: text-base' 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder='Enter your password' 
          />

          <button className='bg-[#111111] mb-2 text-white font-semibold rounded px-4 py-2 mt-4 w-full text-lg'>
            Login
          </button>
        </form>

        <p className='text-center'> 
          New here? <Link to="/signup" className='text-blue-600'>Create new Account</Link> 
        </p>

        </div>

    </div>
  )
}

export default UserLogin
