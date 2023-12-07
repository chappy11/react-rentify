import { useRef, useState } from "react";
import { } from 'react-icons';
import { MdClose } from "react-icons/md";
import { Button } from "../../../../component";

type Props ={
    email:string;
    mobileNumber:string;
    verficationCode:string;
    setIsOpen:(isOpen:boolean)=>void;
    alert:any
    handleRegister:()=>void;
}

export default function UserVerification(props:Props) {
    const {email,verficationCode,setIsOpen,alert,handleRegister} = props;
    const ref = useRef<any>(null)
    const [code,setCode] = useState<string>("");
    console.log(code);

    async function handleConfirm(){
      if(verficationCode.toString() !== code){
        alert?.alertWarning("Invalid Code");
        return;
      }

      await handleRegister();
    }

    return (
    <div className=' w-full' onClick={()=>ref.current?.focus()}>
        <div className=" w-full flex flex-row">
            <div className=" flex flex-1">
                <h1 className=" font-bold">Verificaton</h1>
            </div>
            <div className=" flex flex-1 justify-end">
                <span className="" onClick={()=>setIsOpen(false)}><MdClose className=" text-2xl hover:text-red-400 text-red-500" /></span>
            </div>
        </div>
   
    <p className=' mt-10 text-center'>
        We sent 6  digit code to your email <span className=" text-red-500">{email}</span>
    </p>
    <div className=' h-10'/>
    <div className=" flex w-full flex-row justify-center gap-5">
        <div className=" border-b border-b-slate-400 p-3 text-lg font-bold">
            {code?.[0]}
        </div>
        <div className=" border-b border-b-slate-400 p-3 text-lg font-bold">
            {code?.[1]}
        </div>
        <div className=" border-b border-b-slate-400 p-3 text-lg font-bold">
            {code?.[2]}
        </div>
        <div className=" border-b border-b-slate-400 p-3 text-lg font-bold">
            {code?.[3]}
        </div>
        <div className=" border-b border-b-slate-400 p-3 text-lg font-bold">
            {code?.[4]}
        </div>
        <div className=" border-b border-b-slate-400 p-3 text-lg font-bold">
            {code?.[5]}
        </div> 
    </div>
    <input className=' text-transparent outline-none' ref={ref} autoFocus onChange={(e)=>setCode(e.target.value)} value={code} maxLength={6}/>
    <div className=" h-10"/>
    <div className=" w-full flex justify-center">
        <div className=" w-1/4">
            <Button text="Confirm" onClick={()=>handleConfirm()}/>
        </div>

    </div>
</div>
  )
}
