import React from 'react'
import useAlertOption from '../../../../../hooks/useAlertOption';
import Swal from 'sweetalert2';
import { Routes } from '../../../../../types/Routes.enum';

type Props = {
    icon:any;
    title:string;
    redirect:string;
    subscription:any;
}

export default function CardOptions(props:Props) {
    const {alertError} = useAlertOption();

    function handleRedirect(){
        if(!props.subscription){
           Swal.fire({
            icon:'warning',
            text:'You have no subscription'
           }).then(res=>{
            if(res.isConfirmed){
                window.location.href=Routes.SUBSCRIPTION
            }
           });
           return;
        }

        if(props.subscription.usersub_status === 'EXPIRED'){
            Swal.fire({
                icon:'warning',
                text:'Youre subscription is expired'
               }).then(res=>{
                if(res.isConfirmed){
                    window.location.href=Routes.SUBSCRIPTION
                }
               });
               return;
        }
        window.location.href=props.redirect
    }
  
    return (
    <div className=' bg-white p-5 flex rounded-md cursor-pointer hover:border hover:border-slate-600' onClick={handleRedirect}>
        <div className=' px-5'>
                <img src={props.icon} alt='driver icon' className=' h-28 w-24'/>
        </div>
        <div className=' flex flex-1'>
            <h1 className=' font-bold'>{props.title}</h1>
        </div>
    </div>
  )
}
