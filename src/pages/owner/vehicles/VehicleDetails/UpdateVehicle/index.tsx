import React, { useState } from 'react'
import { Button, TextInput } from '../../../../../component';
import { updateVehicle } from '../../../../../services/VehicleService';
import Swal from 'sweetalert2';
import { useModalContext } from '../../../../../context/ModalContext/ModalContext';
import useAlertOption from '../../../../../hooks/useAlertOption';

type Props = {
    data:any;
    setIsUpdate:(isUpdate:boolean)=>void;
}
export default function UpdateDetails(props:Props) {
  const {data} = props;
const [brand,setBrand] = useState<string>("");
const [description,setDescription] = useState<string>("");
const [model,setModel] = useState<string>("");
const [capacity,setCapacity] = useState<string>("");
const [price,setPrice] = useState<string>("");
const {alertWarning,alertError} = useAlertOption();
const containsSpecialCharacters = (input: string): boolean => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(input);
};

  async function handleUpdate(){
    try {
        if (containsSpecialCharacters(brand) || containsSpecialCharacters(description) || containsSpecialCharacters(model) || containsSpecialCharacters(capacity) || containsSpecialCharacters(price)) {
            Swal.fire({
                icon: 'error',
                text: 'Special characters are not allowed in the input fields.',
            });
            return;
        }

        if(isNaN(parseInt(model)) && model!==''){
            alertError("Model No should be a number");

            return;
        }

        if(isNaN(parseInt(capacity)) && capacity!==''){
            alertError("Capacity is invalid");

            return;
        }

        if(isNaN(parseFloat(price)) && price !== ''){
            alertError("Invalid Price");

            return;
        }
        const payload = {
            brand:brand === '' ? data?.brand : brand,
            description:description === '' ? data?.description : description,
            model: model === '' ? data?.model : model,
            capacity: capacity === '' ? data?.capacity : capacity,
            price: price === '' ? data?.price : parseInt(price)
        }
        
        const resp = await updateVehicle(data?.vehicle_id,payload);

        if(resp.status.toString() === '1'){
            Swal.fire({
                icon:'success',
                text:'Successfully Updated',
            }).then((val)=>{
                if(val.isConfirmed){
                    window.location.reload();
                }
            })            
        }
    } catch (error) {
        
    }
  }
  
  return (
    <div className=' w-full'>
        <h1>Update Details</h1>
        <div className=' h-10'/>
        <p className=' text-sm text-gray-600'>Brand</p>
        <TextInput label="" placeholder={data?.brand} onChange={(e)=>setBrand(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Description</p>
        <TextInput label="" placeholder={data?.description} onChange={(e)=>setDescription(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Year Model</p>
        <TextInput label=""  placeholder={data?.model} onChange={(e)=>setModel(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Capacity</p>
        <TextInput label=""  placeholder={data?.capacity+'kg'} onChange={(e)=>setCapacity(e.target.value)}/>
        <div className=' h-5'/>
        <p className=' text-sm text-gray-600'>Price</p>
        <TextInput label=""  placeholder={'Php'+data?.price} onChange={(e)=>setPrice(e.target.value)}/>
        <div className=' my-10 flex w-full flex-row gap-5'>
            <Button text='Update Now' onClick={handleUpdate}/>
            <Button text='Back' onClick={()=>props.setIsUpdate(false)} outline/>
        </div>
    </div>
  )
}
