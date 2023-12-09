import { useMemo } from "react";
import useGetDataCounts from "../../../hooks/useGetDataCounts";

export default function DriversList() {
    const {drivers:data} = useGetDataCounts();

    const displayData = useMemo(()=>{
        return data.map((val:any,i:number)=>{
          return (
            <tr className=" border-b border-slate-400" key={i.toString()}>
                      <td className=" p-3 text-center">{val.firstName}</td>
                      <td className=" p-3 text-center">{val.middleName}</td>
                      <td className=" p-3 text-center">{val.lastName}</td> 
                      <td className=" p-3 text-center">{val.contactNumber}</td>
                      <td className=" p-3 text-center">{val.dateCreated}</td>
                  </tr>
          );
        })
      },[data])
  
    return (
    <div>
        <h1 className=" text-xl font-bold mb-5">Driver's License</h1>
         <div className=' bg-white'>
          <table className=" w-full">
            <thead className=" bg-slate-300">
                <tr className="">
                    <th className=" p-3">Firstname</th>
                    <th className=" p-3">Middle Name</th>
                    <th className=" p-3">Lastname</th>
                    <th className=" p-3">Mobile Number</th>
                    <th className=" p-3">Date Created</th>
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>

          </div>
    </div>
  )
}
