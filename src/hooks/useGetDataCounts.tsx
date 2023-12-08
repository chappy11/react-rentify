import React, { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../services/UserService';
import { getVehicles } from '../services/VehicleService';
import { getDrivers } from '../services/DriverService.service';
import { gettodaysbooking } from '../services/BookingsService.service';

export default function useGetDataCounts() {
    const [userCount,setUserCount] = useState<number>(0);
    const [vehicleCounts,setVehicleCounts] = useState<number>(0);
    const [driverCounts,setDriverCounts] = useState<number>(0);
    const [bookingsCountToday,setBookingDateToday] = useState<number>(0);
  
    const sendRequest = useCallback(
      async() => {
        try {
            const users = await getUsers();
            const vehicles = await getVehicles();
            const driver = await getDrivers();
            const bookings = await gettodaysbooking();
            
            setUserCount(users?.data?.length);
            setVehicleCounts(vehicles?.data?.data?.length);
            setDriverCounts(driver?.data?.length);
            setBookingDateToday(bookings?.data?.length)
        } catch (error) {
            console.log(error)
        }
      }
      ,[]
    )

    useEffect(() => {
      sendRequest();
    }, [])
    
    
    return{
    userCount,
    vehicleCounts,
        driverCounts,
        bookingsCountToday
  }
}
