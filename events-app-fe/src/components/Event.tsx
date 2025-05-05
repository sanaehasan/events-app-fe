import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { eventType } from "../eventType";
import { addAttendee, deleteEvent, getEventById, getUsersEvents } from "../api";
import UserContext from "../UserContext";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import Loading from "./Loading";
import { google } from "calendar-link";
import { useNavigate } from "react-router-dom";


export default function Event() {

    const {event_id} = useParams();
    const [event,setEvent]=useState<eventType|null>(null);
    const [error,setError]= useState<boolean>(false)
    const [open,setOpen] = useState<boolean>(false)
    const [loading,setLoading]= useState<boolean>(true)
    const [booked,setBooked]=useState<boolean>(false)
     const [bookedEvent,setBookedEvent]=useState<boolean>(false)
    const context = useContext(UserContext);
    const navigate = useNavigate();

   

    useEffect(()=>{

        getEventById(Number(event_id)).then((data)=>{
            setEvent(data);
            setLoading(false);    
           
        }).catch(()=>{
            setError(true)
        })

        if(context?.user){
         getUsersEvents(Number(context?.user?.user_id),String(context?.user!.token)).then((data:any)=>{
            
              if(data.find((e:any)=>{return e.event_id===event?.event_id;})){
                 setBookedEvent(true);
              }
            })
          }


    },[event])


   function handleBooking(e:React.SyntheticEvent){
            e.preventDefault();

            if(!context?.user){
                setOpen(true);
            }else{
                addAttendee(Number(context?.user.user_id), Number(event_id),String(context?.user.token)).then((data)=>{
                      if(data.attendee_id){
                       // console.log(data);
                        setBooked(true);
                        setBookedEvent(true);
                      }
                })
            }
   }
   function handleDelete(e:React.SyntheticEvent){
     e.preventDefault();
     deleteEvent(Number(event_id),String(context?.user?.token)).then(()=>{
        navigate("/")
     })
   }
  return (
    <>
    {error&& <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto justify-center"><p className="text-red-500">error loading event</p></div>}
    {loading?<Loading/>: <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                          
                        <h2 className="text-gray-900 text-2xl font-bold font-manrope leading-normal lg:text-start text-center">{event?.title}</h2>
                        <p className="text-gray-500 text-base font-normal leading-normal lg:text-start text-center">{event?.description}</p>
                         <h4 className="text-gray-700 text-l font-semibold font-manrope leading-normal lg:text-start text-center">Starts: {event?.start_date}</h4>
                         <h4 className="text-gray-700 text-l font-semibold font-manrope leading-normal lg:text-start text-center">Ends: {event?.end_date}</h4>
                         <h4 className="text-gray-700 text-l font-semibold font-manrope leading-normal lg:text-start text-center">Place: {event?.city}</h4>
                     
                     
                        <h5 className="text-gray-700 text-l font-semibold leading-relaxed lg:text-start text-center">Location: {event?.location}</h5>

                    </div>
                   {!bookedEvent?<button  onClick={handleBooking} disabled={booked} className="sm:w-fit w-full px-3.5 py-2 bg-emerald-400 hover:bg-emerald-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">Book a seat</span>
                    </button>:<p className="text-emerald-500 justify-center">You have Already booked this event <a
                                                                                          href={event?google({
                                                                                                title: event!.title,
                                                                                                description: event!.description,
                                                                                                start: event!.start_date,
                                                                                                end:event!.end_date,
                                                                                                location:event!.location
                                                                                        }):""} 
                                                                                       className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600 sm:ml-3 sm:w-auto"
                                                                                       target="_blank"
                                                                                       onClick={() => setBooked(false)}
                                                                                        >
                                                                                       Add to Google Calender
                                                                                       </a></p>}
                   
                </div>
              
                <img className="lg:mx-0 mx-auto h-full w-full rounded-3xl object-cover" src={event?.image} alt="event image" />
                {context!.user?.role==="admin"?<div className="w-full flex-wrap justify-start lg:items-start items-center gap-4 flex"><Link to={`/edit-event/${event?.event_id}`}   className="sm:w-fit w-full px-3.5 py-2 bg-orange-500 hover:bg-orange-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">Edit event</span>
                    </Link>
                    <button   onClick={handleDelete} className="sm:w-fit w-full px-3.5 py-2 bg-red-500 hover:bg-red-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white text-sm font-medium leading-6">Delete event</span>
                    </button></div>:null }
            </div>
            
        </div>
        
    </section>}
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    You need to log in
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     In Order to book an event you need to log in your account
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Link
              to="/login"
               
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600 sm:ml-3 sm:w-auto"
              >
                LogIn
              </Link>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

     <Dialog open={booked} onClose={setBooked} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:size-10">
                  <CalendarDateRangeIcon aria-hidden="true" className="size-6 text-emerald-500" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Google calendar
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     You can add this event to your google calendar by clicking the green button
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <a
              href={event?google({
                    title: event!.title,
                    description: event!.description,
                    start: event!.start_date,
                    end:event!.end_date,
                    location:event!.location
            }):""} 
                className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-600 sm:ml-3 sm:w-auto"
             target="_blank"
              onClick={() => setBooked(false)}
             >
                Add to Google Calender
              </a>
              <button
                type="button"
                data-autofocus
                onClick={() => setBooked(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </>
  )
}
