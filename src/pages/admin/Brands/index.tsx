import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../../../component'
import useGetAllBrands from '../../../hooks/useGetAllBrands'
import { useModalContext } from '../../../context/ModalContext/ModalContext';
import AddBrand from './AddBrand';

export default function Brands() {
    const {data,sendRequest} = useGetAllBrands();
    const [isRefetch,setIsRefetch] = useState<boolean>(false);
    const {setContent,setIsOpen} = useModalContext(); 

    useEffect(() => {
        if(isRefetch){
            sendRequest();
            setIsRefetch(false)
        }
      }, [isRefetch])
      
      
    
      
      const handleOpen = () =>{
        setIsOpen(true)
        setContent(<AddBrand setIsOpen={setIsOpen} setIsRefetch={setIsRefetch}/>)
      }
    
    
  
    const displayData = useMemo(()=>{
        return data.map((val:any,i:number)=>{
            return (<tr className=" border-b border-b-slate-400">
                <td className=" p-3 text-center">{val.brand}</td>
                <td className=" p-3 text-center">{val.brandCreatedAt}</td>
            </tr>)
        })
      },[data])
      
    return (
        <div>
            <div className=" flex flex-row w-full">
                <div className=" flex flex-1">
                    <h1 className=" text-xl font-bold">Categories Management</h1>
                </div>
                <div className=" flex flex-1 items-end justify-end">
                    <div className=" w-1/4">
                       <Button text={"Add New Brand"} onClick={handleOpen}/>
                    </div> 
                </div>
            </div>
            <div className=" h-12"/>
            <table className=" min-w-full">
                <thead className=" bg-slate-300">
                    <tr className="">
                        <th className=" p-3">Brand Name</th>
                        <th className=" p-3">Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>
        </div>
      )
    
}
