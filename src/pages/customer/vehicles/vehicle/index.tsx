import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LeafletMouseEvent, Marker } from 'leaflet';
import { MapContainer, TileLayer, Marker as MapMarker } from 'react-leaflet';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DragEndEvent } from 'leaflet';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { ListItem, Button, Modal, TextInput, Select } from '../../../../component';
import { configVariable } from '../../../../constant/ConfigVariable';
import useAlertOption from '../../../../hooks/useAlertOption';
import useGetAccountFromStorage from '../../../../hooks/useGetAccountFromStorage';
import useGetVehicleDetails from '../../../../hooks/vehicle/useGetVehicleDetails';
import { createBooking } from '../../../../services/BookingsService.service';
import { calculateDistance } from '../../../../utils/location.utils';
import Swal from 'sweetalert2';
import { Routes } from '../../../../types/Routes.enum';
import { useModalContext } from '../../../../context/ModalContext/ModalContext';
import MessageModal from '../../../../component/MessageModal';
import { Rating } from '@smastrom/react-rating';
import { formatFullName } from '../../../../utils/string';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const REDMARKER = require('../../../../assets/images/redmarker.png');
const GREENMARKER = require('../../../../assets/images/markergreen.png');
const PAYMENT_METHOD = [
    {
        name:"Select Payment Method",
        value:""
    },
    {
        name:"Online Via Gcash",
        value:"GCASH"
    },{
        name:"Cash On Hand",
        value:"COD"
    }
];
export default function Vehicle() {
    const {id} = useParams();
    const {alertError,alertSuccess} = useAlertOption();
    const {data:vehicle} = useGetVehicleDetails({id:id?id:''})
    const [value, onChange] = useState<Value>(new Date());
    const [isDisplayMap,setIsDisplayMap] = useState<boolean>(false);
    const [coordinate,setCoordinate] = useState<LatLngExpression | null>(null);
    const [origin,setOrigin] =useState<LatLngExpression | null>(null);
    const [destination,setDestination] = useState<LatLngExpression | null>(null);
    const [kilometer,setKilometer] = useState<string>('');
    const [totalFee,setTotalFee] = useState<string>('');
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [paymentMethod,setPaymentMethod] = useState<string>("");
    const {setIsOpen:setModalOpen,setContent} = useModalContext()
    const [time,setTime] = useState<string>('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const originIcon = new L.DivIcon({
     className:' pin2',
      iconSize:[25,25]
    });

    const {user} = useGetAccountFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const destinationIcon = new L.DivIcon({
        className:' pin3',
         iconSize:[25,25]
       });
const [post,setPost] = useState<LatLngExpression>();
 
    const markerRef = useRef<Marker>(null);
    function handleCalculateDistance(lat1:number, lon1:number, lat2:number, lon2:number): void {
        
       
      
        const distance = calculateDistance(lat1,lon1,lat2,lon2);
        if(!vehicle){
            return;
        }
       
        const total = parseFloat(vehicle?.price ) * distance;
        const totalAmountToPay = total + parseFloat(vehicle?.price);
        setTotalFee(totalAmountToPay.toFixed(2).toString())
        setKilometer(distance.toFixed(2).toString());
        
      }

      const tileDisabled = ({ date, view }:any):boolean => {
        // Disable dates before the current date
        const currentDate = new Date();
        return date < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      };
    


    const displayTotal = useMemo(()=>{
        if(!totalFee){
            return;
        }

        return(
            <ListItem label='Total Fee' value={totalFee}/>
        );
    },[totalFee])

    const displayDistance = useMemo(()=>{
        if(!kilometer){
            return;
        }

        return(
            <ListItem label='Distance' value={kilometer.toString()+' km'}/>
        );
    },[kilometer]);
    
    useEffect(() => {
    if (markerRef.current != null) {
      markerRef.current.on('dragend', (event: DragEndEvent) => {
        const positions = event.target.getposLatLng();
        setPost([positions.lat,positions.lng]);
    });
    }
  }, [setPost]);
  
  const areArraysEqual = (arr1: any[], arr2:any[]): boolean => {
    if (arr1.length !== arr2.length) {
      return false; // If array lengths are different, they can't be equal
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false; // If any element at the same index differs, arrays are not equal
      }
    }
  
    return true; // If no differences found, arrays are equal
  };

  
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleClickSelectPosition(){  
        
        if(!origin){
            alertError("Please set origin location");
            return;
        }

        if(!destination){
            alertError("Please set destination location");
            return;
        }
        
        
        handleCalculateDistance((origin as any)[0] as number, (origin as any)[1], (destination as any)[0], (destination as any)[1]);
         setIsOpen(false);              
    }

    const displayContent = useMemo(()=>{
        if(isDisplayMap){
            if(!coordinate){
                return;
            }
            const newOrigin = origin ? origin : coordinate;
            const newDestination = destination ? destination : coordinate;
            return(
                <div className=" relative flex flex-row-reverse flex-wrap">  
                    <div className='  bg-white bottom-20 mt-10 z-50 flex flex-col   px-8'>
                    <h1 className=' font-bold text-xl'>Please Choose Your Destination</h1>
                    <div className=' flex justify-center flex-col flex-1'>
                    <div className=' flex flex-row gap-4'>
                    <img src={GREENMARKER} width={15} height={15} alt='green marker'/>
                    
                    <p className=' text-green-800 font-bold'>Drag the green marker it represent your pick up location </p>
                    </div>
                    <div className=' h-10'/>
                    <div className=' flex flex-row gap-4'>
                    <img src={REDMARKER} width={15} height={15} alt='RED marker'/>
                    <p className=' text-red-800 font-bold'>Drag the red marker it represent your pick up destination</p>
                    </div>
                    <div className=' h-10'/>
                   
                            <Button text='Confirm your Location' onClick={()=>handleClickSelectPosition()}/>
                            <div className=' h-10'/>
                            <Button text='Back' onClick={()=>setIsOpen(false)} outline/>

                    </div>
                                               </div>
                    <div className=' flex-1'>   
                   
                    <MapContainer center={newOrigin} zoom={13} className=' z-0' >
                    
                    <TileLayer
                        className=' w-full'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <MapMarker 
                        position={newOrigin} 
                        icon={originIcon}  
                        draggable={true}   
                        eventHandlers={{
                            dragend: (event: DragEndEvent) => {
                                const positions = (event as unknown as LeafletMouseEvent).target.getLatLng();
                                setOrigin([positions.lat,positions.lng]);

                            },
                          }}
                        >
                        </MapMarker>
                        <MapMarker 
                            position={newDestination} 
                            icon={destinationIcon}  
                            draggable={true}   
                            eventHandlers={{
                                dragend: (event: DragEndEvent) => {
                                    const positions = (event as unknown as LeafletMouseEvent).target.getLatLng();
                                
                                    setDestination([positions.lat,positions.lng]);
                                    // handleCalculateDistance((origin as any)[0] as number, (origin as any)[1], positions.lat,positions.lng);
                                },
                            }}
                        >
                        </MapMarker>
                    </MapContainer>
                    </div>
                </div>
            );
        }

        
    },[isDisplayMap, coordinate, origin, destination, originIcon, handleClickSelectPosition, destinationIcon]);

    async function getLocation(){
        const option = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude} = position.coords;
            setCoordinate([latitude,longitude]);
            setIsOpen(true)
            setIsDisplayMap(true);
        },
        (error)=>{
            console.log("ERROR",error)
        },
        option
    );
    }


    const displayDestinationIsSet = useMemo(()=>{
        if(!totalFee || !kilometer){
            return;
        }

        return(
            <p className=' text-green-500'>Destination is Set</p>
        )
    },[totalFee,kilometer])

    async function handleBookNow(){
        if(!paymentMethod){
            return;
        }

        if(!totalFee){
            
            return;
        }

        if(!value){
            return;
        }

        if(!time){
            
            return;
        }

        if(!kilometer){
            return;
        }

        if(!user){
            return;
        }

        if(!origin || !destination){
            return;
        }
        const date = dayjs(value.toString()).format("YYYY-MM-DD")
        const payload = {
            customerId:user?.user_id,
            vehicleId:vehicle?.vehicle_id,
            distance:kilometer,
            amount:totalFee,
            bookdate:date,
            time:time,
            owner_id:vehicle?.user_id,
            origin:origin?.toString(),
            destination:destination?.toString(),
            paymentMethod:paymentMethod
        }
        const response = await createBooking(payload)
        
       if(response.status.toString() === '1'){
            Swal.fire({
                icon:"success",
                text:'Successfully Booked!',
                confirmButtonText:'Proceed'
            }).then(val=>{
                if(val.isConfirmed){
                    window.location.href=Routes.TRANSACTIONS
                }
            })
            return;
        }

        alertError(response.message);
    }


    function openMessageModal(){
        setModalOpen(true)
        setContent(<MessageModal vehicle={vehicle} setIsOpen={setModalOpen}/>)
    }

    return (
        <>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} isFullScreen>
                   {displayContent}
            </Modal>  
            <div className=' flex pt-32 justify-center'>
            <div className=' p-12 bg-white w-2/3'>
            <h3 className=' font-bold'>Vehicle Details</h3>
            <div className=' flex'>
                <div className=' flex flex-1'>
                    <img src={(configVariable.BASE_URL as string)+vehicle?.images?.[0].path} alt='vehicle ' className=' h-[300px] w-[300px]'/>
                </div>
                <div className=' px-4 flex flex-1 flex-col'>
                    <p className=' font-bold'>{vehicle?.description}</p>
                    <div className=' mt-3 w-1/2'>
                        <Rating value={vehicle?.owner_rating ? vehicle?.owner_rating : 0}/>
                    </div>
                    <div className=' h-[0.5px] bg-slate-300 my-2'/>
                    <div className=' h-2'/>
                    <ListItem label='Brand' value={vehicle?.brand as string}/>
                    <ListItem label='Year Model' value={vehicle?.model as string} />
                    <ListItem label='Vehicle Type' value={vehicle?.vehicle_type as string}/>
                    <ListItem label='Owner Name' value={formatFullName({firstName:vehicle?.firstname,middleName:vehicle?.middlename,lastName:vehicle?.lastname})}/>
                    <ListItem label='Capacity' value={vehicle?.capacity + "kg"}/>
                    <ListItem label='Rent Price' value={vehicle?.price as string}/>
                    <>{displayDistance}</>
                    <>{displayTotal}</>
                </div>
            </div>
                <div className=' flex flex-row'>
                    <div className=' flex flex-1'>
                    <Calendar onChange={onChange} tileDisabled={tileDisabled} value={value}/>
                    </div>
             
                <div className=' flex flex-1 flex-col'>
                    <TextInput type='time' label='Pick up Time' onChange={(e:any)=>setTime(e.target.value)}/>
                    <div className=' h-5'/>
                    <Select  options={PAYMENT_METHOD} selectedOption={paymentMethod} setSelectedOption={setPaymentMethod} />
                    <div className=' h-10'/>
                    {displayDestinationIsSet}
                    <Button text={'Select Destination'} outline onClick={()=>getLocation()}/>
                    <div className=' h-10'/>
                    <Button text="Message" outline onClick={()=>openMessageModal()} />
                    <div className=' h-5'/>
                    <Button text="Book Now" onClick={handleBookNow}/>
                </div>
                </div>
            </div>
        </div>  
        </>
     )
}
