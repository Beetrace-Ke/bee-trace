import React from "react";
import { Button,buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { login } from "@/utils/auth";


const TopBar=()=>{

  const navigate = useNavigate();
    const goToHome=()=>{
        navigate('/')
    }
    const goToList=()=>{
      navigate('/PropertyLists')
  }
    return(
      <div className="border-b border-gray-200 p-2">
      <div className="container mx-auto flex justify-between items-center">
     
        <div className="text-black text-xl font-bold" onClick={goToHome}>
        Propreon 
        </div>
  
        <div>
         {window.auth.isAuthenticated?<Button
         onClick={goToList}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <span className="text-black">Dashboard</span>
            </Button>:<Button
            onClick={login}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <span className="text-black">Login</span>
            </Button>}
        </div>
      </div>
    </div>
    
    )
}


export default TopBar