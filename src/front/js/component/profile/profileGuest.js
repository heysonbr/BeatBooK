import React, { useEffect } from "react";
import { ProfileGuestBanner } from "./profileGuestBanner ";
import { ProfileGuestBody } from "./profileGuestBody";
import { useNavigate, useParams } from "react-router-dom";


export const ProfileGuest = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    
     useEffect(() => {
     const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/");
     }
   }, []);
   
 
    return (
        <div className="container">
            
                    <div>
                        <ProfileGuestBanner />
                    </div>
                    <div className="">
                       <ProfileGuestBody />
                    </div>
            
        </div>
    );
};