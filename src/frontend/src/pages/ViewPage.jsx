import React, { useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { GiBathtub } from "react-icons/gi";
import { FaParking } from "react-icons/fa";
import MyIcon from '@/components/Mycomponent/MyIcon';
import CardForm from '@/components/Mycomponent/FormCard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { GetOnePropertyThunk } from '@/Redux/action/GetOneProperty';
import ReactQuill from 'react-quill';


const ViewPage = () => {
    const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate('/');
      } else {
        await dispatch(GetOnePropertyThunk(id));
      }
    };
    fetchData();
  }, [dispatch, id, navigate]);

  const {  loading, GetOneProperty,error} = useSelector((state)=>state.GetOneProperty)
    return (
    <>
    <div className="flex flex-col md:flex-row p-4 w-full sm:w-[75%] m-auto gap-8">
    {loading? (
        <div style={{textAlign: "center"}}>
         <p>Loading...</p>
    </div>
      ) : (!GetOneProperty || error) ? (
        <p>Property no available or reload</p>
      ) : (
        <>
        <div className="md:w-8/12 w-full">
                {/* Main Content */}
                <h1 className="text-2xl font-bold">{GetOneProperty.Title}</h1>
                <div className="w-full h-[40vh] mt-4">
                    <img
                        src={GetOneProperty.Image}
                        alt="Post Image"
                        className="object-cover w-full h-full rounded-lg"
                    />
                </div>
                <div className="w-full h-[10vh] flex  items-center justify-between">
                    <MyIcon
                    icon={ <FaBed />}
                    name="BedRoom"
                    data={GetOneProperty.Bedroom}
                    />
                    <MyIcon
                    icon={ <GiBathtub/>}
                    name="BathRoom"
                    data={GetOneProperty.Bathroom}
                    />
                    <MyIcon
                    icon={<FaLocationDot />}
                    name="Location"
                    data={GetOneProperty.Location}
                    />
                 <MyIcon
                    icon={ <FaParking/>}
                    name="Parking"
                    data={GetOneProperty.Parking?"YES":"NO"}
                    />
                    <hr/>
                    <br/>
                </div>
                <div className="w-full mt-4">
                    <p>
                    <ReactQuill value={GetOneProperty.Description}  readOnly={true} theme={"bubble"}/>
                    </p>
                  
                </div>
            </div>
            <div className="md:w-4/12 w-full">
                 <div className="rounded-lg p-4">
                    <CardForm PropertyId={GetOneProperty.id}/>
                </div>
            </div>
        </>
      )}            
        </div>
    </>
        
    );
};

export default ViewPage;
