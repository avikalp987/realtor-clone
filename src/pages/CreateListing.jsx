import React, { useState } from 'react'

export default function CreateListing() {

    const [formData,setFormData] = useState({
        type:"rent",
        name:"",
        bedrooms: 1,
        bathrooms: 1,
        parking:false,
        furnished: false,
        address: "",
        description:"",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,

    })
    const {type,name,bedrooms,bathrooms,parking,furnished,address,description,offer,regularPrice,discountedPrice} = formData;

    const onChange = () => {

    }

  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1
        className='text-3xl text-center mt-6 font-bold'
        >Create a Listing</h1>

        <form>

            <p className='text-lg mt- font-semibold mt-6'>Sell / Rent</p>
            <div className='flex'>
                <button
                type="button"
                id="type"
                value="sale"
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                    type==="rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   sell 
                </button>

                <button
                type="button"
                id="type"
                value="rent"
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                    type==="sale" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   rent
                </button>
            </div>


            <p className='text-lg mt-6 font-semibold'>Name</p>
            <input 
            onChange={onChange}
            required
            type='text' id='name' value={name} placeholder='Name' maxLength="32" minLength="10"
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'/>


            <div className='flex space-x-6 justify-start mb-6'>
                <div>
                    <p className='text-xl font-semibold'>Beds</p>
                    <input
                    type='number'
                    id="bedrooms"
                    value={bedrooms}
                    onChange={onChange}
                    min="1"
                    max="50"
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />
                </div>

                <div>
                    <p className='text-xl font-semibold'>Baths</p>
                    <input
                    type='number'
                    id="bathrooms"
                    value={bathrooms}
                    onChange={onChange}
                    min="1"
                    max="50"
                    required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />
                </div>
            </div>


            <p className='text-lg mt- font-semibold mt-6'>Parking Spot</p>
            <div className='flex'>
                <button
                type="button"
                id="parking"
                value={true}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                    !parking ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   Yes
                </button>

                <button
                type="button"
                id="parking"
                value={false}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                    parking ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   no
                </button>
            </div>


            <p className='text-lg mt- font-semibold mt-6'>Furnished</p>
            <div className='flex mb-6'>
                <button
                type="button"
                id="furnished"
                value={true}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                    !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   yes
                </button>

                <button
                type="button"
                id="furnished"
                value={false}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                    furnished ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   no
                </button>
            </div>


            <p className='text-lg font-semibold'>Address</p>
            <textarea
            onChange={onChange}
            required
            type='text' id='address' value={address} placeholder='Address'
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'/>


            <p className='text-lg font-semibold'>Description</p>
            <textarea 
            onChange={onChange}
            required
            type='text' id='description' value={description} placeholder='Description'
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'/>


            <p className='text-lg mt- font-semibold'>Offer</p>
            <div className='flex mb-6'>
                <button
                type="button"
                id="offer"
                value={true}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mr-3 ${
                    !offer ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   yes
                </button>

                <button
                type="button"
                id="offer"
                value={false}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ml-3 ${
                    offer ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                   no
                </button>
            </div>


            <div className='flex justify-start items-center mb-6'>
                <div>
                    <p
                    className='text-lg font-semibold'
                    >Regular Price</p>
                    <div className='flex items-center w-full justify-center space-x-6'>
                        <input type="number" id="regularPrice" value={regularPrice}
                        onChange={onChange}
                        required
                        className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                        {type==="rent" && (
                            <div>
                                <p className='text-md w-full whitespace-nowrap'>₹ / Month</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {offer && (
            <div className='flex justify-start items-center mb-6'>
                <div>
                    <p
                    className='text-lg font-semibold'
                    >Discounted Price</p>
                    <div className='flex items-center w-full justify-center space-x-6'>
                        <input type="number" id="discountedPrice" value={discountedPrice}
                        onChange={onChange}
                        required={offer}
                        className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                        {type==="rent" && (
                            <div>
                                <p className='text-md w-full whitespace-nowrap'>₹ / Month</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}


            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-gray-600'>The first image will me the cover (max 6)</p>
                <input 
                className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
                type="file" 
                id="images" 
                onChange={onChange}
                accept='.jpg,.png,.jpeg'
                multiple
                required
                />
            </div>


            <button
            className='mb-6 w-full px-7 py-3 bg-blue-600 text-white uppercase font-medium text-sm rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            type='submit'
            >
                Create Listing
            </button>
        </form>
    </main>
  )
}
