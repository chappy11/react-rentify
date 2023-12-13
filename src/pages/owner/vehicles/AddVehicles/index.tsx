

import { useState, useMemo, useCallback, useEffect, SetStateAction } from "react";
import { dataIsRequired } from "../../../../constant/String";
import { addNewVehicle } from "../../../../services/VehicleService";
import { Button, ImageInput, Select, TextInput } from "../../../../component";
import { Routes } from "../../../../types/Routes.enum";
import { SelectInputOption } from "../../../../types/SelectOptionType.type";
import Swal from "sweetalert2";
import useAlertOption from "../../../../hooks/useAlertOption";
import { useModalContext } from "../../../../context/ModalContext/ModalContext";
import { useLoadingContext } from "../../../../context/LoadingContext/LoadingContext";
import { containsSpecialCharacters, generateNonce } from "../../../../utils/string";
import { getImage, uploadImage } from "../../../../services/VehicleImage.service";
import { configVariable } from "../../../../constant/ConfigVariable";
import useGetAllBrands from "../../../../hooks/useGetAllBrands";
import SelectInput from "../../../../component/Select";
import useGetCategories from "../../../../hooks/categories/useGetCategories";

const VEHICLE_TYPE:SelectInputOption[] = [
    {
        name:"Choose Vehicle Type",
        value:""
    },
    {
        name:'SUV',
        value:'SUV'
    },
    {
        name:'VAN',
        value:'VAN'
    },
    {
        name:"CAR",
        value:'CAR'
    },
    {
        name:'TRUCK',
        value:'TRUCK'
    }
];


export default function AddVehicle() {
    const [img,setImg] = useState<any>(null);
    const [orImg,setOrImg] = useState<any>(null);
    const [crImg,setCrImg] = useState<any>(null);
    const {data:brandData} = useGetAllBrands();
    const {data:categories} = useGetCategories();
    const [vehicleType,setVehicleType] = useState<any>(JSON.stringify(categories[0]));
    const [brand,setBrand] = useState<any>(JSON.stringify(brandData[0]));
    const [model,setModel] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [capacity,setCapacity] = useState<string>('');

    const {alertWarning,alertError,alertSuccess} = useAlertOption();
    const {setContent,setIsOpen} = useModalContext();
    const [nonce,setNonce] = useState<string>("");
    const [images,setImages] = useState<any[]>([]);
    const {openLoading,handleCloseLoading} = useLoadingContext();
  
    const displayOr = useMemo(()=>{
        if(!orImg){
            return (<div className=" h-52 w-52 bg-slate-200"/>)
        }

        return <img className=" h-52 w-52" src={URL.createObjectURL(orImg)} alt="or"/>
    },[orImg]);

    const displayCr = useMemo(()=>{
        if(!crImg){
            return (<div className=" h-52 w-52 bg-slate-200"/>)
        }

        return <img className=" h-52 w-52" src={URL.createObjectURL(crImg)} alt="cr"/>
    },[crImg]);
    console.log("IMG",images)
    async function handleSubmit(){
        try {

            const storage = await localStorage.getItem('account');
            if(!storage){
                return;
            }
            const user = JSON.parse(storage);
            if(images.length < 3){
                alertWarning("Image should atleas 3");

                return;
            }

            if(!description){
                alertWarning(dataIsRequired('Description '));

                return;
            }

            if(!capacity){
                alertWarning(dataIsRequired('Capacity '));

                return;
            }

            if(!model){
                alertWarning(dataIsRequired('Model'));

                return;   
            }
          
            if (containsSpecialCharacters(description) || containsSpecialCharacters(model) || containsSpecialCharacters(capacity)) {
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
    
            if(!orImg){
                alertWarning(dataIsRequired('Official Receipt Image'));

                return;   
            }

            if(!crImg){
                alertWarning(dataIsRequired('Certificate of Registration Image'));

                return;   
            }
            
            const brandId = brand ? JSON.parse(brand).brand_id : brandData[0].brand_id;
            const categoryId = categories ? JSON.parse(vehicleType).category_id : (categories[0] as any).category_id;

            
            let formdata = new FormData();
            formdata.append('userId',user.user_id);
            formdata.append('or',orImg);
            formdata.append('cr',crImg);
            formdata.append('nonce',nonce);
            formdata.append('capacity',capacity);
            formdata.append('brand_id',brandId);
            formdata.append('model',model);
            formdata.append('description',description);
            formdata.append('category_id',categoryId);
            const resp = await addNewVehicle(formdata);
            const {status} = resp.data;

            if(status === 1){
                Swal.fire({
                    text:'Successfully Added',
                    icon:'success'
                }).then(e=>{
                    if(e.isConfirmed){
                        window.location.href=Routes.VEHICLES
                    }
                })
                
                return;
            }
        alertError();
        } catch (error) {
               alertError()
        }
    }

    async function handleUpload(ig:any,non:string){
        try {
            openLoading();
            let formdata = new FormData();
            formdata.append('img',ig)
            formdata.append('nonce',non);
            const resp = await uploadImage(formdata);

            if(resp.status.toString() === '1'){
             const resp = await getImage(non);
                setIsOpen(false) 
                setImages(resp.data);
                alertSuccess("Successfully Uploaded");
               
            }else{
                alertError();
            }
        } catch (error) {
            alertError();
        }finally{
            handleCloseLoading();
        }
    }

    const modalContent = useCallback((img:any,non:string) =>{
        return(
            <div className=" w-[800px]">
                <h1>Upload Image</h1>
                <div className=" w-full flex justify-center items-center">
                   <img src={URL.createObjectURL(img)} className=" w-32 h-32" alt="img" />
                </div>
                <div className=" h-10"/>
                <Button text="Upload" onClick={()=>handleUpload(img,non)}/>
                <div className=" h-5"/>
                <Button text="Close" outline onClick={()=>setIsOpen(false)}/>
            </div>
        );
    },[img]);

    useEffect(() => {
      setNonce(generateNonce());
    }, [])
    
    const displayList = useMemo(()=>{
        if(!images){
            return;
        }
        return images?.map((val:any,i:number)=>{
           return <img className=" w-36 h-36" src={configVariable.BASE_URL+val.path} alt="ewe" key={i.toString()}/>
        });
    },[images]);

    
    const displaySelectBrand = useMemo(()=>{
        if(!brandData){
            return;
        }

        return brandData.map(val=>{
            return {
                name:val.brand,
                value:JSON.stringify(val),
            };
        })

    },[brandData]);
   
    const displayCategories = useMemo(()=>{
        if(!categories){
            return;
        }

        return categories?.map(val=>{
            return {
                name:val.vehicle_type,
                value:JSON.stringify(val)
            }
        })
    },[categories])

    const displayCategoriesPrice = useMemo(()=>{
        if(!vehicleType){
            return;
        }

        const categoryData = vehicleType ? JSON.parse(vehicleType) : categories[0];

        return (
            <>
            <p className=" text-red-500 font-bold">Note: The price per kilometer is base of vehicle category</p>
            <p className=" text-lg text-green-700">Price: {categoryData.price} per km</p>
            </>
        );
    },[categories, vehicleType])
    return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <h1>Vehicle</h1>
            <div className=" grid grid-cols-2 gap-3">
                {displayList}
            </div>
            <div className=" flex justify-center">
                    <ImageInput onChange={(e)=>{
                        setImg(e.target.files?.[0])
                        setIsOpen(true);
                        setContent(modalContent(e.target.files?.[0],nonce))
                      }
                    }/>    
            </div>
            <div className=" h-5"/>
            <SelectInput selectedOption={brand?.brand} setSelectedOption={e=>setBrand(e) } options={displaySelectBrand ? displaySelectBrand : []} />
            <div className=" h-3"/>
            <TextInput label="Description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
            <div className=" h-3"/>
            <TextInput label="Capacity" onChange={(e)=>setCapacity(e.target.value)} value={capacity}/>
            <div className=" h-3"/>

            <p className=" text-sm mb-3">Vehicle Type</p>
            <Select options={displayCategories ? displayCategories : []} selectedOption={vehicleType} setSelectedOption={setVehicleType}/>
            <div className=" h-3"/>
            {displayCategoriesPrice}
            <div className=" h-3"/>
            <TextInput label="Model" onChange={(e)=>setModel(e.target.value)} value={model}/>
            <div className=" h-8"/>
            <div className="flex flex-row">
                <div className=" flex flex-col items-center justify-center">
                    <h3>Official Receipt</h3>
                    {displayOr}
                    <input type="file" onChange={(e)=>setOrImg(e.target.files?.[0])}/>
                </div>
                <div className=" flex justify-center flex-col items-center">
                    <h3>Certificate of Registration</h3>
                    {displayCr}
                    <input type="file" onChange={(e)=>setCrImg(e.target.files?.[0])}/>
                </div>  
            </div>
            <div className=" h-10"/>
            <div className="flex justify-between gap-3">
                <Button text="Submit" onClick={() => handleSubmit()} />
                <Button text='Back' onClick={() => window.history.back()} />
            </div>
        </div>        
    </div>

  )
}
