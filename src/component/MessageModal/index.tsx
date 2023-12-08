
import React, { useState } from 'react';
import { Button } from '..';
import { getDataFromStorage } from '../../utils/storage';
import { createConvo } from '../../services/Convo.service';
import useAlertOption from '../../hooks/useAlertOption';
import Swal from 'sweetalert2'

type Props = {
    vehicle:any;
    setIsOpen:(isOpen:boolean)=>void;
}

export default function MessageModal(props:Props) {
    const [message,setMessage] = useState<string>('');
    const {alertSuccess,alertError} = useAlertOption();

    async function handleSend(){
        try {
        const user = await getDataFromStorage('account');
        if(!props.vehicle){
            return;
        }
        if(!user){
            return;
        }

        const senderType = user.user_type ? user.user_type : 'DRIVER';

        const payload = {
            owner_id:props.vehicle.user_id,
            renter_id:user.user_id,
            isDriver:0,
            driver_id:0,
            sender_type:senderType,
            message,
        }
        
        const resp = await createConvo(payload)

        if(resp.status.toString() === '1'){
            Swal.fire({
                text:'Successfully Sent',
                icon:'success'
            }).then(res=>{
                if(res.isConfirmed){
                    props.setIsOpen(false)
                    setMessage('')
                }
            })
            
            return;
        }

             alertError();    
        } catch (error) {
            alertError();
        }
        
    }
  return (
    <div className=' w-[500px]'>
        <h1 className=' font-bold text-lg '>Message Owner</h1>
        <div className=' w-full mt-10'>
            <input className=' w-full bg-gray-100 border border-gray-200 outline-none rounded-2xl p-3' placeholder='Message' onChange={(e)=>setMessage(e.target.value)}/>
            <div className=' h-10'/>
            <Button text='Send' onClick={()=>handleSend()}/>
            <div className=' h-5'/>
            <Button text='Close' onClick={()=>props.setIsOpen(false)} outline/>
        </div>
    </div>  
  )
}
