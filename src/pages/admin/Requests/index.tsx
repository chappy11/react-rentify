import React, { useCallback, useMemo, useState } from 'react'
import useGetUserByStatus from '../../../hooks/user/useGetUserByStatus'
import { formatFullName } from '../../../utils/string'
import ViewRequest from './ViewRequest';
import { useModalContext } from '../../../context/ModalContext/ModalContext';
import { approvedRequest } from '../../../services/UserService';
import Swal from 'sweetalert2';
export default function Requests() {
    const {data} = useGetUserByStatus({status:'3'})
    const {setContent,setIsOpen,setSize} = useModalContext();

    const handleAccept = useCallback(async(userId:string)=>{
        try {
          
            const resp = await approvedRequest(userId);
            
            if(resp.status.toString() === '1'){
                Swal.fire({
                    icon:'success',
                    title:'Successfully Approved',
                }).then((val)=>{
                    if(val.isConfirmed){
                        window.location.reload();
                    }
                })
            }
        } catch (error) {
            
        }
    },[])

    const viewInfo = (request:any) =>{
        return(
          <ViewRequest data={request} onAccept={()=>handleAccept(request.user_id)} onClose={()=>setIsOpen(false)}/>
        );
    }

    function handleClick(val:any){
        setIsOpen(true);
        setContent(viewInfo(val));
        setSize(800);
    }   
    const displayData = useMemo(()=>{
        if(data.length < 1){
            return (<div className=' w-full bg-red-400a'>
                <p className=' text-center font-bold my-20'>No data found</p>
                </div>)
        }
    
        return data.map((val:any,i:number)=>(
            <tr>
                <td className='py-2 px-4 text-center'>{val.user_id}</td>
                <td className='py-2 px-4 text-center'>{formatFullName({firstName:val?.firstname,middleName:val?.middlename,lastName:val?.lastname})}</td>
                <td className='py-2 px-4 text-center'>{val.email}</td>
                <td className='py-2 px-4 text-center'>{val.mobileNumber}</td>
                <td className='py-2 px-4 text-center'><button className=' text-blue-600 hover:text-blue-400' onClick={()=>handleClick(val)}>View</button></td>
                <td className='py-2 px-4 text-center'><button className=' text-white bg-green-600 hover:bg-green-500 py-2 px-4 rounded-md' onClick={()=>handleAccept(val.user_id)}>Accept</button></td>
            </tr>
        ))

    },[data,handleAccept]);

    console.log(data);
    return (
    <div className=' w-full'>
        <h1 className=' text-lg font-bold'>Request To Become Owner</h1>
        <div className=' h-10'/>
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className='py-2 px-4'>User Id</th>
                    <th className='py-2 px-4'>Name</th>
                    <th className='py-2 px-4'>Email</th>
                    <th className='py-2 px-4'>Mobile Number</th>
                    <th className='py-2 px-4'>Action</th>
                    <th className='py-2 px-4'></th>
                </tr>
            </thead>
            <tbody>
                {displayData}
            </tbody>
        </table>
    </div>  
  )
}
