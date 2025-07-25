import React, { useEffect, useMemo, useState } from "react";
import BuildingCard from "./Card";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPropertyThunk } from "@/Redux/action/GetAllProperty";


const Listing=()=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(10);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(GetAllPropertyThunk());
    }, [dispatch]);


    const  {  loads,GetAllProperty,errorz } = useSelector((state)=>state.GetAllProperty)
    const currentProperty = useMemo(() => {
      if (GetAllProperty) {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return GetAllProperty.slice(indexOfFirstPost, indexOfLastPost);
      }
      return [];
    }, [GetAllProperty, currentPage, postsPerPage]);
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return(
        <div className="w-full lg:w-3/4  m-auto ">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-black text-center">Your Text here</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {loads?(
                <div className="text-center">
                    <p>Loading ....</p></div>
                    ):(currentProperty?.length  === 0|| errorz)?(
             <div style={{textAlign: "center"}}>
             <p>No Property</p>
       </div>
           ):(
            currentProperty.map((item)=>(
                <BuildingCard id={item.id} title={item.Title} Description={item.Description} PricePerVisit={item.PricePerVisit} Image={item.Image} key={item.id}/>
            ))
           )
           }
            </div>
            <Pagination
            cardsPerPage ={postsPerPage}
            totalCards={GetAllProperty?.length} 
            paginate={paginate} 
           />
        </div>
    )
}

export default Listing