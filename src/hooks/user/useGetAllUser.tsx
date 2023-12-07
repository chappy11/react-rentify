import React, { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../../services/UserService';

export default function useGetAllUser() {
    const [data,setData] = useState<any[]>([]);

    const sendRequest = useCallback(async()=>{
        try {
            const resp = await getUsers();
            setData(resp.data);
        } catch (error) {
            console.log('error')
        }
    },[]);

    useEffect(() => {
      sendRequest();
    }, []);
    
  
    return {
    data,
    sendRequest
  }
}
