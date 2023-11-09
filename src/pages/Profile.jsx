import { getAuth, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { FcHome } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })
  const [changeDetail,setChangeDetail] = useState(false);
  const [listings,setListings] = useState(null);
  const [loading,setLoading] = useState(true);

  const {name,email} = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db,"listings");
      const q = query(listingRef,where("userRef","==",auth.currentUser.uid),orderBy("timestamp","desc"));

      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    
    fetchUserListings();
  }, [auth.currentUser.uid])

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

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  }

  const onDelete = async (listingId) => {
    if(window.confirm("The listing cannot be restored once deleted")){
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter((listing) => listing.id!==listingId);
      setListings(updatedListings);

      toast.success("Listing deleted!");
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
              className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>
                Sign Out
              </p>
            </div>
          </form>

          
            <button
            className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            type='submit'
            >
              <Link 
              className='flex justify-center items-center'
              to={"/create-listing"}>
              <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
              Sell or Rent Your Home
              </Link>
            </button>
          
        </div>
      </section>


      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length>0 && (
          <>
            <h2 className='text-2xl text-center font-semibold mb-6'>My Listings</h2>
            <ul 
            className='sm:grid sm:grid-col-2 lg:grid-col-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'
            >
              {listings.map((listing) => (
                <ListingItem 
                key={listing.id} 
                id={listing.id} 
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
