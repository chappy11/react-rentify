import React, { useMemo } from 'react'
import { formatFullName } from '../../../../../utils/string';
import { reassigndriver } from '../../../../../services/BookingsService.service';
import useAlertOption from '../../../../../hooks/useAlertOption';

type Props = {
    driversList:any[];
    setSelectedDriver:(selectedDriver:any)=>void;
    setIsOpen:(isOpen:boolean)=>void;
    isReAssign:boolean;
    refId:string;
}


export default function DriverModal(props:Props) {
    const {driversList,setSelectedDriver,setIsOpen,isReAssign,refId} = props;
    const {alertError,alertSuccess} = useAlertOption();
    async function handleSelect(val:any){
        
        setSelectedDriver(val);
        setIsOpen(false)
    }


    async function handleReassign(val:any){
        try {
            const payload = {
                driver_id:val.driver_id,
                refId:refId
            }
            const resp = await reassigndriver(payload);
            console.log(resp);
            if(resp.status.toString() === '1'){
                setIsOpen(false);
                alertSuccess('Successfully Re assigned')
            }
        } catch (error) {
            alertError()
        }
    }
    const displayDriver = useMemo(() => {
        return driversList?.map((val:any,i:number)=>(
            <div className=" w-full border-b border-b-slate-300 py-3 px-5 flex flex-row bg-slate-200">
                <div className=" flex flex-1 flex-col">
                    <p className=" text-lg font-bold">{val.username}</p>
                    <p>{formatFullName({firstName:val.firstName,middleName:val.middleName,lastName:val.lastName})}</p>
                </div>
                <div className=" flex items-center">
                    <button className=" py-2 px-3 rounded-md bg-green-500 text-white" onClick={()=>handleSelect(val)}>Assign This Driver</button>
                </div>
            </div>
        ))
    }, [])
    return (
    <div className=' w-[600px] overflow-y-auto p-5'>
        <h1>Driver's List</h1>
        {displayDriver}
    </div>
  )
}
