import React, { useState } from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePickers from "./DatePicker"
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { useForm } from 'react-hook-form';
import { BookValid } from "@/validation/BookValid"
import { BeatLoader } from "react-spinners"
import { PayThunk } from "@/Redux/action/Pay"
 
export default function CardForm({PropertyId}) {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
});
const dispatch = useDispatch();
const { 
  register, 
  handleSubmit, 
  setValue, formState: { errors } } = useForm({
  resolver: yupResolver(BookValid),
});

const formatToYYYYMMDD=(dateString)=> {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const submit=(data)=>{
  const start = formatToYYYYMMDD(selectionRange.startDate)
  const end = formatToYYYYMMDD(selectionRange.endDate)

const cleanData = {
  ...data,
  PropertyId,
  VisitDate: `${start}_${end}`

}
console.log(cleanData)
dispatch(PayThunk(cleanData))
}

const { loadz,error} = useSelector((state)=>state.Pay)
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Appointment</CardTitle>
        <CardDescription>Book the period you will visit</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="VisitorName">Name</Label>
              <Input id="VisitorName" {...register("VisitorName")} placeholder="Your name" type="text"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="VisitorEmail">E-mail</Label>
              <Input id="VisitorEmail" {...register("VisitorEmail")} type="email" placeholder="Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="">Stay Period</Label>
               <DatePickers selectionRange={selectionRange} setSelectionRange={setSelectionRange}/>
            </div>
          </div>
          <CardFooter className="flex justify-between">
        <Button className="w-[40%] mx-auto text-center z-50">
        {
              loadz? (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
                  <BeatLoader color="white" loading={loadz} size={10}/>
                </div>
              ):(
                "Book"
              )
             }

        </Button>
      </CardFooter>
        </form>
      </CardContent> 
    </Card>
  )
}