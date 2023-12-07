import React from 'react'
import { Button, ListItem } from '../../../../../component'
import { configVariable } from '../../../../../constant/ConfigVariable'

type Props = {
    data:any
}


export default function Details(props:Props) {
    const {data:item} = props;
    return (
    <div className=" w-ful ">
        <div className="flex justify-between items-center mb-3">
        <h1 className=" text-lg font-bold">Vehicle Details</h1>
            <div>
                <Button text='Back' onClick={() => window.history.back()} />
            </div>
        </div>
        <div className=" h-10"/>
        <div className=" grid grid-cols-3 gap-3 m-auto w-3/4">
            {item?.images.map((val:any,i:number)=>{
                return <img src={configVariable.BASE_URL+ val.path} className=" w-24 h-24" alt="gg"/>
            })}
        </div>
        <div className=" h-10"/>
        <ListItem label="Vehicle Brand" value={item?.brand}/>
        <ListItem label="Vehicle Description" value={item?.description}/>
        <ListItem label="Vehicle Type" value={item?.vehicle_type}/>
        <ListItem label="Vehicle Model" value={item?.model}/>
        <ListItem label="Vehicle Capacity" value={item?.capacity+'kg'}/>
        <ListItem label="Price" value={item?.price+" per km"}/>
        <div className=" h-10"/>
        <h1 className=" font-bold">Documents</h1>
        <div className=" mt-10 flex flex-row justify-center">
            <img src={configVariable.BASE_URL + item?.vehicleOr} alt="OR" className=" w-32 h-32"/>
            <img src={configVariable.BASE_URL + item?.vehicleCr} alt='Cr' className=" h-32 w-32"/>
        </div>
        <div className=" h-5"/>
        {/* <Button text="Okay" onClick={()=>setIsOpen(false)}/> */}
    </div>

  )
}
