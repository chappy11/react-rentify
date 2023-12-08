import { useMemo } from "react";
import { Button } from "../../../component";
import useGetDriversByOwner from "../../../hooks/drivers/useGetDriversByOwner";
import { Routes } from "../../../types/Routes.enum";
import { formatFullName } from "../../../utils/string";
import { configVariable } from "../../../constant/ConfigVariable";


export default function Drivers() {
    const {data} = useGetDriversByOwner();
  
    const displayDrivers = useMemo(() => {
        return data?.map((val:any,i:number)=>(
            <div className=" border-b py-5 px-3 border-b-slate-400 flex flex-row">
                <div className=" p-3 flex flex-1 flex-col">
                    <p className=" font-bold">{formatFullName({firstName:val.firstName,middleName:val.middleName,lastName:val.lastName})}</p>
                    <p><span className=" font-bold mr-5">Username:</span>{val.username}</p>
                    <p><span className=" font-bold mr-5">Contact No.:</span>{val.contactNumber}</p>
                    <button className=" w-fit mt-5 py-2 px-3 bg-slate-300 text-blue-700" onClick={()=>window.location.href=Routes.DRIVER+"/"+val.driver_id}>View</button>
                </div>
                <div className="">
                    <img src={configVariable.BASE_URL+val.driver_pic} alt='driver' className=" h-28 w-28"/>
                </div>
               
            </div>
        ))
    }, [data]);

    return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <div className=' flex w-full '>
                <div className=' flex flex-1 items-center'>
                    <h1 className=" font-bold text-lg">My Drivers</h1>
                </div>
                <div className=' flex flex-1 gap-3'>
                    <Button text='Add Driver'  onClick={()=>window.location.href=Routes.CREATE_DRIVER}/>
                    <Button text='Back' onClick={() => window.location.href=Routes.HOME} />
                </div>
            </div>
            <div className=" h-10"/>
            {displayDrivers}
        </div>
    </div>
  )
}
