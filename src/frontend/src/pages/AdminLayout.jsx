import React, { useState } from "react";
import Sidebar from "@/components/Mycomponent/SideBar";
import { Outlet } from "react-router";
import { IoMenu } from "react-icons/io5";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminLayout=()=>{
  const [BarOpen, toggleBarOpen] = useState(true)
return(
<div className="flex bg-gray-100 relative md:static">
    <Sidebar BarOpen={BarOpen} toggleBarOpen={toggleBarOpen}/>
     <div className="flex-1 h-screen overflow-y-auto">
     <div className="border-b border-gray-200 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black md:hidden text-xl font-bold" >
        <button onClick={()=>{
          toggleBarOpen(!BarOpen)
        }} aria-label="Menu">
					<IoMenu className="text-2xl" />
				</button>
        </div>

      </div>
    </div>
    <div className="pt-20 w-[95%] mx-auto">
      <Outlet />
    </div>
     </div>
 
</div>
)
}

export default AdminLayout