import React, { useCallback, useEffect, useState } from 'react'
import { getBrands } from '../services/Brands.service'

export default function useGetAllBrands() {
    const [data,setData] = useState<any[]>([]);

  const sendRequest = useCallback(async()=>{
    const resp = await getBrands();

    setData(resp.data);
  },[])

  useEffect(() => {
    sendRequest();
  }, [])
  
  return {
    data,
    sendRequest
  }
}
