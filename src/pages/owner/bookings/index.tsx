import { useMemo } from "react";
import useGetBookingsByStatus from "../../../hooks/bookings/useGetBookingsByStatus";
import TransactionCard from "./components/TransactionCard";
import { Button } from "../../../component";
import { Routes } from '../../../types/Routes.enum';

export default function Bookings() {
    const {data} = useGetBookingsByStatus({status:'PENDING'});
    const displayData = useMemo(()=>{
    
      return data.map((data:any,i:number)=>{
          const ownerName = data.firstname+" "+data.middlename+" "+data.lastname;
          return <TransactionCard images={data.images} refId={data.ref_id} key={i.toString()} description={data.description} image={data.vehicleImage} vehicleName={data.brand} ownerName={ownerName} price={data.amount}  />
      })
      },[data]);

    return (
        <div className='pt-32 flex justify-center'>
        <div className="bg-white w-1/2 p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Pending Booking</h1>
              <div className="flex">
                <div>
                <Button text='Back' onClick={() => window.location.href=Routes.HOME} />
                </div>
              </div>
            </div>
            <div className="h-10" />
            {displayData}
        </div>
    </div>
  )
}
