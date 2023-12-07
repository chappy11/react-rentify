import React from 'react'
import { Button, ListItem } from '../../../../../component';
import { configVariable } from '../../../../../constant/ConfigVariable';

type Props ={
    data:any
}

export default function Details(props:Props) {
    const {data} =  props;
  return (
    <div className=' w-full'>
        <div className="flex justify-between items-center mb-3">
        <h1 className=' font-bold text-lg'>Driver Details</h1>
            <div>
                <Button text='Back' onClick={() => window.history.back()} />
            </div>
        </div>
        <div className=' flex w-full justify-center items-center'>
            <img src={configVariable.BASE_URL+data?.driver_pic} className=' w-32 h-32' alt='pic'/>
        </div>
        <ListItem label="Firstname" value={data?.firstName}/>
        <ListItem label="Middlename" value={data?.middleName} />
        <ListItem label="Lastname" value={data?.lastName} />
        <ListItem label="Contact Number" value={data?.contactNumber} />
        <div className=' mt-10 flex w-full justify-center items-center'>
            <img src={configVariable.BASE_URL+data?.driver_license} className=' w-32 h-32' alt='pic'/>
        </div>
    </div>
  )
}
