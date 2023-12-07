import React, { useMemo } from 'react'
import { Container } from '../../../component'
import TransactionCard from '../../owner/bookings/components/TransactionCard';
import useGetBookingByDriverId from '../../../hooks/bookings/useGetBookingByDriverId';
import { formatFullName } from '../../../utils/string';

export default function TransactionHistory() {
    const {data} = useGetBookingByDriverId({isSuccess:'1'});
    const displayData = useMemo(() => {
        if(!data){
            return <p>No Data found</p>;
        }
    
        return data.map((val:any,i:number)=>(
            <TransactionCard  images={val.images} refId={val.ref_id} key={i.toString()} isRenter={true} description={val.description} image={val.vehicleImage} vehicleName={val.brand} ownerName={formatFullName({firstName:val.firstname,middleName:val.middlename,lastName:val.lastname})} price={val.amount}  />
        ))
    }, [data])
  return (
    <Container>
        <div className=' w-full flex justify-center'>
            <div className=' bg-white w-1/2 p-5'>
                <p>
                    Bookings
                </p>
                {displayData}
            </div>
            
        </div>
    </Container>
  )
}
