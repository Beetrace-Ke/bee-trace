import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

const CreateProperty=async(Property)=>{ 
  return  await window.canister.PropeonCanister.CreateProperty(Property)
}

const  GetAllProperty=async()=>{ 
  return  await window.canister.PropeonCanister.GetAllProperty()
}
const GetOneProperty=async(id)=>{ 
  return  await window.canister.PropeonCanister.GetOneProperty(id)
}

const getMyProperty=async()=>{ 
  return  await window.canister.PropeonCanister.getMyProperty()
}


// Booking endpoints

const Book=async(payload)=>{
  return await window.canister.PropeonCanister.Book(payload)
}

const BookByProperty=async(ProductId)=>{
  return await window.canister.PropeonCanister.BookByProperty(ProductId)
}
const MyBooking=async()=>{
  return await window.canister.PropeonCanister.MyBooking()
}


const confirmBook=async(payload)=>{
  console.log(payload)
  return await window.canister.PropeonCanister.confirmBook(payload)
}
const verifyPayment=async(payload)=>{
  return await window.canister.PropeonCanister.verifyPayment(payload)
}

const getAddressFromPrincipal=async(payload)=>{
  return await window.canister.PropeonCanister.getAddressFromPrincipal(payload)
}



const Pay=async(payload)=>{
  const pendingBooking = await Book(payload)
  console.log(pendingBooking,"pendingBooking")

  if(pendingBooking.Err){
    console.error(pendingBooking.Err)
    return;
  }
   const  receiverPrincipal = Principal.from(pendingBooking.Ok.Owner);
   const receiverAddress = await getAddressFromPrincipal(receiverPrincipal);

   
   const block = await transferICP(
    receiverAddress,
    BigInt(pendingBooking.Ok.Amount),
    pendingBooking.Ok.memo
   )
  
  
  return await confirmBook({
    Receivor:receiverPrincipal,
    Amount:BigInt(pendingBooking.Ok.Amount),
    block,
    memo:pendingBooking.Ok.memo})

}
export { 
  CreateProperty,
  GetAllProperty,
  GetOneProperty,
  getMyProperty,

  Book,
  confirmBook,
  BookByProperty,
  MyBooking,

  verifyPayment,
  getAddressFromPrincipal,
  Pay

}



