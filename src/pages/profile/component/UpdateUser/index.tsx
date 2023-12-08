import { useState } from "react";
import { Button, TextInput } from "../../../../component";
import { UserDto } from "../../../../types/UserDto.type";
import { updateUserData } from "../../../../services/UserService";
import Swal from 'sweetalert2';
import { Routes } from "../../../../types/Routes.enum";
import useAlertOption from "../../../../hooks/useAlertOption";
import { validateMobileNumber } from "../../../../utils/InputValidation";
import { hasNumber } from "../../../../utils/string";

type Props = {
    user:UserDto
    setIsUpdate:(isUpdate:boolean)=>void;
}

export default function UpdateUser(props:Props) {
  const {user} = props;
  const [fname,setFname] = useState<string>('');
  const [mname,setMname] = useState<string>('');
  const [lname,setLname] = useState<string>('');
  const [mobile,setMobile] = useState<string>('');
  const {alertError,alertWarning} = useAlertOption();

  const containsSpecialCharacters = (input: string): boolean => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(input);

};

  async function handleUpdate(){
    try {

        if (containsSpecialCharacters(fname) || containsSpecialCharacters(mname) || containsSpecialCharacters(lname) || containsSpecialCharacters(mobile)) {
            Swal.fire({
                icon: 'error',
                text: 'Special characters are not allowed in the input fields.',
            });
            return;
        }

        if(hasNumber(fname)){
            alertError('Firstname should not include numbers');

            return;
        }

        
        if(hasNumber(mname)){
            alertError('Middlename should not include numbers');

            return;
        }

        if(hasNumber(lname)){
            alertError('Middlename should not include numbers');

            return;
        }

        if(!validateMobileNumber(mobile) && mobile !== ''){
            alertError("Mobile Number is Invalid")
            return;
        }
        const firstname = fname === '' ? user?.firstname : fname;
        const middlename = mname === '' ? user?.middlename : mname;
        const lastname = lname === '' ? user?.lastname : lname;
        const mobileData = mobile === '' ? user?.mobileNumber : mobile;
        
        const payload = {
            firstname:firstname,
            middlename,
            lastname,
            mobileNumber:mobileData
        }

        const resp = await updateUserData(user?.user_id,payload);

        if(resp.status.toString() === '1'){
            const saveData = JSON.stringify(resp?.data)
            await localStorage.setItem('account',saveData);
            Swal.fire({
                icon:'success',
                text:'Successfully Updated',
            }).then(val=>{
                if(val.isConfirmed){
                    window.location.href=Routes.PROFILE;
                }
            })
        }
    } catch (error) {
        alertError();
    }
   
  }
  return (
    <div className=" w-full">
        <TextInput label="" onChange={(e)=>setFname(e?.target?.value)} placeholder={user?.firstname} value={fname}/>
        <TextInput label="" onChange={(e)=>setMname(e?.target?.value)} placeholder={user?.middlename} value={mname}/>
        <TextInput label="" onChange={(e)=>setLname(e?.target?.value)} placeholder={user?.lastname} value={lname}/>
        <TextInput label="" onChange={(e)=>setMobile(e?.target?.value)} placeholder={user?.mobileNumber} value={mobile}/>
        <div className=" h-12"/>
        <div className=" flex flex-row gap-5">
            <Button text="Update Now" onClick={handleUpdate}/>
            <Button text="Cancel" onClick={()=>props.setIsUpdate(false)} outline/>
        </div>
       
        <div className=" h-10"/>
    </div>
 );
}