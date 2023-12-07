
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import Driver from '../../pages/driver';
import Booking from '../../pages/owner/bookings/booking';
import ViewMaps from '../../pages/driver/ViewMaps';
import ViewDestinationMaps from '../../pages/owner/bookings/ViewDestinationMaps';
import Profile from '../../pages/profile';
import ConvoList from '../../pages/message/ConvoList';
import Convo from '../../pages/message/Convo';
import TransactionHistory from '../../pages/driver/TransactionHistory';

export default function DriverRoute() {
  return (
    <ReactRoutes>
        <Route
            path={Routes.DRIVER_USER}
            element={<Driver/>}
        />
         <Route
            path={Routes.BOOKING+"/:id"}
            element={<Booking/>}
        />
       
       <Route 
        path={Routes.DRIVER_VIEW_MAPS+"/:id"}
        element={<ViewMaps/>}
       />
        <Route
          path={`${Routes.SHOW_MAPS}/:id`}
          element={<ViewDestinationMaps/>}
        />
         <Route
          path={Routes.PROFILE}
          element={<Profile/>}
        />
        <Route path={Routes.CONVO} element={<ConvoList/>}/>
        <Route path={Routes.MESSAGE+"/:id"} element={<Convo/>}/>
        <Route path={Routes.HISTORY} element={<TransactionHistory/>}/>
    </ReactRoutes>
  )
}
