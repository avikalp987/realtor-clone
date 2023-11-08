import React from 'react'
import spinner from "../assets/svg/spinner.svg"

export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center min-h-screen'>
        <div>
            <img 
            className='h-24'
            src={spinner} 
            alt="" />
        </div>
    </div>
  )
}
