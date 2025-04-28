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
        console.log(err)
       return Promise.reject({msg:"enable To login try again"})
    })
}

export{logIn}