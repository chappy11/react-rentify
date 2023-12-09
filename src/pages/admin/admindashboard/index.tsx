import { useMemo } from "react";
import useGetDataCounts from "../../../hooks/useGetDataCounts";
import { Routes } from "../../../types/Routes.enum";

export default function AdminDashboard() {
    const {userCount,driverCounts,vehicleCounts,bookingsCountToday,bookingToday} = useGetDataCounts();
    
    const displayData = useMemo(()=>{
        if(!bookingToday){
            return;
        }
        return bookingToday?.map((val:any,i:number)=>{
            const total = parseFloat(val.amount) + parseFloat(val.additionalfee)
          return (
            <tr className=" border-b border-slate-400" key={i.toString()}>
                      
                        
                      <td className=" p-3 text-center">{val.ref_id}</td>
                      <td className=" p-3 text-center">{val.amount}</td>
                      <td className=" p-3 text-center">{val.additionalfee}</td> 
                      <td className=" p-3 text-center">{total}</td>

                  </tr>
          );
        })
      },[bookingToday])
  
    return (
    <div>
        <h1 className=" font-bold text-2xl">Welcome Admin</h1>
        <div className=" h-10"/>
        <div className=" grid grid-cols-4 gap-5 ">
            <div className=" bg-slate-200 shadow-md flex flex-row hover:scale-110" onClick={()=>window.location.href=Routes.USER}>
                <div className=" bg-white shadow-md ">
                    <img src={require('../../../assets/dashboard/man.png')} alt='main' className=" w-36 h-32 p-3"/>
                </div>
                <div className="  flex justify-center flex-col flex-1 items-center">
                    <p className=" text-lg text-slate-600 text-center font-semibold">Users</p>
                    <p className=" text-center text-slate-800 text-2xl font-bold">{userCount}</p>
                </div>
            </div>
            <div className=" bg-slate-200 shadow-md flex flex-row hover:scale-110" onClick={()=>window.location.href=Routes.VEHICLES}>
                <div className=" bg-white shadow-md ">
                    <img src={require('../../../assets/dashboard/car.png')} alt='main' className=" w-36 h-32 p-3"/>
                </div>
                <div className="  flex justify-center flex-col flex-1 items-center">
                    <p className=" text-lg text-slate-600 text-center font-semibold">Vehicles</p>
                    <p className=" text-center text-slate-800 text-2xl font-bold">{vehicleCounts}</p>
                </div>
            </div>
            <div onClick={()=>window.location.href=Routes.ADMIN_DRIVER} className=" bg-slate-200 shadow-md flex flex-row hover:scale-110">
                <div className=" bg-white shadow-md ">
                    <img src={require('../../../assets/dashboard/driver.png')} alt='main' className=" w-36 h-32 p-3"/>
                </div>
                <div className="  flex justify-center flex-col flex-1 items-center">
                    <p className=" text-lg text-slate-600 text-center font-semibold">Drivers</p>
                    <p className=" text-center text-slate-800 text-2xl font-bold">{driverCounts}</p>
                </div>
            </div>
            <div className=" bg-slate-200 shadow-md flex flex-row hover:scale-110">
                <div className=" bg-white shadow-md ">
                    <img src={require('../../../assets/dashboard/booking.png')} alt='main' className=" w-36 h-32 p-3"/>
                </div>
                <div className="  flex justify-center flex-col flex-1 items-center">
                    <p className=" text-lg text-slate-600 text-center font-semibold">Bookings</p>
                    <p className=" text-center text-slate-800 text-2xl font-bold">{bookingsCountToday}</p>
                </div>
            </div>
        </div>
        <div className=" h-10"/>
    <h1 className=" font-bold text-lg">Booking for today</h1>
        <table className=" w-full">
            <thead className=" bg-slate-300">
                <tr className="">                   
                    <th className=" p-3">Reference ID</th>
                    <th className=" p-3">Amount</th>
                    <th className=" p-3">Additional Fee</th>     
                    <th className=" p-3">Total Fee</th>                         
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>
    </div>
  )
}
