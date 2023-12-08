'use client';
import { useMemo, useState } from 'react';

import { TextInput, Button, ImageInput } from '../../../component';
import { dataIsRequired } from '../../../constant/String';
import useAlertOption from '../../../hooks/useAlertOption';
import { updateToOwner } from '../../../services/UserService';

import Swal from 'sweetalert2';
import { Routes } from '../../../types/Routes.enum';
import useGetAccountFromStorage from '../../../hooks/useGetAccountFromStorage';
export default function RegisterOwner() {
  const [img,setImg] = useState<any>(null);
  const [docsType,setDocsType] = useState<string>('');
  const {alertWarning,alertError,} = useAlertOption();
  const {user:account} = useGetAccountFromStorage();
  
  const displayImage = useMemo(()=>{
    if(!img){
        return(
            <div className=' h-32 w-32 bg-slate-400'/>
        );
    }

    return (
        <img className=' h-32 w-32' src={URL.createObjectURL(img)}/>
    );
  },[img])
  
  async function updateUserStatus(user:any){
    const payload = {
      ...user,user_status:3
    }

    const stringData = JSON.stringify(payload)
    localStorage.setItem('account',stringData)
  }
  async function handleSubmit(){
    try {
        const user = await localStorage.getItem('account');
       
        if(!user){
            return;
        }
        const userInfo = JSON.parse(user)
        if(!img){
            alertWarning(dataIsRequired('Image'));
            return;
        }

        if(!docsType){
            alertWarning(dataIsRequired("Document Type"));
            return;
        }

        let formdata = new FormData();
        formdata.append('docs',img);
        formdata.append('documentType',docsType);
        formdata.append('userId',userInfo.user_id);
        
        const resp = await updateToOwner(formdata);

        const {status,data,message} = resp.data;
    
        if(status!==1){
            alertError();
            return;
        }

        const respData = JSON.stringify(data);
        localStorage.setItem('account',respData);
        Swal.fire({
          icon:'success',
          title:'Success Requested',
          text:'Please wait for admin to accept your request'
        }).then(e=>{
          if(e.isConfirmed){
            updateUserStatus(userInfo)
            window.location.href=Routes.HOME
          }
        })
    
    } catch (error) {
     alertError();   
    }
  }

  const onChangePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(e.target.files[0]);
    }
  };
  console.log("IMAGE",img); 
  return (
    <div className=' pt-28 flex justify-center items-center mb-14'>
        <div className=' bg-white w-1/2 p-8'>
          {account?.user_type === 'RENTER' && account?.user_status?.toString() === '3' ? (
            <div>
             <h1 className=' text-lg font-bold text-center'>Please wait for admin accept your request</h1>
           </div>
          ):(
            <div>
            <h1 className=' font-bold text-xl'>Become Vehicle Owner</h1>
              <div className=' h-10'/>
              {/* <div className=' flex justify-center'>
                  {displayImage}
              </div>
            
              <input className=' ' type='file' onChange={(e)=> setImg(e?.target?.files?.[0])}/> */}
              <div className=' flex justify-center'>
                <ImageInput onChange={(e)=>onChangePic(e)} image={img}/>
              </div>
             
              <div className=' h-10'/>
              <TextInput label='Document Type' onChange={(e)=>setDocsType(e.target.value)}/>
              <div className=' h-10'/>
              
              <div className=' flex flex-row gap-5'>
                <Button text='Submit' onClick={()=>handleSubmit()}/>
                <Button text='Back' onClick={() => window.location.href=Routes.HOME} />
              </div>
  
        </div>
          )}
         </div>
    </div>
  )
}
