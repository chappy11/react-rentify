
import axiosInstance from '../utils/axiosInstance';
const headers = {
    'Content-Type':'text/plain'
}
export const register = async(payload:any) =>{
    const resp = await axiosInstance.post(`user/register`,payload,{headers});

    return resp;
}

export const userLogin = async(payload:any)=>{
    const resp = await axiosInstance.post(`user/login`,payload,{headers});

    return resp;
}

export const updateToOwner = async(formdata:any)=>{
    const resp = await axiosInstance.post(`user/updatetoowner`,formdata,{headers:{'Content-Type':'multipart/form-data'}});

    return resp;
}

export const getuserbystatus = async(status:string)=>{
    const resp = await axiosInstance.get(`user/getuserbystatus/${status}`);

    return resp.data;
}

export const approvedRequest = async(userId:string)=>{
    const resp = await axiosInstance.post(`user/approvedowner/${userId}`);

    return resp.data;
}

export const sendVerificationCode = async(payload:any)=>{
    const resp = await axiosInstance.post(`user/verification`,payload,{headers});

    return resp.data;
}

export const updateUserData = async(id:string,payload:any)=>{
    const resp = await axiosInstance.post(`user/updateuser/${id}`,payload,{headers});

    return resp.data;
}

export const getUsers = async(payload?:any)=>{
    const resp = await axiosInstance.post(`user/users`,payload,{headers:{'Content-Type':'text/plain'}});

    return resp.data;
}