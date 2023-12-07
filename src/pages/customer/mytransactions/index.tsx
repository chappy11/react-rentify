import React, { useMemo } from 'react'
import { Button } from '../../../component'
import useGetBookingByCustomerId from '../../../hooks/bookings/useGetBookingByCustomerId'
import TransactionCard from '../../owner/bookings/components/TransactionCard';
import { formatFullName } from '../../../utils/string';

export default function MyTransactions() {
  const {data} = useGetBookingByCustomerId();
  
  const displayData = useMemo(() => {
    if(!data){
        return;
    }

    return data.map((val:any,i:number)=>(
        <TransactionCard images={val.images} refId={val.ref_id} key={i.toString()} isRenter={false} description={val.description} image={val.vehicleImage} vehicleName={val.brand} ownerName={formatFullName({firstName:val.firstname,middleName:val.middlename,lastName:val.lastname})} price={val.amount}  />
    ))
  }, [data])
  
  return (
    <div className='pt-32 flex justify-center'>
        <div className="bg-white w-1/2 p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Booking List</h1>
              <div className="flex">
                <div>
                  <Button text='Back' onClick={() => window.history.back()} />
                </div>
              </div>
            </div>
            <div className="h-10" />
            {displayData}
        </div>
    </div>
  )
}
