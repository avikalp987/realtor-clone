import React, { useState } from 'react'
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Signin() {

  const [formData,setFormData] = useState({
    email : "",
    password : "",
  })
  const [showPassword,setShowPassword] = useState(false)
  const navigate = useNavigate("/");

  const {email,password} = formData;

  const onChange = (event) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [event.target.id] : event.target.value,
      }
    ))
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth,email,password);
      if(userCredentials.user)
      {
        toast.success("Logged In Successfully");
        navigate("/");
      }
      
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>

      <div className='flex justify-center flex-wrap items-center px-6 py-12  max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img 
          className='w-full rounded-2xl'
          src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww" alt="" />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input 
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6" 
            type="email" 
            id="email"
            value={email}
            onChange={onChange}
            placeholder='Email Address'
            />

            <div className='relative mb-6'>
              <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type={showPassword ? "text" : "password"} 
              id="password"
              value={password}
              onChange={onChange}
              placeholder='Password'
              />

              {showPassword ? (
                <AiFillEyeInvisible 
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3 text-xl cursor-pointer'/>
              ) : (
                <AiFillEye 
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3 text-xl cursor-pointer'/>
              )}
            </div>


            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Dont have an account? <Link className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out' to={"/sign-up"}>Register</Link></p>
              <p>
                <Link 
                className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'
                to={"/forgot-password"}>Forgot Password?</Link>
              </p>
            </div>

            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            type='submit'>
              Sign In
            </button>

            <div className='my-4 flex items-center before:border-t before:flex-1 before:border-gray-400 after:flex-1 after:border-t after:border-gray-400'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>

            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
