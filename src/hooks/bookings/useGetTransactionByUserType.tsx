import React, { useCallback, useEffect, useState } from 'react'
import { getDataFromStorage } from '../../utils/storage';
import { getBookingsByUserType } from '../../services/BookingsService.service';
import { BookingStatus } from '../../types/BookingStatus.enum';

export default function useGetTransactionByUserType() {
    const [pendingTransactions,setPendingTransactions] = useState<any[]>();
    const [onGoingTransactions,setOnGoingTransactions] = useState<any[]>();
    const [successTransactions,setSuccessTransactions] = useState<any[]>();
    const [declinedTransactions,setDeclinedTransactions] = useState<any[]>();
    
    const sendRequest = useCallback(async()=>{
        try {
            const user = await getDataFromStorage('account');

            if(!user){
                return;
            }
            const resp = await getBookingsByUserType(user.user_id,user.user_type);
            const includedTransactionOngoing = [BookingStatus.PICK_UP,BookingStatus.TO_PICK_UP,BookingStatus.ACCEPTED];
            const includedForError = [BookingStatus.DECLINED,BookingStatus.CANCELED];
            const ptransactions = resp?.data?.filter((e:any)=>e.status === 'PENDING');
            const onTransactions = resp?.data?.filter((e:any)=>includedTransactionOngoing.includes(e.status));
            const sTransactions = resp?.data?.filter((e:any)=>e.status === 'SUCCESS');
            const declinedT = resp?.data?.filter((e:any)=>includedForError.includes(e.status));

            setPendingTransactions(ptransactions);
            setOnGoingTransactions(onTransactions);
            setSuccessTransactions(sTransactions);
            setDeclinedTransactions(declinedT);

        } catch (error) {
            
        }
    },[])
    
    useEffect(() => {
      sendRequest();
    }, [])
    
    return {
        pendingTransactions,
        onGoingTransactions,
        successTransactions,
        declinedTransactions
  }
}
