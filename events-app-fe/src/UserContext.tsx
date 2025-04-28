import { createContext } from "react";
import { userType } from "./userType";

type userContextType={
    user:userType|null,
    setUser:React.Dispatch<React.SetStateAction<userType|null>>
}

const UserContext=createContext<userContextType|null>(null);

export default UserContext;