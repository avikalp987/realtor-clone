import { list, listAll } from 'firebase/storage'
import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { MdLocationOn } from"react-icons/md"
import { FaTrash } from "react-icons/fa"
import { MdEdit } from "react-icons/md";


export default function ListingItem({listing,id,onEdit,onDelete}) {
  return (
    <li className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow duration-150 relative m-[10px]'>
        <Link className='contents' to={`/category/${listing.type}/${id}`}>

            <img 
            className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
            src={listing.imgUrls[0]} 
            alt="" 
            loading='lazy'/>

            <Moment className='absolute top-2 left-2 bg-[#3377CC] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg'
            fromNow
            >
                {listing.timestamp?.toDate()}
            </Moment>

            <div className="w-full p-[10px]">
                <div className="flex items-center space-x-1">
                    <MdLocationOn className='h-4 w-4 text-green-600'/>
                    <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.address}</p>
                </div>

                <p className='font-semibold mt-2 text-xl m-0 truncate'>{listing.name}</p>

                <p className='text-[#457B9D] mt-2 font-semibold'>₹{listing.offer ? 
                    listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
                    : 
                    listing.regularPricetoString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}
                    {listing.type==="rent" && " / Month"}
                </p>

                <div className="flex items-center mt-[10px] space-x-3">
                    <div className="flex items-center space-x-1">
                        <p className='font-bold text-xs'>{listing.bedrooms>1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                        <p className='font-bold text-xs'>{listing.bathrooms>1 ? `${listing.bathrooms} Baths` : "1 Bath"}</p>
                    </div>
                </div>
            </div>


        </Link>

        {onDelete && <FaTrash 
        onClick={() => onDelete(listing.id)}
        className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'/>}

        {onEdit && <MdEdit
        onClick={() => onEdit(listing.id)}
        className='absolute bottom-2 right-7 h-4 cursor-pointer'/>}
    </li>
  )
}
