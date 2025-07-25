
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"

export default function BuildingCard({id,title,Image, Description, PricePerVisit}) {
  const navigate = useNavigate();
    const goToDetails=()=>{
        navigate(`Property/${id}`)
    }
  return (
    <Card className="w-full ">
      <div className="grid gap-4 p-4">
        <img
          src={Image}
          alt="Product image"
          width="400"
          height="560"
          className="aspect-video overflow-hidden rounded-lg object-cover"
        />
        <div className="grid gap-1.5">
          <h3 className="font-semibold text-base">{title}</h3>
          {/* <p className="font-semibold text-sm">{Description}</p> */}
          <p className="font-bold text-lg">{PricePerVisit.toString()} ICP</p>
        </div>
        <Button size="sm" className="w-full" onClick={goToDetails}>
          View Property
        </Button>
      </div>
    </Card>
  )
}