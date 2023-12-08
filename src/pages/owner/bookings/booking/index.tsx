import { useParams } from "react-router-dom";
import { Button, Container, ListItem } from "../../../../component";
import useGetBookingsByRefId from "../../../../hooks/bookings/useGetBookingsByRefId";
import { Rating } from '@smastrom/react-rating';
import { formatFullName } from "../../../../utils/string";
import dayjs from "dayjs";
import { configVariable } from "../../../../constant/ConfigVariable";
import useGetDriversByUserId from "../../../../hooks/drivers/useGetDriversByUserId";
import { useCallback, useMemo, useState } from "react";
import useAlertOption from "../../../../hooks/useAlertOption";
import { acceptTransactions, cancelPendingBooking, updateBookingStatus } from "../../../../services/BookingsService.service";
import useGetAccountFromStorage from "../../../../hooks/useGetAccountFromStorage";
import { Routes } from "../../../../types/Routes.enum";
import { BookingStatus } from "../../../../types/BookingStatus.enum";
import Swal from "sweetalert2";
import { displayStatusByOwner, displaystatus } from "../../../../utils/booking.utils";
import { useModalContext } from "../../../../context/ModalContext/ModalContext";
import AdditionalFee from "../components/AdditionalFeeModal";
import PaymentModal from "../components/PaymentModal";
import RatingModal from "./RatingModal";
import DeclineModal from "./DeclineModal";
import DriverModal from "./DriverModal";

export default function Booking() {
    const {id} = useParams();
    const {data} = useGetBookingsByRefId({refId:id?id:''});
    const {user} = useGetAccountFromStorage();
    const {data:driversList} = useGetDriversByUserId({userId:data?.owner?.user_id ?? data?.owner?.user_id});
    const {setContent,setIsOpen,setSize} = useModalContext();
    const notShowThisStatus = [BookingStatus.CANCELED,BookingStatus.DECLINED];
    console.log("GG",data)
    const [selectedDriver,setSelectedDriver] = useState<any>(null);
    const {alertWarning,alertSuccess,alertError} = useAlertOption();

    function handleViewDrivers(){
        setIsOpen(true);
        const isHasBooking = data?.driver ? true : false;
        setContent(<DriverModal refId={data?.booking?.driver_id} driversList={driversList} isReAssign={isHasBooking} setSelectedDriver={setSelectedDriver} setIsOpen={setIsOpen} />)
    }

    const displayRating = useMemo(()=>{
        const rate = data?.owner_rating ? parseInt(data?.owner_rating) : 0;

        return <div className=" w-32">
<Rating value={rate} readOnly className=" "/>
            </div>
    },[data?.owner_rating])

    const displayDriver = useMemo(()=>{
        if(!user){
            return;
        }

        if(data?.driver === null && user?.user_type === 'RENTER'){
            return;
        }
        
        if(selectedDriver){
            return(
            <div className=" w-full bg-[whitesmoke] flex flex-row p-4">
                <div className=" flex-1">
                <p>{selectedDriver?.username}</p>
                <p>{formatFullName({firstName:selectedDriver?.firstName,middleName:selectedDriver?.middleName,lastName:selectedDriver?.lastName})}</p>
                </div>
            
                {user?.user_type === 'OWNER' ? <button className=" p-3 bg-green-800 text-white rounded-md" onClick={handleViewDrivers}>Re-Assign Driver</button> : ''}
            </div>
            );
        }

        if(!data?.driver){
            return user?.user_type === 'OWNER'  ? <button className=" p-3 bg-green-800 text-white rounded-md" onClick={handleViewDrivers}>Assign  Driver</button> : '';
        }
        
     
        return (
            <div className=" w-full">
                <p className=" font-bold">{data?.driver?.username}</p>
                <p>{formatFullName({firstName:data?.driver?.firstName,middleName:data?.driver?.middleName,lastName:data?.driver?.lastName})}</p>
                {user?.user_type === 'OWNER'  ? <button className=" p-3 bg-green-800 text-white rounded-md" onClick={handleViewDrivers}>Re-Assign Driver</button> : ''}
            </div>
        );

    },[data?.driver, data?.user_type, driversList, selectedDriver, user])

    const handleAccept = useCallback(async()=>{
        try {
            if(!selectedDriver){
                alertWarning('Please assign a driver');
    
                return;
            }
    
            const payload = {
                refId:data?.booking?.ref_id,
                driver_id:selectedDriver?.driver_id
            }
            const resp = await acceptTransactions(payload)

            if(parseInt(resp.status) == 1){
                Swal.fire({
                    text:"Successfully Confirm",
                    icon:'success'
                }).then(res=>{
                    if(res.isConfirmed){
                        window.location.href=Routes.BOOKINGS
                        return;
                    }
                })
                return;
            }
    
            alertWarning(resp.message);
        } catch (error) {
            
        }

    },[alertSuccess, alertWarning, data?.booking?.ref_id, selectedDriver])
   



  const handlePickUp = useCallback(async(status:BookingStatus)=>{
    try {
        const resp = await updateBookingStatus(data?.booking?.ref_id,status);
        
        if(resp.status.toString() === '1'){
            Swal.fire({
                title:"We will notify the passenger that you were on the way",
                icon:'success',
                confirmButtonText:'Okay'
            }).then((val)=>{
                if(val.isConfirmed){
                    window.location.href=Routes.DRIVER_VIEW_MAPS+'/'+data?.booking?.ref_id
                }
            })
        }
    } catch (error) {
        console.log("GG");
    }
  },[data?.booking?.ref_id])

  function handleDeclined(){
    setIsOpen(true);
  setContent(<DeclineModal refId={data?.booking?.ref_id} setIsClose={setIsOpen}/>)
  }



  const displayButton = useMemo(()=>{
    const isBookIsToday =data?.booking?.book_date !== dayjs().format('YYYY-MM-DD');

    switch(data?.booking?.status){
        case 'PENDING':
            if(user === undefined){
                return;
            }

            if(user.user_type === 'RENTER'){
                return;
            }
            if(user.user_type === 'OWNER'){
                return(
                    <>
                    <Button text="Confirm Booking" onClick={handleAccept}/>
                    <div className=" h-5"/>
                    <Button text="Decline Booking" onClick={handleDeclined}/>
                    </>
                );
            }

            
            break;
        case 'ACCEPTED':
            if(user === undefined){
                return;
            }

          
            
            if(!user?.user_type){
                return(
                    <Button text='Pick Up Passenger' disable={isBookIsToday}  onClick={()=>handlePickUp(BookingStatus.TO_PICK_UP)}/>
                );
            }
            break;
            case BookingStatus.TO_PICK_UP:        
                if(!user?.user_type){
                    return(
                        <Button text='View Maps' disable={isBookIsToday}  onClick={()=>window.location.href=Routes.DRIVER_VIEW_MAPS+'/'+data?.booking?.ref_id}/>
                );
            }
            break;

            case BookingStatus.PICK_UP:        
                if(!user.user_type){
                    return(
                        <Button text='View Maps' disable={isBookIsToday}  onClick={()=>window.location.href=Routes.DRIVER_VIEW_MAPS+'/'+data?.booking?.ref_id}/>
                );
                }

             
                
            break;
        }   
    
        const allowedStatus = [BookingStatus.PICK_UP,BookingStatus.TO_PICK_UP]
        
        if((user?.user_type === 'OWNER' || user?.user_type === 'RENTER') && allowedStatus.includes(data?.booking?.status)){
            return(
                <Button text='Locate Driver' disable={isBookIsToday}  onClick={()=>window.location.href=Routes.DRIVER_VIEW_MAPS+'/'+data?.booking?.ref_id}/>
            );
        }
    
  },[data?.booking?.book_date, data?.booking?.status, handleAccept, handlePickUp, user])
   
  async function cancelBooking(){
    try {
        const resp = await cancelPendingBooking(data?.booking?.ref_id)

        if(resp.status?.toString() === '1'){
            Swal.fire({
                icon:'success',
                text:'Successfully Canceled'
            }).then(res=>{
                if(res.isConfirmed){
                    window.location.href=Routes.TRANSACTIONS
                }
            })
        }else{
            alertError(resp.message)
        }
    } catch (error) {
        alertError();
    }
  }

  function handleRatingModal(){
    setIsOpen(true)
    setContent(<RatingModal setIsOpen={setIsOpen} owner_id={data?.owner?.user_id}/>);
 
  }



  const displayRatingButton = useMemo(()=>{
    if(data?.booking?.status === BookingStatus.SUCCESS && user?.user_type === 'RENTER'){    
       
        return (<div className=" flex flex-row gap-3">
        
         <button onClick={handleRatingModal} className=" bg-slate-700 text-white px-3 py-2 rounded-3xl">Rate Services</button>
         <button onClick={()=>window.location.href=Routes.RECEIPT+"/"+data?.booking?.ref_id} className=" bg-slate-700 text-white px-3 py-2 rounded-3xl">Print Reciept</button>
         </div>)
    }
  },[data?.booking?.ref_id, data?.booking?.status, handleRatingModal, user?.user_type])

  const textStatusDisplay = useMemo(()=>{
    if(!user){
        return;
    }

    if(user?.user_type !== 'RENTER'){
        return displayStatusByOwner(data?.booking?.status);
    }
    return displaystatus(data?.booking?.status)
  },[data?.booking?.status, user]);

  const displayPayButton = useMemo(()=>{
   
    if(user?.user_type !== 'RENTER' ){
        return;
    }

    if(data?.booking?.status === 'PENDING'){
        return   <Button  outline text={"Cancel Booking"} onClick={()=>cancelBooking()}/>
    }
    
    if(notShowThisStatus.includes(data?.booking?.status)){
        return;
    }

    if(data?.booking?.paymentCode){
        return;
    }
    return <div>
        <Button text={"Pay Now"} onClick={()=>handleShowPayment(data?.customer?.mobileNumber,data?.owner?.mobileNumber,data?.booking?.amount,data?.booking?.additionalfee,data?.booking?.ref_id)}/>
    </div>
  },[data?.booking?.status, user?.user_type]) 

  function handleOpenAdditionalFee(){
    setIsOpen(true)
    setContent(<AdditionalFee id={data?.booking?.ref_id} onClose={()=>setIsOpen(false)}/>)
  }

  const displayAddtionalButton = useMemo(()=>{
    if(user?.user_type !== 'RENTER' ){
        return;
    }

    if(data?.booking?.status === 'PENDING'){
        return;
    }
    if(data?.booking?.paymentMethod === "COD" || parseFloat(data?.booking?.additionalfee) > 0){
        return;
    }

    if(notShowThisStatus.includes(data?.booking?.status)){
        return <p className=" text-red-500">This Transaction is Canceled Or Declined</p>
    }

    if(data?.booking?.paymentCode){
        return;
    }
    return <div>
        <Button outline text={"Additional Fee"} onClick={()=>handleOpenAdditionalFee()}/>
    </div>
  },[data?.booking?.additionalfee, data?.booking?.paymentMethod, data?.booking?.status, notShowThisStatus, user?.user_type]) 
  
  const displayTotal = useMemo(()=>{
    return parseFloat(data?.booking?.additionalfee) + parseFloat(data?.booking?.amount)
  },[data?.booking?.additionalfee, data?.booking?.amount])

  function handleShowPayment(cMobileNo:string,oMobileNo:string,amount:string,additionalfee:string,refId:string){
    const total = parseFloat(amount) + parseFloat(additionalfee);
    setIsOpen(true);
    setSize(40);
    setContent(<PaymentModal setIsOpen={setIsOpen} refId={refId} ownerMobileNo={oMobileNo} renterMobileNo={cMobileNo} amount={total.toString()}/>)
  }

  const displayPaymentCode = useMemo(()=>{
    if(!data?.booking?.paymentCode){
        return;
    }

    return <ListItem label="Payment Code" value={data?.booking?.paymentCode}/>
  },[data?.booking?.paymentCode])


   const displayImages = useMemo(()=>{
        return data?.vehicles?.images.map((val:any,i:number)=>{
            return <img src={configVariable.BASE_URL + val.path} key={i.toString()} alt="Imgae" className=" h-32 w-32"/>
        })
   },[data?.vehicles?.images])

  return (
   <Container>
        <div className=" flex w-full justify-center">
            <div className=" w-1/2 bg-white p-5">
                <h1 className=" font-bold text-xl">{data?.booking?.ref_id}</h1>
                <div className=" h-5"/>
                {textStatusDisplay}
                <div className=" h-3"/>
                {displayRatingButton}
                <div className=" h-10"/>
                <ListItem label="Renter Name" value={formatFullName({firstName:data?.customer?.firstname,middleName:data?.customer?.middlename,lastName:data?.customer?.lastname})}/>
                <ListItem label="Pick Up Date" value={dayjs(data?.booking?.book_date).format("MM-DD-YYYY") + ` ${data?.booking?.pickup_time}`}/>
                <ListItem label="Distance" value={data?.booking?.distance+' km'}/>
                <ListItem label="Additional Fee" value={data?.booking?.additionalfee}/>
                <ListItem label="Fee" value={'Php ' +data?.booking?.amount}/>
                <ListItem label="Total Amount" value={'Php ' +displayTotal}/>
                {displayPaymentCode}
                <div className=" w-full flex ">
                <div>
                        <Button text="View Destination"  onClick={()=>window.location.href=Routes.SHOW_MAPS+"/"+data?.booking?.ref_id}/>
                       
                    </div>
                    <div className=" flex flex-1 justify-end">
                        <div className=" flex flex-row gap-4">
                        {displayAddtionalButton}
                        {displayPayButton}
                        </div>
                        
                    </div>

                    
                </div>

                <div className=" h-10"/>
                <h1 className=" font-bold text-xl">Vehicle Information</h1>
                <div className=" h-5"/>
                <div className=" flex  flex-row">
                    <div className=" flex flex-1 flex-col">
                        <p className=" font-bold">{data?.vehicles?.brand}</p>
                          {displayRating}
                        <div className=" h-5"/>
                        <ListItem label="Description" value={data?.vehicles?.description}/>
                        <ListItem label="Model" value={data?.vehicles?.model}/>
                        <ListItem label="Owner Name" value={formatFullName({firstName:data?.owner?.firstname,middleName:data?.owner?.middlename,lastName:data?.owner?.lastname})}/>
                        <ListItem label="Vehicle Type" value={data?.vehicles?.vehicle_type}/>
                    </div>
                    <div className=" flex flex-1 flex-row flex-wrap items-end justify-center">
                        {displayImages}
                        {/* <img src={configVariable.BASE_URL+data?.vehicles?.vehicleImage} alt="Vehicle" className=" h-[200px] w-[200px]"/> */}
                    </div>
                </div>

                <div className=" h-10"/>
                <h1 className=" font-bold text-xl"> Driver</h1>
                <div className=" h-5"/>
                {displayDriver}
                <div className=" h-10"/>
                {displayButton}
            </div>
        </div>
   </Container>
  )
}
