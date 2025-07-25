import React from "react";

const LandingPage=()=>{
    return(
        <div className="background flex items-center justify-center lg:justify-start h-80 mb-6">
             <div className="container mx-auto px-4 lg:w-1/2">
               <div className="text-left lg:text-left">
                  <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-white">Our Place, Your Heaven</h1>
                  <p className="text-sm lg:text-lg text-gray-200 mb-6">
                  Propreon is a blockchain-powered platform revolutionizing property rentals 
                  for creative industries like film and music. It ensures transparency, security, 
                  and efficiency, connecting property owners with creators seamlessly. 
                  </p>
               </div>
             </div>
        </div>
    )
}

export default LandingPage;