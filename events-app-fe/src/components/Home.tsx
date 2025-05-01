import { useEffect, useState } from "react"
import { getEvents } from "../api";
import EventCard from "./EventCard";
import { eventType } from "../eventType";
import Loading from "./Loading";



function Home(){
const [events,setEvents] =useState<eventType[]|null>(null);
const [loading,setLoading] =useState<boolean>(true);
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
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">  
    {events&&events.map((e:eventType)=>{return <EventCard kye={e.event_id} event={e}/>})}
        </div>
      </div>
    </div>
}
export default Home