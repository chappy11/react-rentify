import React, { useMemo } from 'react'
import { Button } from '../../../component'
import useGetBookingByCustomerId from '../../../hooks/bookings/useGetBookingByCustomerId'
import TransactionCard from '../../owner/bookings/components/TransactionCard';
import { formatFullName } from '../../../utils/string';
import { Routes } from '../../../types/Routes.enum';
import TransactionTabs from '../../../component/TransactionTabs';

export default function MyTransactions() {
  const {data} = useGetBookingByCustomerId();
  
  
  
  return (
    <div className='pt-32 flex justify-center'>
        <div className="bg-white w-1/2 p-8">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Booking List</h1>
              <div className="flex">
                <div>
                  <Button text='Back' onClick={() => window.location.href=Routes.HOME} />
                </div>
              </div>
            </div>
            <div className="h-10" />
            <TransactionTabs/>
            {/* <div className=' w-full grid-cols-4 gap-2'>
              <div>
                <p></p>
              </div>
            </div>
            {displayData} */}
        </div>
    </div>
  )
}
