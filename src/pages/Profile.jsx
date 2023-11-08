import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })
  const [changeDetail,setChangeDetail] = useState(false);
  const {name,email} = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  }

  const onChange = (event)=> {
    setFormData((prevState) => (
      {
        ...prevState,
        [event.target.id] : event.target.value,
      }
    ))
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name)
      {

        //update name in authentication
        await updateProfile(auth.currentUser,{
          displayName : name,
        })

        //update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef,{
          name:name,
        })
      }

      toast.success("Profile Updated Successfully")
    } catch (error) {
      toast.error("Oops! Something went wrong")
    }
  }


  return (
    <>
      <section className='max-w-6xl mx-auto flex flex-col items-center justify-center'>
        <h1 className='text-3xl text-center mt-6'>
          My Profile
        </h1>

        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            
            <input 
            type='text'
            id="name"
            value={name}
            disabled = {!changeDetail}
            onChange={onChange}
            className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
            />

            <input 
            type='email'
            id="email"
            value={email}
            disabled
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6'
            />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p>Do You Want To Change Your Name?
                <span 
                onClick={() => {
                  changeDetail && onSubmit()
                  setChangeDetail(!changeDetail)
                }}
                className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'> 
                {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </p>

              <p 
              onClick={onLogout}
              className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
