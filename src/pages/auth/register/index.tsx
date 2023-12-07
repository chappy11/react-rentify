
import Swal from 'sweetalert2';
import { TextInput, Select, Button } from '../../../component';
import useAlertOption from '../../../hooks/useAlertOption';
import { register, sendVerificationCode } from '../../../services/UserService';
import { SelectInputOption } from '../../../types/SelectOptionType.type';
import useValidateRegisterInfo from './hooks/useValidateRegisterInfo';
import { Routes } from '../../../types/Routes.enum';
import { useModalContext } from '../../../context/ModalContext/ModalContext';
import { useState } from 'react';
import UserVerification from './UserVerification';
import { useLoadingContext } from '../../../context/LoadingContext/LoadingContext';
import { generateSixDigitNumber } from '../../../utils/string';


const genderOption:SelectInputOption[] = [
    {
        name:"Gender",
        value:''
    },
    {
        name:'Male',
        value:'Male'
    },
    {
        name:'Female',
        value:'Female'
    }
];

function Register() {
    const [code,setCode] = useState<string>('');
    const [inputedCode,setInputedCode] = useState<string>("");
    const {handleCloseLoading,openLoading} = useLoadingContext();
    const alert = useAlertOption();
    const {
        validateRegisterInfo,
        firstName,
        setFirstName,
        middleName,
        setMiddleName,
        lastName,
        setLastName,
        username,
        setUsername,
        password,
        setPasssword,
        confirmPassword,
        setConfirmPassword,
        birthdate,
        setBirthdate,
        mobileNumber,
        setMobileNumber,
        email,
        setEmail,
        address,
        setAddress,
        gender,
        setGender
    } = useValidateRegisterInfo();
    const {setIsOpen,setContent} = useModalContext();
    const {alertError} =alert;
    async function handleRegister(){
        try {
            openLoading();
            const payload = {
                userName:username,
                password,
                firstName,
                middleName,
                lastName,
                email,
                mobileNumber,
                gender,
                birthdate,
                address
            }
            const resp = await register(payload);
            const {status,message} = resp.data;
            if(status.toString() === "1"){
                Swal.fire({
                    title:'Success',
                    text:'Successfully Registered',
                }).then((e)=>{
                    if(e.isConfirmed){
                        window.location.href=Routes.LOGIN
                    }
                })
                return;
            }

            alertError(message);
        } catch (error) {
            alertError()
        }finally{
            handleCloseLoading();
        }
  
    }

    console.log(inputedCode)
    async function handleOpenVerifcationModal(){
       
        try {

            if(!validateRegisterInfo()){
                return;
            }
            openLoading();
            const generatedCode = generateSixDigitNumber();
            setCode(generatedCode.toString())
            const payload = {
                code:generatedCode.toString(),
                email
            }
            const resp = await sendVerificationCode(payload);

            if(resp.status.toString() === "1"){
                setContent(<UserVerification alert={alert} verficationCode={generatedCode.toString()} email={email} setIsOpen={setIsOpen} handleRegister={handleRegister}/>);
                setIsOpen(true)
                return;
            }

            alertError();
        } catch (error) {
            alertError();
        }finally{
            handleCloseLoading();
        }
    }

    return (
    <div className=' pt-28 flex justify-center items-center mb-14'>
        <div className=' bg-white w-1/2 p-8'>
            <h1 className=" font-bold text-xl">Sign Up</h1>
           <div className=' h-10'/>
           <TextInput label='Username' onChange={(e)=>setUsername(e.target.value)} value={username}/>
           <div className=' h-5'/>
           <TextInput label='Password' type='password'  onChange={(e)=>setPasssword(e.target.value)} value={password}/>
           <div className=' h-5'/>
           <TextInput label='Confirm Password' type='password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} />
           <div className=' h-5'/>
            <div className=' flex justify-between'>
                <div className=''> 
                    <TextInput label={'FirstName'} value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>
                <div className=' flex'> 
                    <TextInput label={'MiddleName'} value={middleName} onChange={(e)=>setMiddleName(e.target.value)}/>
                </div>
                <div className=' flex'> 
                    <TextInput label={'Last Name'} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </div>
            </div> 
            <div className=' flex justify-between'>
                <div className=' w-full mr-2'> 
                    <TextInput label={'Email'} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className=' flex w-full ml-2'> 
                    <TextInput label={'Mobile Number'} value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}/>
                </div>
            </div>
            <div className=' h-5'/>
            <p className=' text-sm mb-2'>Gender</p>
            <Select selectedOption={gender} setSelectedOption={setGender} options={genderOption}/>
            <div className=' h-5'/>
            <p className=' text-sm mb-2'>Birthdate</p>
            <TextInput label='' type='date' value={birthdate} onChange={(e)=>setBirthdate(e.target.value)}/>
            <div className=' h-5'/>
            <TextInput label='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <div className=' h-8'/>
            <Button text='Sign Up' onClick={handleOpenVerifcationModal}/>
            <p className=' mt-5 text-center'>Already have account? <a href={Routes.LOGIN} className=' text-blue-600'>Login</a></p>
        </div>
    </div>
  )
}

export default Register