import { useMemo } from "react";
import useGetVehicleByUserId from "../../../hooks/vehicle/useGetVehicleByUserId";
import { Routes } from "../../../types/Routes.enum";
import { configVariable } from "../../../constant/ConfigVariable";
import { Button, ListItem } from "../../../component";
import { getUserSubscription } from "../../../services/UserSubscription.service";
import { getDataFromStorage } from "../../../utils/storage";
import Swal from 'sweetalert2';
import { useModalContext } from "../../../context/ModalContext/ModalContext";

;
export default function Vehicles() {
    const {data} = useGetVehicleByUserId();
    const {setIsOpen,setContent} = useModalContext();
    async function handleAddVehicle(){
        const user = await getDataFromStorage('account')
        if(!user){
            return;
        }
        const resp = await getUserSubscription(user.user_id);

        if(resp?.status?.toString() === '1'){
            window.location.href=Routes.ADD_VEHICLE
            return;
        }else{
            Swal.fire({
                title:"Opps",
                text:"You dont have subscription yet",
                showCancelButton:true,
                cancelButtonText:'Close',
                cancelButtonColor:'red',
                confirmButtonText:'Subscribe Now!'
            }).then(res=>{
                if(res.isConfirmed){
                    window.location.href=Routes.SUBSCRIPTION;
                }else{
                    Swal.close();
                }
            })   
        }
        
    }

    const content = (item:any) =>{
        console.log(item);
        return (
            <div className=" w-ful ">
                <h1 className=" text-lg font-bold">Vehicle Details</h1>
                <div className=" h-10"/>
                <div className=" grid grid-cols-3 gap-3 m-auto w-3/4">
                    {item.images.map((val:any,i:number)=>{
                       return <img src={configVariable.BASE_URL+ val.path} className=" w-24 h-24" alt="gg"/>
                    })}
                </div>
                <div className=" h-10"/>
                <ListItem label="Vehicle Brand" value={item.brand}/>
                <ListItem label="Vehicle Description" value={item.description}/>
                <ListItem label="Vehicle Type" value={item.vehicle_type}/>
                <ListItem label="Vehicle Model" value={item.model}/>
                <ListItem label="Vehicle Capacity" value={item.capacity+'kg'}/>
                <ListItem label="Price" value={item.price+" per km"}/>
                <div className=" h-10"/>
                <h1 className=" font-bold">Documents</h1>
                <div className=" mt-10 flex flex-row">
                    <img src={configVariable.BASE_URL + item.vehicleOr} alt="OR" className=" w-32 h-32"/>
                    <img src={configVariable.BASE_URL + item.vehicleCr} alt='Cr' className=" h-32 w-32"/>
                </div>
                <div className=" h-5"/>
                <Button text="Okay" onClick={()=>setIsOpen(false)}/>
            </div>
        );
    }

    function handleOpen(item:any){
        setIsOpen(true);
        setContent(content(item))
    }

    const displayData = useMemo(() => {
        if(data.length < 1){
            return <p className=" text-center">No Vehicle Found</p>
        }

        return data.map((val,i)=>(
            <div className=" flex flex-row border-b border-b-slate-300" key={val.vehicle_id}>
                <div className=" flex flex-row">
                    <div>
                        <img className=" h-52 w-52" src={configVariable.BASE_URL+val.images[0]?.path} alt="vehicle"/>
                    </div>
                    <div className=" py-5 px-8">
                        <p className=" font-bold">{val.description}</p>
                        <div className=" h-5"/>
                        <p className=" py-1"><span>Brand: </span>{val.brand}</p>
                        <p className=" py-1"><span>Model: </span>{val.model}</p>
                        <p className=" py-1"><span>Vehicle Type: </span>{val.vehicle_type}</p>
                        <p className=" py-1"><span>Price: </span>{val.price}</p>
                    </div>
                </div>
                <div className=" flex flex-1 w-full   justify-end items-center ">
                        <button className=" p-3 rounded-3xl bg-slate-900 text-white" onClick={()=>window.location.href=Routes.VEHICLE_DETAILS+"/"+val.vehicle_id}>
                            View
                        </button>
                    </div>
                
            </div>
        ))

    }, [data])

    return (
        <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <div className=' flex w-full '>
                <div className=' flex flex-1 items-center'>
                    <h1 className=" font-bold text-lg">Vehicle</h1>
                </div>
                <div className=' flex flex-1 gap-3'>
                    <Button text="Add Vehicle" onClick={handleAddVehicle}/>
                    <Button text='Back' onClick={() => window.location.href=Routes.HOME} />
                </div>
            </div>
            <div className=" h-10"/>
            {displayData}
        </div>
    </div>
  )
}
