
import  {  useCallback, useState } from 'react'
import { dataIsRequired, dataIsInvalid } from '../../../../constant/String';
import useAlertOption from '../../../../hooks/useAlertOption';
import { validatePersonName, validateMobileNumber, validateEmail } from '../../../../utils/InputValidation';
import dayjs from 'dayjs';

export default function useValidateRegisterInfo() {
    const [username,setUsername] =useState<string>('');
    const [password,setPasssword] =useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const [firstName,setFirstName] = useState<string>('');
    const [lastName,setLastName] = useState<string>('');
    const [middleName,setMiddleName] = useState<string>('');
    const [mobileNumber,setMobileNumber] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [birthdate,setBirthdate] = useState<string>('');
    const [gender,setGender] = useState<string>('');
    const [address,setAddress] = useState<string>('');
    const {alertWarning} = useAlertOption();


    
    const validateRegisterInfo = useCallback(()=>{
        if(username === ''){
            alertWarning(dataIsRequired('Username'));
            return false;
        }

        if(!password){
            alertWarning(dataIsRequired('Password'));
            return false;
        }

        if(!confirmPassword){
            alertWarning(dataIsRequired('Confirm Password'));
            return false;
        }

        if(password !== confirmPassword){
            alertWarning('Password do not match');
            return false;
        }


        if(!firstName){
            alertWarning(dataIsRequired('Firstname'));
            return false;

        }

        if(!validatePersonName(firstName)){
            alertWarning(dataIsInvalid('Firstname'));
           return false;
         
        }

        if(!middleName){
            alertWarning(dataIsRequired('Middlename'));
            return false;
        }

        if(!validatePersonName(middleName)){
            alertWarning(dataIsInvalid('Middlename'));
            return false;
        }

        if(!lastName){
            alertWarning(dataIsRequired('Lastname'));
            return false;
        }

        if(!validatePersonName(lastName)){
            alertWarning(dataIsInvalid('Lastname'));
            return false;
        }

        if(!mobileNumber){
            alertWarning(dataIsRequired('Mobile Number'));
            return false;
        }

        if(!validateMobileNumber(mobileNumber)){
            alertWarning(dataIsInvalid('Mobile Number'))
            return false;
        }

        if(!email){
            alertWarning(dataIsRequired('Email'));
            return false;
        }

        if(!validateEmail(email)){
            alertWarning(dataIsInvalid('Email'))
            return false;
        }

        if(!gender){
            alertWarning(dataIsRequired('Gender'));
            return false;
        }

        if(!birthdate){
            alertWarning(dataIsRequired('Birthdate'));
            return false;
        }

        const bday = dayjs(birthdate);
        const age = dayjs().diff(bday,'year');

        if(age < 18){
            alertWarning('Your age is probihited');

            return false;
        }

        if(!address){
            alertWarning(dataIsRequired('Address'));
            return false;
        }

        return true;
    },[address, alertWarning, birthdate, confirmPassword, email, firstName, gender, lastName, middleName, mobileNumber, password, username])
    
    return {
        validateRegisterInfo,
        username,
        setUsername,
        password,
        setPasssword,
        confirmPassword,
        setConfirmPassword,
        firstName,
        setFirstName,
        middleName,
        setMiddleName,
        lastName,
        setLastName,
        mobileNumber,
        setMobileNumber,
        email,
        setEmail,
        birthdate,
        setBirthdate,
        address,
        setAddress,
        gender,
        setGender,
    }
}
