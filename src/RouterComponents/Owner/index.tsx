
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import DashBoard from '../../pages/owner/dashboard';
import Vehicles from '../../pages/owner/vehicles';
import AddVehicle from '../../pages/owner/vehicles/AddVehicles';
import Drivers from '../../pages/owner/drivers';
import AddDriver from '../../pages/owner/drivers/AddDriver';
import Bookings from '../../pages/owner/bookings';
import Booking from '../../pages/owner/bookings/booking';


export default function Owner() {
  return (
    <ReactRoutes>
        <Route
            path={Routes.HOME}
            element={<DashBoard/>}
        />
         <Route
            path={Routes.VEHICLES}
            element={<Vehicles/>}
        />
        <Route
          path={Routes.ADD_VEHICLE}
          element={<AddVehicle/>}
        />
         <Route
          path={Routes.DRIVERS}
          element={<Drivers/>}
        />
        <Route
          path={Routes.CREATE_DRIVER}
          element={<AddDriver/>}
        />
        <Route
          path={Routes.BOOKINGS}
          element={<Bookings/>}
        />
        <Route
          path={`${Routes.BOOKING}/:id`}
          element={<Booking/>}
        />
    </ReactRoutes>
  )
}
