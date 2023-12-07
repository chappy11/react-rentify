import React, { useCallback, useEffect, useState } from 'react'
import { getBookingByStatus, getSuccessTransactions } from '../../services/BookingsService.service';
import { getDataFromStorage } from '../../utils/storage';
import useAlertOption from '../useAlertOption';
import dayjs from 'dayjs';

export default function useGetSuccessTransactions() {
    const [data,setData] = useState<any>([]);
    const [incomePerMonth,setIncomePerMonth] = useState<number[]>([]);
    const [totalIncome,setTotalIncome] = useState<number>(0);
 
    const {alertError} = useAlertOption();

    const sendRequest = useCallback(
      async() => {
        try {
          const user = await getDataFromStorage('account');
            if(!user){
                return;
            }
            const response = await getSuccessTransactions(user.user_id,);
            let containerArr:number[] = []
            Array.from({ length: 12 }, (_, index) => index).forEach(number => {
                const filterData = response.data.filter((el:any)=>{
                    const monthNumber = dayjs(el.createdAt).month();

                    return number == monthNumber;
             });
             console.log(filterData)
             let total:number = 0;
                filterData.forEach((element:any) => {
                    total+=parseFloat(element.amount)
                });

               
                containerArr.push(total);
              });

              let incomeTotal = 0;
              response.data.map((e:any,i:number)=>{
                return incomeTotal+=parseFloat(e.amount)
              })


              setIncomePerMonth(containerArr);
              setTotalIncome(incomeTotal);
            setData(response.data);
        } catch (error) {
            alertError();
        }
      },
      [],
    )
    
  
    useEffect(() => {
      sendRequest();
    }, [])
    
    return {
       data,
       incomePerMonth,
       totalIncome 
    }

}
