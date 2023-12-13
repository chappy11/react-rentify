import React, { useState } from 'react'
import { Button, TextInput } from '../../../../component'
import { createBrand } from '../../../../services/Brands.service';
import useAlertOption from '../../../../hooks/useAlertOption';


type Props = {
    setIsRefetch:(isRefetch:boolean)=>void;
    setIsOpen:(isOpen:boolean)=>void;
}

export default function AddBrand(props:Props) {
    const [brandName,setBrandName] = useState<string>('');
    const {setIsOpen,setIsRefetch} = props;
    const {alertSuccess,alertError} = useAlertOption();
    
    
    async function handleCreateBrand(){
        try {
            const payload = {
                brandName
            }
            const resp = await createBrand(payload);

            if(resp.status.toString() === '1'){
                alertSuccess('Successfully Created');
                setIsRefetch(true)
                setIsOpen(false)
                
                return;
            }

            alertError();
        } catch (error) {
            alertError();
        }
    }
    
    return (
    <div className=" w-[500px] h-full">
        <div className=' w-full flex flex-1 flex-col justify-center items-center  h-full'>
        <h1 className=" font-bold text-lg ">Add New Brand To List</h1>
    <div className=" h-5"/>
        <div className=' flex flex-1 w-full justify-center items-center'>
        <TextInput label="Brand Name" onChange={(e)=>setBrandName(e.target.value)} value={brandName} />
        </div>
        <div className=' flex flex-1'></div>
    <div className=" flex flex-row w-full gap-5">
        <Button text="Create" onClick={handleCreateBrand}/>
        <Button text="Close" onClick={()=>setIsOpen(false)} outline/>
    </div>

        </div>
  </div>
  )
}
