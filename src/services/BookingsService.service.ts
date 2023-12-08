import axiosInstance from "../utils/axiosInstance";

const headers = {
    "Content-Type":"text/plain"
}

export const createBooking = async(payload:any) =>{
    const response = await axiosInstance.post('bookings/create',payload,{headers})

    return response.data;
}

export const getBookingByStatus = async(user_id:string,status:string)=>{
    const response = await axiosInstance.get(`bookings/getbookingbystatus/${user_id}/${status}`)

    return response.data;
}

export const getBookingByRefId = async(refId:string)=>{
    const response = await axiosInstance.get(`bookings/getbookingbyrefid/${refId}`);

    return response.data;
}

export const acceptTransactions = async(payload:any)=>{
    const response = await axiosInstance.post('bookings/accept',payload,{headers});

    return response.data;
}

export const getDataByDriverId = async(driverId:string,isSuccess:string)=>{
    const response = await axiosInstance.get(`bookings/bookingbydriver/${driverId}/${isSuccess}`);

    return response.data;
}

export const updateBookingStatus = async(refId:string,status:string)=>{
    const response = await axiosInstance.post(`bookings/updatestatus/${refId}/${status}`);

    return response.data;
}

export const getBookingByCustomer = async(userId:string)=>{
    const response = await axiosInstance.get(`bookings/getbookingbycustomer/${userId}`);

    return response.data;
}

export const getTransactionsByOwner = async(userid:string)=>{
    const response = await axiosInstance.get(`bookings/gettransactionbyowner/${userid}`)


    return response.data;
}

export const createAdditionalFee = async(params:any)=>{
    const response = await axiosInstance.post(`bookings/addfee`,params,{headers})

    return response.data;
}

export const payBooking = async(payload:any)=>{
    const response = await axiosInstance.post(`bookings/pay`,payload,{headers});

    return response.data;
}

export const cancelPendingBooking = async(refId:string)=>{
    const response = await axiosInstance.post(`bookings/cancel/${refId}`);

    return response.data;
}

export const declineAbooking = async(refId:string,payload:any)=>{
    const resp = await axiosInstance.post(`bookings/declined/${refId}`,payload,{headers:{'Content-Type':'text/plain'}})

    return resp.data;
}

export const getSuccessTransactions = async(userid:string)=>{
    const response = await axiosInstance.get(`bookings/getownerincome/${userid}`)


    return response.data;
}

export const gettodaysbooking = async()=>{
    const response = await axiosInstance.get(`bookings/gettodaysbooking`)


    return response.data;
}

export const getBookingsByUserType = async(id:string,type:string) =>{
    const response = await axiosInstance.get(`bookings/gettransactionby/${id}/${type}`);

    return response.data;
}
