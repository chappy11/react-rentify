import { useCallback, useEffect, useState } from 'react';
import { getuserbystatus } from '../../services/UserService';

type Params = {
    status:string
}

export default function useGetUserByStatus(params:Params) {
    const {status} = params
    const [data,setData] = useState<any[]>([]);
  
    const sendRequest = useCallback(async()=>{
        try {
            const resp = await getuserbystatus(status);

            setData(resp.data)

        } catch (error) {
            console.log('error')
        }

    },[status])

    useEffect(() => {
      sendRequest();
    }, [status])
    
    return {
        data,
        sendRequest
    }
}
