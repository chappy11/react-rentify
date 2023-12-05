import React, { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../../services/UserService'
import dayjs from 'dayjs';

export default function useGetUserForByMonth() {
    const [data,setData] = useState<number[]>([]);
    
    const sendRequest = useCallback(async()=>{
        try {
            const resp = await getUsers();
            const responseData: any[] = resp.data;
            let containerArr:number[] = [];
            Array.from({ length: 12 }, (_, index) => index).forEach(number => {
                const filterData = responseData.filter((val)=>{
                    const monthNumber = dayjs(val.userCreated).month();

                    return number == monthNumber;
                });

                containerArr.push(filterData.length);
              });

              setData(containerArr)
        } catch (error) {
            
        }

    },[])
  

    useEffect(() => {
      sendRequest();
    }, [])
    
    return {
        data,
        sendRequest
    }
}
