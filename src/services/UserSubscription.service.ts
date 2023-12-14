import axiosInstance from "../utils/axiosInstance";

const headers = {
    "Content-Type":"text/plain"
}

export const getUserSubscription = async(userId:string)=>{
    const resp = await axiosInstance.get('UserSubscription/check/'+userId);

    return resp.data;
}

export const subscribe = async(params:any)=>{
    const resp = await axiosInstance.post("UserSubscription/subscribe",params,{headers});

    return resp.data;
}


export const getAdminIncome = async()=>{
    const resp = await axiosInstance.get('UserSubscription/income');

    return resp.data;
}
