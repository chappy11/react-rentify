import React, { useCallback, useEffect, useState } from 'react'
import { getAdminIncome } from '../services/UserSubscription.service'
import dayjs from 'dayjs';

export default function useGetAdminIncome() {
    const [data,setData] = useState<any[]>();
    const [graphData,setGraphData] = useState<number[]>([])
    const sendRequest = useCallback(
      async() => {
        try {
            const resp = await getAdminIncome();
            let containerArr:number[] = []
            Array.from({ length: 12 }, (_, index) => index).forEach(number => {
                const filterData = resp.data.filter((el:any)=>{
                    const monthNumber = dayjs(el.sub_created).month();

                    return number == monthNumber;
             });
             console.log(filterData)
             let total:number = 0;
                filterData.forEach((element:any) => {
                    total+=parseFloat(element.price)
                });

               
                containerArr.push(total);
              });

              setGraphData(containerArr)
            setData(resp.data)
        } catch (error) {
            console.log(error)
        }
      },
      [],
    )
    
    useEffect(() => {
      sendRequest();
    }, [])
    
  
    return {
        data,
        sendRequest,
        graphData
    }
}
