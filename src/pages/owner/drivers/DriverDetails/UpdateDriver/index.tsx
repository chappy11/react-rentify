import React, { useState } from 'react'
import { Button, TextInput } from '../../../../../component';
import useAlertOption from '../../../../../hooks/useAlertOption';
import { updateDriverDetails } from '../../../../../services/DriverService.service';
import Swal from 'sweetalert2';
import { validateMobileNumber } from '../../../../../utils/InputValidation';

type Props = {
    data:any
    setIsUpdate:(isUpdate:boolean)=>void;
}

export default function UpdateDriver(props:Props) {
   const {data} = props;
   const [fname,setFname] = useState<string>('');
   const [mname,setMname] = useState<string>('');
   const [lname,setLname] = useState<string>('');
   const [contact,setContact] = useState<string>('');
   const {alertError} = useAlertOption();

   const containsSpecialCharacters = (input: string): boolean => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(input);
   };

   async function handleUpdate(){
    try {
        if (containsSpecialCharacters(fname) || containsSpecialCharacters(mname) || containsSpecialCharacters(lname) || containsSpecialCharacters(contact)) {
            Swal.fire({
                icon: 'error',
                text: 'Special characters are not allowed in the input fields.',
            });
            return;
        }

        if(!validateMobileNumber(contact) && contact !== ''){
            alertError("Mobile Number is Invalid");
            return;
        }
        const payload = {
            firstName:fname === '' ? data?.firstName : fname,
            middleName:mname === '' ? data?.middleName : mname,
            lastName: lname === '' ? data?.lastName : lname,
            contactNumber: contact === '' ? data?.contactNumber : contact
        }

        const resp = await updateDriverDetails(data?.driver_id,payload);

        if(resp?.status?.toString() === '1'){
            Swal.fire({
                icon:'success',
                text:'Successfully Updated'
            }).then(val=>{
                if(val.isConfirmed){
                    window.location.reload();
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
    <div>
        <h1>Update Details</h1>
        <div className=' h-10'/>
        <p className=' text-sm text-gray-600'>Firstname</p>
        <TextInput label="" placeholder={data?.firstName} onChange={(e)=>setFname(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Middlename</p>
        <TextInput label="" placeholder={data?.middleName} onChange={(e)=>setMname(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Lastname</p>
        <TextInput label="" placeholder={data?.lastName} onChange={(e)=>setLname(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Contact Number</p>
        <TextInput label="" placeholder={data?.contactNumber} onChange={(e)=>setContact(e.target.value)}/>
        <div className=' my-10 flex gap-5 flex-row'>
            <Button text='Update Details' onClick={handleUpdate} />
            <Button text='Back' outline onClick={()=>props.setIsUpdate(false)}/>
        </div>       
    </div>
  )
}
