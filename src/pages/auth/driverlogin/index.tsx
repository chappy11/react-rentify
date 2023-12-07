
import { useState } from 'react';

import Swal from 'sweetalert2';
import { TextInput, Button } from '../../../component';
import useAlertOption from '../../../hooks/useAlertOption';
import { loginDriver } from '../../../services/DriverService.service';
import { Routes } from '../../../types/Routes.enum';

export default function DriverLogin() {
const [username,setUsername] = useState<string>('');
const [password,setPassword] = useState<string>('');
const {alertWarning,alertError} = useAlertOption();

async function handleLogin(){
    try {
        if(!username || !password){
            alertWarning('Please fill out all fields')
            return;
        }

        const payload = {
            username,
            password
        }
        const result = await loginDriver(payload)

        if(result.status?.toString() === '0'){
            alertError(result.message);
            return;
        }
        console.log("GG")
        const userData = await result.data;
        const stringData = JSON.stringify(userData)
         await localStorage.setItem('account',stringData);
         Swal.fire({
            icon:'success',
            title:'Success',
            text:'Successfully Login'
          }).then(e=>{
            if(e.isConfirmed){
              window.location.href=Routes.HOME
            }
          })
        } catch (error) {
        
    }
}
  return (
    <div className=" pt-32 flex flex-1  h-screen justify-center items-center">
        <div className=" bg-white w-1/2 p-8 rounded-md  shadow-md">
            <h1 className=" font-bold text-2xl">Welcome Driver</h1>
            <TextInput label="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            <div className=" h-5"/>
            <TextInput label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <div className=" h-6"/>
            <Button onClick={()=>handleLogin()} text="Sign In"/>
            <div className=" h-8"/>
            <p className=" text-center"><a href={Routes.HOME} className=" text-blue-600">Back to Home </a></p>
            
        </div>
    </div>  
  )
}
