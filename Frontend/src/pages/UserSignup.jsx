import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser ={
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      username: username,
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if(response.status === 201 ){

      const data = response.data;
      setUserData(data.user);
      localStorage.setItem('token', data.token);

      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setUsername('');
    
  }

  return (
    <div className='py-5 px-5 flex flex-col h-screen justify-between'>

        <div>
          <img className='w-20 mb-4' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => submitHandler(e)}>

          <h3 className='text-lg font-medium mb-2 '> Enter your Name</h3>
          <div className='flex gap-4 mb-5'>
            <input 
            required
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder: text-base'
            type="text" 
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            required
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder: text-base'
            type="text" 
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          </div>
          
          <h3 className='text-lg font-medium mb-2 '> Username </h3>
          <input 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder: text-base'
            type="text" 
            placeholder='Username' 
          />

          <h3 className='text-lg font-medium mb-2 '> Email </h3>
          <input 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder: text-base'
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
            Create Account
          </button>
        </form>

        <p className='text-center'> 
          Already have an account? <Link to="/login" className='text-blue-600'>Login here</Link> 
        </p>

        </div>

        <div>
          <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the Google
          <a  className='underline' href="https://policies.google.com/privacy"> Privacy Policy </a>
          and
          <a className='underline' href="https://policies.google.com/terms"> Terms of Service </a>
          apply.
          </p>
        </div>

    </div>
  )
}

export default UserSignup
