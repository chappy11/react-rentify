import React, { useMemo } from 'react'
import useGetAllVehicles from '../../../hooks/vehicle/useGetAllVehicles';

export default function Vehicles() {
    const {data:vehiclesdatas} = useGetAllVehicles();
    const displayData = useMemo(()=>{

        if(!vehiclesdatas){
            return;
        }
        return vehiclesdatas.map((val:any,i:number)=>{
          return (
            <tr className=" border-b border-slate-400" key={i.toString()}>
                      <td className=" p-3 text-center">{val.brand}</td>
                      <td className=" p-3 text-center">{val.description}</td>
                      <td className=" p-3 text-center">{val.vehicle_type}</td> 
                      <td className=" p-3 text-center">{val.model}</td>
                  </tr>
          );
        })
      },[vehiclesdatas])

      console.log(vehiclesdatas)
  
    return (
    <div className=' w-full'>
        <h1 className=' font-bold text-lg'>Vehicle List</h1>
        <table className=" w-full p-3 shadow-lg">
            <thead className=" bg-slate-300">
                <tr className="">
                    <th className=" p-3">Brand</th>
                    <th className=" p-3">Description</th>
                    <th className=" p-3">Vehicle Type</th>
                    <th className=" p-3">Model</th>
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>
    </div>
  )
}
