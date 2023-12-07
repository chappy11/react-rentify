import React, { useState } from 'react'
import { TextInput, Button, ImageInput } from '../../../../component';
import useAlertOption from '../../../../hooks/useAlertOption';
import useGetAccountFromStorage from '../../../../hooks/useGetAccountFromStorage';
import { createDriver } from '../../../../services/DriverService.service';
import Swal from 'sweetalert2';
import { Routes } from '../../../../types/Routes.enum';

export default function AddDriver() {
    const {user} = useGetAccountFromStorage();
    const [img,setImg] = useState<any>(null);
    const [license,setLicense] = useState<any>(null);
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [firstname,setFirstname] = useState<string>('');
    const [middlename,setMiddlename] = useState<string>('');  
    const [lastname,setLastName] = useState<string>('');
    const {alertError,alertWarning} = useAlertOption();
    const [contactNumber,setContactNumber] = useState<string>('');
    
    const onChangeText = (e:any,callback:(e:string)=>void) => {
        if(!e){
            return;
        }
        const value = e.target?.value;
        callback(value)
    }
    
    async function handleAddDriver(){
        try {
            if(!user){
                return;
            }

            if(isFieldNotValid()){
                return;
            }


            let formdata = new FormData();
            formdata.append('img',img);
            formdata.append('license',license);
            formdata.append('owner_id',user?.user_id);
            formdata.append('username',username);
            formdata.append('password',password);
            formdata.append('fname',firstname);
            formdata.append('mname',middlename)
            formdata.append('lname',lastname);
            formdata.append('contact',contactNumber);
            const result = await createDriver(formdata);

            if(result.status.toString() === '1'){
              Swal.fire({
                text:'Successfully Added',
                icon:'success'
            }).then(e=>{
                if(e.isConfirmed){
                    window.location.href=Routes.DRIVERS
                }
            })
                return;
            }

            alertError(result.message);
            
        } catch (error) {
            alertError();
        }
    }


    const isFieldNotValid = () =>{
        if(!img){
            alertWarning("Driver's Picture is Required");
            return true;
        }
        if(!username){
            alertWarning("Username is Required");
            return true;
        }

        if(!password){
            alertWarning("Password is Required");
            return true;
        }

        if(!firstname){
            alertWarning("Firstname is Required");
            return true;
        }

        if(!middlename){
            alertWarning("Middlename is Required");
            return true;
        }

        if(!lastname){
            alertWarning("Lastname is Required");
            return true;
        }

        if(!contactNumber){
            alertWarning("Lastname is Required");
            return true;
        }

        if(!license){
            alertWarning("License is Required");
            return true;
        }
      

        return false;
        
    }
  
    return (
    <div className=' w-full flex justify-center pt-32 mb-10'>
        <div className=' w-1/2 bg-white p-4'>
            <h1 className=' text-xl font-bold'>Create Driver</h1>
            <div className=' h-5'/>
                <div className=' flex justify-center items-center'>
                    <ImageInput onChange={(e)=>setImg(e.target?.files?.[0])} image={img}/>
                </div>
                <div className=' px-5'>
                <TextInput label='Username' value={username} onChange={(e)=>onChangeText(e,setUsername)}/>
                <div className=' h-5'/>
                <TextInput label='Password' value={password} type='password'  onChange={(e)=>onChangeText(e,setPassword)}/>
                <div className=' h-5'/>
                <TextInput label='Firstname' value={firstname}  onChange={(e)=>onChangeText(e,setFirstname)}/>
                <div className=' h-5'/>
                <TextInput label='Middlename' value={middlename}  onChange={(e)=>onChangeText(e,setMiddlename)}/>
                <div className=' h-5'/>
                <TextInput label='Lastname' value={lastname}  onChange={(e)=>onChangeText(e,setLastName)}/>
                <div className=' h-5'/>
                <TextInput label='Mobile Number' value={contactNumber}  onChange={(e)=>onChangeText(e,setContactNumber)} maxLength={11}/>
                <div className='h-10'/> 
                <h1>Driver's License</h1>
                <div className=' mt-5 justify-center items-center flex'>
                    <ImageInput onChange={(e)=>setLicense(e.target?.files?.[0])} image={license}/>
                </div>
                <div className=' h-10'/>
                <div className='flex gap-5'>
                    <Button text='Add This Driver' onClick={() => handleAddDriver()} />
                    <Button text='Back' onClick={() => window.history.back()} />
                </div>
            </div>
        </div>
    </div>
  )
}
