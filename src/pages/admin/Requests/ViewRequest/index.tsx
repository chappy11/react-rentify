import React from 'react'
import { Button, ListItem } from '../../../../component';
import { formatFullName } from '../../../../utils/string';
import { configVariable } from '../../../../constant/ConfigVariable';
import { text } from 'stream/consumers';

type Props = {
    data:any;
    onClose:()=>void;
    onAccept:()=>void;
}

export default function ViewRequest(props:Props) {
  const {data,onClose,onAccept} = props;
    return (
    <div className=' w-full h-full overflow-y-auto '>
        <div className=' '>
            <div className=' '>
        <h1 className=' font-bold text-lg p-5'>Request Info</h1>
        <div className=' px-8 mt-14'>
            <ListItem label='Username' value={data.username}/>
            <ListItem label='Name' value={formatFullName({firstName:data.firstname,middleName:data.middlename,lastName:data.lastname})}/>
            <ListItem label='Email' value={data.email}/>
            <ListItem label='Mobile Number' value={data.mobileNumber}/>
            <ListItem label='Gender' value={data.gender}/>
            <ListItem label='Birthdate' value={data.birthdate}/>
            <ListItem label='Address' value={data.address}/>
            <div className=' h-10'/>
            <h3 className=' font-bold mb-10'>Document</h3>
            <div className=' w-full justify-center items-center flex'>
                <img src={configVariable.BASE_URL+data.documentImage} className=' w-56 h-52' alt='document' onClick={()=>window.open(configVariable.BASE_URL+data.documentImage)}/>
            </div>

            <div className=' flex flex-row gap-6 my-5'>
                <Button onClick={onAccept} text="Accept"/>
                <Button onClick={()=>onClose()} text="Close" outline={true}/>
            </div>
        </div>     
        </div>
        </div>       
    </div>
  )
}
