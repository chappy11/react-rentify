import axiosInstance from "../utils/axiosInstance";
const headers = {
    'Content-Type' : 'multipart/form-data'
}


export const loginDriver = async(payload:any) =>{
    const resp = await axiosInstance.post('drivers/login',payload,{headers:{
        "Content-Type":"text/plain"
    }});

    return resp.data;
}

export const createDriver = async(payload:any)=>{
    const resp = await axiosInstance.post('drivers/create',payload,{headers});

    return resp.data;
}

export const getDriverByOwner = async(ownerId:string)=>{
    const resp = await axiosInstance.get(`drivers/getdriverbyowner/${ownerId}`)


    return resp.data;
}

export const getDriverById = async(id:string)=>{
    const resp = await axiosInstance.get('drivers/driver/'+id);

    return resp.data;
}

export const updateDriverDetails = async(id:string,payload:any)=>{
    const resp = await axiosInstance.post(`drivers/update/${id}`,payload,{headers:{"Content-Type":"text/plain"}});

    return resp.data;
}


export const getDrivers = async()=>{
    const resp = await axiosInstance.get('drivers/drivers');

    return resp.data;
}
