import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventType } from "../eventType";
import { editEvent, getEventById, getGenre } from "../api";
import Loading from "./Loading";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { genreType } from "../genreType";
import UserContext from "../UserContext";

export default function EditEvent(){
    const {event_id} = useParams();
    const [event,setEvent] = useState<eventType|null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<boolean>(false);
    const [genre,setGenre]=useState<genreType[]|null>(null)
    const [sdate,setSdate]=useState<string|null>(null);
    const [edate,setEdate]=useState<string|null>(null);
    const [updated,setUpdated]=useState<boolean>(false)
    const context = useContext(UserContext);
    useEffect(()=>{
    getGenre().then((data)=>{
                    setGenre(data)
                    getEventById(Number(event_id)).then((data)=>{
            setEvent(data);
            setLoading(false);
            setSdate(String(data.start_date));
            setEdate(String(data.end_date));
            console.log(sdate?.split(" ")[0])
            
           
        }).catch(()=>{
            setError(true)
        })
            })
       
    },[])
    function handleSubmit(e:React.SyntheticEvent){
         e.preventDefault();
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
         location:  {value:string},
         genre:{value:number},
            }
        
         editEvent(Number(event?.event_id),Number(context!.user?.user_id),
         `${target.start_date.value} ${target.start_time.value} +0100`,
         `${target.end_date.value} ${target.end_time.value} +0100`,
         target.city.value,
         target.country.value,
         target.image.value,"0.00",
         target.title.value,target.description.value, 
         target.location.value,
         Number(target.genre.value),
         String(context?.user?.token)).then((data:eventType)=>{
            setEvent(data)
            setUpdated(true)
        }).catch(()=>{
            setError(true)
        })

    }
    return <>
   {loading &&<Loading/>}
   {event&&<form className='mb-10' onSubmit={handleSubmit}>
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
                       defaultValue={event?.title}
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
                     defaultValue={event?.description}
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                 
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
                  
                     defaultValue={event?.image}
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
                     defaultValue ={String(event.genre_id)}
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
                     defaultValue={sdate?.split(" ")[0]}
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
                     defaultValue={edate?.split(" ")[0]}
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
                     defaultValue={sdate?.split(" ")[1]}
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
                    defaultValue={edate?.split(" ")[1]}
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
   
              
   
               <div className="sm:col-span-2 sm:col-start-1">
                 <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                   City
                 </label>
                 <div className="mt-2">
                   <input
                     id="city"
                     name="city"
                     required
                     defaultValue={event.city}
                     type="text"
                     autoComplete="address-level2"
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                   />
                 </div>
               </div>
   
               <div className="col-span-full">
                 <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">
                   Event Location
                 </label>
                 <div className="mt-2">
                   <textarea
                     id="location"
                     name="location"
                       
                     defaultValue={event.location}
                     required
                     autoComplete="address-level1"
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
            
                {updated &&<p className="text-base font-normal   text-emerald-500">update was successful</p>}
                {error &&<p className="text-base font-normal   text-red-500">update was unsuccessful</p>}
       </div>
       </form>}
         </>
}