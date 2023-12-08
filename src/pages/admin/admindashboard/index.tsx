import useGetDataCounts from "../../../hooks/useGetDataCounts"

export default function AdminDashboard() {
    const {userCount,driverCounts,vehicleCounts,bookingsCountToday} = useGetDataCounts();
  return (
    <div>
        <h1 className=" font-bold text-2xl">Welcome Admin</h1>
        <div className=" h-10"/>
        <div className=" grid grid-cols-4 gap-5 ">
        <div className=" bg-slate-200 shadow-md flex flex-row hover:scale-110">
                <div className=" bg-white shadow-md ">
                    <img src={require('../../../assets/dashboard/man.png')} alt='main' className=" w-36 h-32 p-3"/>
                </div>
                <div className="  flex justify-center flex-col flex-1 items-center">
                    <p className=" text-lg text-slate-600 text-center font-semibold">Users</p>
                    <p className=" text-center text-slate-800 text-2xl font-bold">{userCount}</p>
                </div>
            </div>
            <div className=" bg-slate-200 shadow-md flex flex-row hover:scale-110">
                <div className=" bg-white shadow-md ">
                    <img src={require('../../../assets/dashboard/car.png')} alt='main' className=" w-36 h-32 p-3"/>
                </div>
                <div className="  flex justify-center flex-col flex-1 items-center">
                    <p className=" text-lg text-slate-600 text-center font-semibold">Vehicles</p>
                    <p className=" text-center text-slate-800 text-2xl font-bold">{vehicleCounts}</p>
                </div>
            </div>
            <div className=" bg-slate-200 shadow-md flex flex-row hover:scale-110">
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
            <div className=" p-3 bg-slate-300">
                <p>Users</p>
            </div>
            <div className=" p-3 bg-slate-300">
                <p>Users</p>
            </div>
        </div>
    </div>
  )
}
