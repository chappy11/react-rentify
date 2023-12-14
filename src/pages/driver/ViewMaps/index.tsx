import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../../component';
import 'react-calendar/dist/Calendar.css';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker as MapMarker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import useGetBookingsByRefId from '../../../hooks/bookings/useGetBookingsByRefId';
import { BookingStatus } from '../../../types/BookingStatus.enum';
import { updateBookingStatus } from '../../../services/BookingsService.service';
import Swal from 'sweetalert2';
import { Routes } from '../../../types/Routes.enum';
import { displayStatusByOwner } from '../../../utils/booking.utils';
import useGetAccountFromStorage from '../../../hooks/useGetAccountFromStorage';
const icon = require('../../../assets/marker/start.png');
const destination = require('../../../assets/marker/destination.png')
const vehicle =require('../../../assets/marker/vehiclemarker.png')

export default function ViewMaps() {
    const originIcon = new L.Icon({
        iconUrl:icon,
        iconSize:[50,50]
    });
    const destinationIcon = new L.Icon({
        iconUrl:destination,
        iconSize:[50,50]
    })
    const vehicleIcon = new L.Icon({
        iconUrl:vehicle,
        iconSize:[50,50]
    })
   const {id} = useParams();
   const {data} = useGetBookingsByRefId({refId:id?id:''});
   const [mylocation,setMyLocation] = useState<LatLngExpression | null>(null);
    const {user} = useGetAccountFromStorage();
   const newOrigin:LatLngExpression = mylocation ? mylocation : [10.3055615,123.8563657];
  
  console.log(newOrigin)
   const displayStartMarker = useMemo(() => {
    if(!data){
        return;
    }
    const coord = data?.booking?.origin.split(',') as LatLngExpression;
    return (
        <MapMarker position={coord} icon={originIcon}/>
    )
    
   }, [data, originIcon])
   

   const displayDestinationMarker = useMemo(()=>{
    if(!data){
        return;
    }

    const coord = data?.booking?.destination.split(',') as LatLngExpression;
    return (
        <MapMarker position={coord} icon={destinationIcon}/>
    )
   },[data, destinationIcon]);
   
   async function getLocation(){
    const option = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} = position.coords;
        setMyLocation([latitude,longitude]);
    },
    ()=>{
        console.log("ERROR")
    },
    option
);
}


useEffect(() => {
  getLocation();
}, [])

const handlePickUp  = useCallback(async()=>{
   try {
    const response = await updateBookingStatus(data?.booking?.ref_id,BookingStatus.PICK_UP);
   
    if(response.status.toString() === '1'){
        Swal.fire({
            title:'Success',
            text:'Passenger is successfully pick up',
            confirmButtonText:'Okay'
        }).then((val)=>{
            if(val.isConfirmed){
                window.location.reload();
            }
        })
    }

    } catch (error) {
    
   } 
},[data?.booking?.ref_id])

const handleDone  = useCallback(async()=>{
    try {
     const response = await updateBookingStatus(data?.booking?.ref_id,BookingStatus.SUCCESS);
    
     if(response.status.toString() === '1'){
         Swal.fire({
             title:'Success',
             text:'Successfully Arrived to your destination',
             confirmButtonText:'Okay'
         }).then((val)=>{
             if(val.isConfirmed){
                 window.location.href=Routes.BOOKING+"/"+data?.booking?.ref_id;
             }
         })
     }
 
     } catch (error) {
     
    } 
 },[data?.booking?.ref_id])
 

const displayButton = useMemo(()=>{

    if(!user){
        return;
    }

    if(user.user_type === 'OWNER' || user.user_type === 'RENTER'){
        return;
    }
    if(data?.booking?.status === BookingStatus.TO_PICK_UP){
        return <Button text='Passenger Picked Up' onClick={handlePickUp}/>
    }

    if(data?.booking?.status === BookingStatus.PICK_UP && user?.user_type === 'RENTER'){
        return <Button text="Arrived to the destination" onClick={handleDone}/>
    }

},[data?.booking?.status, handleDone, handlePickUp,user])
const displayMyCurrentLocation = useMemo(()=>{
    if(!mylocation){
        return;
    }
    
    return(
        <MapMarker position={mylocation} icon={vehicleIcon}/>
    );

},[mylocation, vehicleIcon]);

   
   useEffect(() => {
    const statuses = [BookingStatus.PICK_UP,BookingStatus.TO_PICK_UP]
    const timer = setTimeout(() => {
        if(statuses.includes(data?.booking?.status)){
            getLocation();
        }
    }, 5000)
    return () => clearTimeout(timer)
   }, [data?.booking?.status, mylocation]);

   
   return (
    <div className=' w-screen h-screen relative'>
        <div className=' absolute bottom-20 z-50 flex w-full justify-center '>
            <div className=' w-1/2 flex bg-white flex-col h-[200px] p-5'>
                <h1 className=' font-bold text-xl'>{data?.booking?.ref_id}</h1>
                <p>{displayStatusByOwner(data?.booking?.status)}</p>
                <div className=' h-5'/> 
                <p>Distance: {data?.booking?.distance}</p>
                <p>Total Fee: {data?.booking?.amount}</p>
                <div className=' h-10'/>
                <div className=' flex flex-row w-full'>
                    <div className='  mx-10'>
                       {displayButton}
                    </div>
                    <div className='  mx-10'>
                        <Button text='Back' onClick={()=>window.location.href=Routes.BOOKING+'/'+data?.booking?.ref_id} outline/>
                    </div>
                </div>
            </div>
        </div>
         <MapContainer center={newOrigin}  zoom={13} className=' z-0 p-28' >                    
            <TileLayer
                className=' w-full'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {displayStartMarker}
            {displayDestinationMarker}
            {displayMyCurrentLocation}
        </MapContainer>
   </div>
  )
}

