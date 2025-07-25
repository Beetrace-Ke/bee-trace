import { logout } from '@/utils/auth';
import React from 'react';
import { IoClose, IoCreate, IoHome, IoList, IoLogOut } from 'react-icons/io5';


const Sidebar = ({BarOpen, toggleBarOpen}) => {

    return(
    <div className=
    {`${BarOpen?'block':'hidden'}  md:block duration-300 p-5 pt-8 
    bg-white h-screen border-r border-gray-200 overflow-hidden absolute sm:relative z-50`}>
      {
        BarOpen && (
            <button className="
            absolute top-1 right-1 sm:hidden p-2 text-gray-600
            "
            onClick={()=>{
                toggleBarOpen(!BarOpen)
            }}
            >
             <IoClose size={24} />
            </button>
        )
      }

      <div className="flex flex-col justify-between h-full">
        <ul className="mb-6">
        <li  className="flex items-center gap-x-4 cursor-pointer p-2 mt-1
           border-l-4 border-transparent hover:border-violet-400 active:border-violet-500
           origin-left duration-100
           ">
            <a className="text-2xl no-underline" href="/">
            <IoHome size={20} />
							</a>
            <a  href="/" className={`no-underline text-black hover:text-black origin-left duration-100`}>
								Home
							</a>
           
           </li>
           <li  className="flex items-center gap-x-4 cursor-pointer p-2 mt-1
           border-l-4 border-transparent hover:border-violet-400 active:border-violet-500
           origin-left duration-100
           ">
            <a className="text-2xl no-underline" href="/PropertyLists">
            <IoList size={20} />
							</a>
            <a  href="/PropertyLists" className={`no-underline text-black hover:text-black origin-left duration-100`}>
            My All Property
							</a>
           
           </li>
           <li  className="flex items-center gap-x-4 cursor-pointer p-2 mt-1
           border-l-4 border-transparent hover:border-violet-400 active:border-violet-500
           origin-left duration-100
           ">
            <a className="text-2xl no-underline" href="/MyBookings">
            <IoList size={20} />
							</a>
            <a  href="/MyBookings" className={`no-underline text-black hover:text-black origin-left duration-100`}>
            My All Booking
							</a>
           
           </li>
           <li  className="flex items-center gap-x-4 cursor-pointer p-2 mt-1
           border-l-4 border-transparent hover:border-violet-400 active:border-violet-500
           origin-left duration-100
           ">
            <a className="text-2xl no-underline" href="/CreateProperty">
            <IoCreate size={20} />
							</a>
            <a  href="/CreateProperty" className={`no-underline text-black hover:text-black origin-left duration-100`}>
            Create Property
							</a>
           </li>
        </ul>
        <ul className="mb-6">
           <li  className="flex items-center gap-x-4 cursor-pointer p-2 mt-1
           border-l-4 border-transparent hover:border-violet-400 active:border-violet-500
           origin-left duration-100
           ">
           {window.auth.isAuthenticated && 
           <div onClick={logout}>
             <span className="text-2xl">
            <IoLogOut size={20} />
            </span>
            <span className="origin-left duration-100">
                Logout
            </span>
           
            </div>}
           </li>
        </ul>

      </div>

    </div>
  )  
};

export default Sidebar;
