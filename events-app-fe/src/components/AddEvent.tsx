
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import React, { useContext, useEffect, useState } from 'react'
import { addEvent, getGenre } from '../api';
import { genreType } from '../genreType';
import UserContext from '../UserContext';
import { eventType } from '../eventType';
import Loading from './Loading';

export default function AddEvent() {
     
    const [genre,setGenre]= useState<genreType[]|null>(null);
    const context = useContext(UserContext);
    const [loading,setLoading]= useState<boolean>(false)
    const [event,setEvent]= useState<eventType|null>(null);
    const [error,setError]= useState<boolean>(false)
    

    useEffect(()=>{
            getGenre().then((data)=>{
                    setGenre(data)
            })
    },[])


    function handleSubmit(e:React.SyntheticEvent){
        e.preventDefault();
        setLoading(true)
        const target = e.target as typeof e.target & {
         createdby: {vaule:number},
         start_date: {value:string},
         start_time: {value:string},
         end_time:  {value:string},
         end_date:  {value:string},
         city: {value:string},
         country:  {value:string},
         image:  {value:string},
         price:  {value:string},
         title: {value:string},
         description: {value:string},
         street_address:  {value:string},
         region: {value:string},
         postal_code:{value:string},
         genre:{value:number},
   
            }
      console.log(target.genre.value);
        addEvent(Number(context!.user?.user_id),`${target.start_date.value} ${target.start_time.value}:00 +0100`, `${target.end_date.value} ${target.end_time.value}:00 +0100`, target.city.value, target.country.value, target.image.value, "0.00",target.title.value, target.description.value,`${target.street_address.value} ${target.region.value} ${target.postal_code.value}`,Number(target.genre.value),String(context?.user?.token)).then((data:eventType)=>{
            setEvent(data)
            setLoading(false);
        }).catch(()=>{
            setError(true)
        })
       /**
        * createdBy:createdBy,
        start_date:start_date,
        end_date:end_date,
        city:city,
        country:country,
        image:image,
        price:price,
        title:title,
        description:description,
        location:location,
        genre_id:genre_id,
        */
    }
  return (
    /**
     * "createdby": 1,
      "---start_date": "2025-12-29 18:00:00 +0100",
      "---end_date": "2025-12-30 18:00:00 +0100",
      "---city": "Stapleford",
      "----country": "United Kingdom",
      "---------image": "http://dummyimage.com/110x100.png/5fa2dd/ffffff",
      "----price": "365.75",
      "-------title": "ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi",
      "-------description": "Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
      "-----location": "93211 Claremont Drive",
      "----genre_id": 7,
      "----genre_name": "Art"
     */
    <form className='mb-10' onSubmit={handleSubmit}>
      <div className="space-y-12 m-auto max-w-8/12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Event information</h2>
         
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
               Title
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter event title"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                    placeholder="Enter event description"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                  required
                />
              </div>
            
            </div>

             <div className="col-span-full">
              <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900">
                Image Url
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
               
                  placeholder="Enter event image url"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
              </div>
            
            </div>
             <div className="col-span-full">
              <label htmlFor="genre" className="block text-sm/6 font-medium text-gray-900">
                 Select the event's genre
              </label>
              <div className="mt-2">
                <select
                  id="genre"
                  name="genre"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                >
                   {genre?.map((g:genreType)=>{
                            return <option value={g.genre_id} key={g.genre_id}>{g.genre_name}</option>
                   })}
                    </select>
              </div>
            
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Dates and Location</h2>
       

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="start_date" className="block text-sm/6 font-medium text-gray-900">
                Start date
              </label>
              <div className="mt-2">
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="end_date" className="block text-sm/6 font-medium text-gray-900">
               End date
              </label>
              <div className="mt-2">
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="start_time" className="block text-sm/6 font-medium text-gray-900">
               Start time
              </label>
              <div className="mt-2">
                <input
                  id="start_time"
                  name="start_time"
                  type="time"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="end_time" className="block text-sm/6 font-medium text-gray-900">
               End time
              </label>
              <div className="mt-2">
                <input
                  id="end_time"
                  name="end_time"
                  type="time"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  required
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>United Kingdom</option>
                 
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street_address" className="block text-sm/6 font-medium text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street_address"
                  name="street_address"
                  type="text"
                  required
                  autoComplete="street-address"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  required
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  required
                  autoComplete="address-level1"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal_code" className="block text-sm/6 font-medium text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="postal_code"
                  name="postal_code"
                  type="text"
                  required
                  autoComplete="postal-code"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

    
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Save
        </button>
      
 
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
          {loading &&<Loading/>}
             {event &&<p className="text-base font-normal   text-emerald-500">registration was successful</p>}
             {error &&<p className="text-base font-normal   text-red-500">registration was unsuccessful</p>}
    </div>
    </form>
  )
}
