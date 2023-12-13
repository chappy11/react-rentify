import axiosInstance from "../utils/axiosInstance"

export const getBrands = async() =>{
    const resp = await axiosInstance.get('brand/brands');

    return resp.data;
}


export const createBrand = async(payload:any)=>{
    const resp = await axiosInstance.post('brand/createbrand',payload,{headers:{'Content-Type':'text/plain'}});

    return resp.data;
}