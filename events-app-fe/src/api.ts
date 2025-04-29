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
    }).catch((err)=>{
       
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
       return Promise.reject({msg:"enable register"})
    })
}
export {logIn,registerUser}