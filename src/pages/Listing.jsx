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
import { FaShare } from 'react-icons/fa';

export default function Listing() {
    const params = useParams();
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(true);
    const [shareLinkCopy,setShareLinkCopy] = useState(false);
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
    </main>
  )
}
