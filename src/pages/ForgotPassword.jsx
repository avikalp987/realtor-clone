import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {

  const [email,setEmail] = useState("");

  const onChange = (event) => {
    setEmail(event.target.value);
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>

      <div className='flex justify-center flex-wrap items-center px-6 py-12  max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img 
          className='w-full rounded-2xl'
          src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww" alt="" />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input 
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6" 
            type="email" 
            id="email"
            value={email}
            onChange={onChange}
            placeholder='Email Address'
            />


            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Dont have an account? <Link className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out' to={"/sign-up"}>Register</Link></p>
              <p>
                <Link 
                className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'
                to={"/sign-in"}>Sign in instead</Link>
              </p>
            </div>

            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            type='submit'>
              Send Reset Password
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
