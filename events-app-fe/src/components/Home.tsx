import { useContext, useEffect, useState } from "react"
import { getEvents } from "../api";
import EventCard from "./EventCard";
import { eventType } from "../eventType";
import Loading from "./Loading";
import UserContext from "../UserContext";
import { userType } from "../userType";
import { Link } from "react-router-dom";



function Home(){
type userContextType={
            user:userType|null,
            setUser:React.Dispatch<React.SetStateAction<userType|null>>
        }  
const [events,setEvents] =useState<eventType[]|null>(null);
const [loading,setLoading] =useState<boolean>(true);
const context =useContext <userContextType|null>(UserContext);

    useEffect(()=>{
        getEvents().then(({events})=>{
           setEvents(events);
           setLoading(false)
        })
    },[])

    return  <div className="bg-white">
     {loading&& <Loading/>}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
         {!loading&&  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available events</h2>}
         {context!.user?.role==="admin"?<Link to="/event"   className="sm:w-fit w-full mt-5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">add Event</span>
                    </Link>:null }
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">  
    {events&&events.map((e:eventType)=>{return <EventCard kye={e.event_id} event={e}/>})}
        </div>
      </div>
    </div>
}
export default Home