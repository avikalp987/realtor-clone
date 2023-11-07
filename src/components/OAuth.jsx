import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { useNavigate } from 'react-router'

export default function OAuth() {

    const navigate = useNavigate();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider);
            const user = result.user;

            // check if the user already exists

            const docRef = doc(db, "users" ,user.uid);

            const docSnap = await getDoc(docRef);

            if(!docSnap.exists())
            {
                await setDoc(docRef,{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp(),
                });
            }

            toast.success("User Registered Successfully");

            navigate("/");

        } catch (error) {
            toast.error("Oops! Something went wrong")
        }
    }

    return (
    <button 
    type = "button"
    onClick = {onGoogleClick}
    className='flex items-center justify-center w-full bg-red-600 text-white px-7 py-3 uppercase text-sm font-medium rounded hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg first-letter:active:shadow-lg transition duration-150 ease-in-out'>
        <FcGoogle 
        className='text-2xl bg-white rounded-full mr-2'
        />
        Continue with Google
    </button>
  )
}
