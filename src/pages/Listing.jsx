import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import Contact from '../components/Contact';


export default function Listing() {
    const params = useParams();
    const auth = getAuth();
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(true);
    const [shareLinkCopy,setShareLinkCopy] = useState(false);
    const [contactLandlord,setContactLandlord] = useState(false);
    SwiperCore.use([Autoplay,Navigation,Pagination]);

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, "listings" ,params.listingId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists())
            {
                setListing(docSnap.data());
                setLoading(false);
            }
            else{
                setLoading(false);
                toast.error("Oops! Listing not found");
            }
        }

        fetchListing();
    }, [params.listingId])


    if(loading)
    {
        return <Spinner />
    }


  return (
    <main>
        <Swiper 
        slidesPerView={1} 
        navigation 
        pagination={{type:"progressbar"}}
        effect='fade'
        modules={[EffectFade]}
        autoplay={{delay:3000}}
        >
            {listing.imgUrls.map((url,index) => (
                <SwiperSlide key={index}>
                    <div
                    className='w-full overflow-hidden h-[300px] relative'
                    style={{background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: "cover",
                    }}
                    >

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        <div 
        onClick={() =>{
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopy(true);
            setTimeout(()=>{
                setShareLinkCopy(false);
            },2000)
        }}
        className="fixed top-[12%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center">
            <FaShare className='text-lg font-light'/>
        </div>

        {shareLinkCopy && (
            <p className='fixed top-[13%] right-[7%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2'>Copied</p>
        )}


        <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5 mt-3 mb-6">
            <div className="w-full">
                <p className='text-2xl font-bold mb-3 text-blue-900'>
                    {listing.name} - ₹{listing.offer ? 
                    listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
                    : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
                    }
                    {listing.type==="rent" ? " / Month" : ""}
                </p>
                <p className='flex items-center mt-6 mb-3 font-semibold'>
                    <FaMapMarkerAlt className='text-green-700 mr-1 '/>
                    {listing.address}
                </p>
                <div className='flex justify-start items-center space-x-4 w-[75%]'>
                    <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type==="rent" ? "Rent" : "Sale"}</p>
                    {listing.offer && (
                        <p
                        className='w-full max-w-[200px] bg-green-800 text-white rounded-md p-1 text-center font-semibold shadow-md'
                        >₹{+listing.regularPrice - +listing.discountedPrice} OFF</p>
                    )}
                </div>

                <p className='mt-3 mb-3'>
                    <span className='font-semibold'>Description : </span>
                    <p className='text-sm txet-gray-700'>
                    {listing.description}
                    </p>
                </p>

                <ul className='flex items-center space-x-2 text-sm font-semibold sm:space-x-10 mb-6'>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaBed className='mr-1 text-lg'/>
                        {+listing.bedrooms>1 ? `{listing.bedrooms} Beds` : "1 Bed"}
                    </li>

                    <li className='flex items-center whitespace-nowrap'>
                        <FaBath className='mr-1 text-lg'/>
                        {+listing.bathrooms>1 ? `{listing.bathrooms} Baths` : "1 Bath"}
                    </li>

                    <li className='flex items-center whitespace-nowrap'>
                        <FaParking className='mr-1 text-lg'/>
                        {listing.parking ? "Parking" : "No Parking"}
                    </li>

                    <li className='flex items-center whitespace-nowrap'>
                        <FaChair className='mr-1 text-lg'/>
                        {listing.furnished ? "Furnished" : "Not Furnished"}
                    </li>
                </ul>

                

                {listing.userRef !== auth.currentUser.uid && !contactLandlord && (
                    <div className="mt-6">

                    <button
                    onClick={() => setContactLandlord(true)}
                    className='px-7 py-3 bg-blue-600 text-white font-md text-sm uppercase rounded shadow-md  hover:bg-blue-700 hover:shadow-lg w-full focus:bg-blue-700 focus:shadow-lg transition duration-150 ease-in-out'
                    >
                        Contact Landlord
                    </button>
                    </div>
                )}

                {contactLandlord && (
                    <Contact userRef={listing.userRef} listing={listing}/>
                )}
            </div>
            <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden"></div>
        </div>
    </main>
  )
}
