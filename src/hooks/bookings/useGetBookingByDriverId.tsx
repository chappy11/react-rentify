import  { useCallback, useEffect, useState } from 'react'
import {  getDataByDriverId } from '../../services/BookingsService.service';
import { getDataFromStorage } from '../../utils/storage';

type Params = {
  isSuccess:string;
}


export default function useGetBookingByDriverId(params:Params) {
    const [data,setData] = useState<any[]>([]);
  
    const sendRequest = useCallback(
      async() => {
        try {
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }
            const response = await getDataByDriverId(user?.driver_id,params.isSuccess);


            setData(response.data);
        } catch (error) {
            
        }
      },
      [params],
    )

    useEffect(() => {
      sendRequest();
    }, [])
    
    
    return{
        data
  }
}
