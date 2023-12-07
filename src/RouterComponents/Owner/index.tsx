
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import DashBoard from '../../pages/owner/dashboard';
import Vehicles from '../../pages/owner/vehicles';
import AddVehicle from '../../pages/owner/vehicles/AddVehicles';
import Drivers from '../../pages/owner/drivers';
import AddDriver from '../../pages/owner/drivers/AddDriver';
import Bookings from '../../pages/owner/bookings';
import Booking from '../../pages/owner/bookings/booking';
import ViewDestinationMaps from '../../pages/owner/bookings/ViewDestinationMaps';
import Transactions from '../../pages/owner/transactions';
import Profile from '../../pages/profile';
import Subscription from '../../pages/owner/Subscription';
import VehicleDetails from '../../pages/owner/vehicles/VehicleDetails';
import DriverDetails from '../../pages/owner/drivers/DriverDetails';
import Notifications from '../../pages/Notification';
import ConvoList from '../../pages/message/ConvoList';
import Convo from '../../pages/message/Convo';
import ViewMaps from '../../pages/driver/ViewMaps';
import OwnerIncome from '../../pages/owner/OwnerIncome';



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
        <Route
          path={`${Routes.SHOW_MAPS}/:id`}
          element={<ViewDestinationMaps/>}
        />
        <Route
          path={`${Routes.TRANSACTIONS}`}
          element={<Transactions/>}
        />
        <Route
          path={Routes.PROFILE}
          element={<Profile/>}
        />
        <Route
          path={Routes.SUBSCRIPTION}
          element={<Subscription/>}
        />
        <Route
          path={Routes.VEHICLE_DETAILS+"/:id"}
          element={<VehicleDetails/>}
        />
        <Route
          path={Routes.DRIVER+"/:id"} element={<DriverDetails/>}
        />
        <Route
          path={Routes.NOTIFICATION} element={<Notifications/>}
        />
        <Route path={Routes.CONVO} element={<ConvoList/>}/>
        <Route path={Routes.MESSAGE+"/:id"} element={<Convo/>}/>
        <Route path={Routes.DRIVER_VIEW_MAPS+"/:id"} element={<ViewMaps/>}/>
        <Route path={Routes.OWNER_INCOME} element={<OwnerIncome/>}/>
    </ReactRoutes>
  )
}
