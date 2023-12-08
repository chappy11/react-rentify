import React, { useCallback, useMemo, useState } from 'react'
import useGetTransactionByUserType from '../../hooks/bookings/useGetTransactionByUserType';
import TransactionCard from '../../pages/owner/bookings/components/TransactionCard';
import { formatFullName } from '../../utils/string';

export default function TransactionTabs() {
    const [tabs,setTabs] = useState<number>(0);
    const {pendingTransactions,onGoingTransactions,successTransactions,declinedTransactions} = useGetTransactionByUserType();
    const tabsDesign = useCallback((tabNo:number) => {
        return tabNo == tabs ? ' border-b border-b-slate-800 p-5' : 'p-5'
    }, [tabs]);

    const displayTransactions = useMemo(() => {
        let arr:any[] = [];
        switch (tabs) {
            case 0:
                arr = pendingTransactions as unknown as any[];
                break;
            case 1:
                arr = onGoingTransactions as unknown as any[];
                break;
            case 2:
                arr = successTransactions as unknown as any[];
                break;
            case 3:
                arr = declinedTransactions as unknown as any[];
                break;
        
            default:
                break;
        }

        return arr?.map((val:any,i:number)=>(
            <TransactionCard images={val.images} refId={val.ref_id} key={i.toString()} isRenter={false} description={val.description} image={val.vehicleImage} vehicleName={val.brand} ownerName={formatFullName({firstName:val.firstname,middleName:val.middlename,lastName:val.lastname})} price={val.amount}  />
        ))
    }, [tabs]);
    return (
    <div className=' w-full '>
        <div className=' w-full  justify-between flex flex-row '>
            <div className={tabsDesign(0)} onClick={()=>setTabs(0)}>
                <p>Pending Transactions</p>
            </div>
            <div className={tabsDesign(1)} onClick={()=>setTabs(1)}>
                <p>On Going</p>
            </div>
            <div className={tabsDesign(2)} onClick={()=>setTabs(2)}>
                <p>Transaction History</p>
            </div>
            <div className={tabsDesign(3)} onClick={()=>setTabs(3)}>
                <p>Canceled</p>
            </div>
        </div>
        {displayTransactions}
    </div>
  )
}
