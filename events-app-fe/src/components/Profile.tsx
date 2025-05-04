import { useContext } from "react"
import UserContext from "../UserContext"
import { deleteAccount } from "../api";
import { useNavigate } from "react-router-dom";


export default function Profile() {
const navigate = useNavigate();
const context = useContext(UserContext);
function handleDelete(e:React.SyntheticEvent){
        e.preventDefault();
        deleteAccount(Number(context?.user?.user_id),String(context?.user?.token)).then(()=>{
             sessionStorage.clear();
           context?.setUser(null);
           navigate("/");
        }).catch((err)=>{
            alert(err.msg);
        })

}
  return (
    <>
    <div className="w-full max-w-2xl px-4 md:px-5 lg:px-5 mx-auto justify-center mt-20">
        <img className="w-12 h-12 rounded-full" src={context?.user?.avatar?String(context?.user?.avatar):"/profile.jpg"}  />
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">User Profile</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{context?.user?.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">UserName</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{context?.user?.username}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{context?.user?.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">City</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{context?.user?.city}</dd>
          </div>
          
           
        </dl>
      </div>
     
    </div>
     <div className="w-full max-w-2xl px-4 md:px-5 lg:px-5 mx-auto justify-center justify-items-center mt-10">
     <button
     type="submit"
     className="flex w-40 justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
     onClick={handleDelete}      
              >
      Delete my account
     </button>
     </div>
     </>
  )
}
