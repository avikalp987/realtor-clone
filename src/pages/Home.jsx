import { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Home() {
  //offers
  const [offerListings,setOfferListings] = useState(null);
  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        //get the reference
        const listingsRef = collection(db,"listings");
        //create the query
        const q = query(listingsRef, where("offer","==",true),orderBy("timestamp","desc"),limit(4));

        //getting the information and execute the query
        const docSnap = await getDocs(q);
        const listings = [];

        docSnap.forEach((doc) => {
          listings.push({
            id:doc.id,
            data:doc.data(),
          })
        })
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  } ,[])

  //rent
  const [rentListings,setRentListings] = useState(null);
  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        //get the reference
        const listingsRef = collection(db,"listings");
        //create the query
        const q = query(listingsRef, where("type","==","rent"),orderBy("timestamp","desc"),limit(4));

        //getting the information and execute the query
        const docSnap = await getDocs(q);
        const listings = [];

        docSnap.forEach((doc) => {
          listings.push({
            id:doc.id,
            data:doc.data(),
          })
        })
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  } ,[])



  //sale
  const [saleListings,setSaleListings] = useState(null);
  useEffect(() => {
    const fetchOfferListings = async() => {
      try {
        //get the reference
        const listingsRef = collection(db,"listings");
        //create the query
        const q = query(listingsRef, where("type","==","sale"),orderBy("timestamp","desc"),limit(4));

        //getting the information and execute the query
        const docSnap = await getDocs(q);
        const listings = [];

        docSnap.forEach((doc) => {
          listings.push({
            id:doc.id,
            data:doc.data(),
          })
        })
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  } ,[])





  return (
    <div>
      <Slider />
      <div className='max-w-6xl mx-auto p-4 sapce-y-6'>
        {offerListings && offerListings.length>0 && (
          <div className="m-2 mb-6">
            <h2 className='px-3 text-2xl mt-6 font-semibold '>Recent Offers</h2>

            <Link to={"/offers"}>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show More Offers</p>
            </Link>

            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offerListings.map((listing) => (
                <ListingItem 
                key={listing.id} 
                listing={listing.data} 
                id={listing.id}/>
              ))}
            </ul>
          </div>
        )}




          {rentListings && rentListings.length>0 && (
          <div className="m-2 mb-6">
            <h2 className='px-3 text-2xl mt-6 font-semibold '>Places For Rent</h2>

            <Link to={"/category/rent"}>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show More </p>
            </Link>

            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {rentListings.map((listing) => (
                <ListingItem 
                key={listing.id} 
                listing={listing.data} 
                id={listing.id}/>
              ))}
            </ul>
          </div>
        )}


          {saleListings && saleListings.length>0 && (
          <div className="m-2 mb-6">
            <h2 className='px-3 text-2xl mt-6 font-semibold '>Places to Buy</h2>

            <Link to={"/category/sale"}>
              <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show More </p>
            </Link>

            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {saleListings.map((listing) => (
                <ListingItem 
                key={listing.id} 
                listing={listing.data} 
                id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
