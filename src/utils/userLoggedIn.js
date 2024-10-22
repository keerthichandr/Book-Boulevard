import { createContext } from "react";

const userLoggedIn=createContext(
    {
        loggedInUser:null,
        userCred:null,
    }
)
export default userLoggedIn; 


