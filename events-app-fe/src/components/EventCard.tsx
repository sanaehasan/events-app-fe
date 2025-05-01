import { Link } from "react-router-dom";


export default function EventCard({event}:any){

return <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
  
        <img className="rounded-lg w-full h-80 p-2" src={event.image} alt="" />
    
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.genre_name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.title}</p>
        <Link to={`/event/${event.event_id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 ">
            More info
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>
    </div>
</div>

}