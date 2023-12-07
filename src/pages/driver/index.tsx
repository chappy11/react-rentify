import React, { useMemo } from 'react'
import { Container } from '../../component'

import useGetBookingByDriverId from '../../hooks/bookings/useGetBookingByDriverId';
import TransactionCard from '../owner/bookings/components/TransactionCard';
import { formatFullName } from '../../utils/string';

export default function Driver() {
const {data} = useGetBookingByDriverId({isSuccess:'0'});

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
