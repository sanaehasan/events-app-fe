import axios from "axios";


const api = axios.create({
  baseURL: "https://events-app-tryx.onrender.com/api",
});

const logIn=(email:String,password:String)=>{
   return api.get("/users",{
        params:{
            email:email,
            password:password
        }
    }).then(({data})=>{
        return data.user;
    }).catch(()=>{
       
       return Promise.reject({msg:"enable To login try again"})
    })
}
const registerUser=(name:String|null,username:String,avatar:String|null,city:String,email:String,password:String)=>{
   return api.post("/users",{
            name:name,
            username:username,
            avatar:avatar,
            city:city,
            email:email,
            role:"user",
            password:password
        
    }).then(({data})=>{
        return data.user;
    }).catch((err)=>{
        console.log(err)
       return Promise.reject({msg:"Unable register"})
    })
}
const getEvents= ()=>{
 
    return api.get("/events").then(({data})=>{
        return data;
    }).catch(()=>{
            return Promise.reject({msg:"Unable to get Events data"})
    })
}
const getEventById= (event_id:number)=>{
    return api.get(`/events/event/${event_id}`).then(({data})=>{
        return data.event;
    }).catch(()=>{
            return Promise.reject({msg:"Unable to get Events data"})
    })
}
const addAttendee = (user_id:number,event_id:number,token:string)=>{
    return api.post("/attendees",{user_id:user_id,event_id:event_id},{headers:{Authorization:token}}).then(({data})=>{
    
            return data.attendee
    }).catch((err)=>{
           return Promise.reject({msg:err.msg})
    })
}
const getGenre = ()=>{
    return api.get("/genre").then(({data})=>{
        return data.genre
    }).catch((err)=>{
           return Promise.reject({msg:err.msg})
    })
}
function addEvent(createdBy:Number,start_date:string, end_date:string, city:string, country:string, image:string, price:string,title:string, description:string,location:string,genre_id:number,token:string){
return api.post("/events",{
        createdBy:createdBy,
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
},{headers:{Authorization:token}}).then(({data})=>{
  
    return data.event;
}).catch((err)=>{
    console.log(err)
           return Promise.reject({msg:err.msg})
    })
}
function editEvent(event_id:number,createdBy:Number,start_date:string, end_date:string, city:string, country:string, image:string, price:string,title:string, description:string,location:string,genre_id:number,token:string){
return api.patch("/events",{
        event_id:event_id,
        createdBy:createdBy,
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
},{headers:{Authorization:token}}).then(({data})=>{
  
    return data.event;
}).catch((err)=>{
    console.log(err)
           return Promise.reject({msg:err.msg})
    })
}

function deleteEvent(event_id:number,token:string){
    return api.delete(`/events/${event_id}`,{headers:{Authorization:token}}).then(()=>{
        return true
    }).catch((err)=>{
         return Promise.reject({msg:err.msg})
    })
}

function deleteAccount(user_id:number,token:string){
return api.delete(`/users/${user_id}`,{headers:{Authorization:token}}).then(()=>{
    return true
}).catch((err)=>{
    return  Promise.reject({msg:err.msg})
})
}

function getUsersEvents(user_id:number,token:string){

return api.get(`/events/${user_id}`,{headers:{Authorization:token}}).then(({data})=>{
   console.log(data);
    return data.events;
}).catch((err)=>{
    console.log(err)
    return  Promise.reject({status:err.status,msg:err.message})
})
}

function deleteAttendee(attendee_id:number, token:string){
    return api.delete(`/attendees/${attendee_id}`,{headers:{Authorization:token}}).then(()=>{
        return true
    }).catch((err)=>{
    return  Promise.reject({status:err.status,msg:err.message})
})
}
export {logIn,registerUser,getEvents,getEventById,addAttendee,getGenre,addEvent,deleteEvent,editEvent,deleteAccount,getUsersEvents,deleteAttendee}