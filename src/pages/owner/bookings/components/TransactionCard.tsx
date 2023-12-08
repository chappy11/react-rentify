

import { useMemo } from "react";
import { Button } from "../../../../component";
import { configVariable } from "../../../../constant/ConfigVariable";
import { Routes } from "../../../../types/Routes.enum";


export type Props = {
    refId:string;
    image:string;
    vehicleName:string;
    ownerName:string;
    price:string;
    description:string;
    isRenter?:boolean;
    images:any[];
}



export default function TransactionCard
(props:Props) {
    const {image,vehicleName,ownerName,price,description,refId,isRenter,images} = props;

    const displayName = useMemo(() => {
        if(!isRenter){
            return 'Owner Name';
        }
    
        return 'Renter Name';
    }, [isRenter])
  
    return (
    <div className=' border-b border-b-gray-500 w-full flex flex-row bg-[whitesmoke]'>
        <div className=' flex flex-1'>
            <div className=' px-10 py-5'>
                <h1 className='  font-bold text-lg'>{refId}</h1>
                <h1 className='  mt-5 text-lg'>{vehicleName}</h1>
                <h2 className=' '>{description}</h2>
                <p> &#x20B1; {price}</p>
                <p className=' font-bold '>{displayName} : <span className=' font-semibold'>{ownerName}</span></p>
                <div className=' h-5'/>
                <Button text={'View Transaction'} onClick={()=>window.location.href=`${Routes.BOOKING}/${refId}`}/>
            </div>
            <div className="  flex flex-1 justify-end items-end">
                <img src={configVariable.BASE_URL+images?.[0]?.path} alt="wew" className=' h-[250px] w-[250px]'/>
            </div>
        </div>
    </div>
  )
}
