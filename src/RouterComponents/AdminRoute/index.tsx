
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import AdminDashboard from '../../pages/admin/admindashboard';
import SideNavigation from '../../component/SideNavigation';
import Requests from '../../pages/admin/Requests';
import Categories from '../../pages/admin/Categories';
import Subscription from '../../pages/admin/Subscription';
import User from '../../pages/admin/User/User';
import Vehicles from '../../pages/admin/Vehicles';
import Income from '../../pages/admin/Income';
import AdminProfile from '../../pages/admin/AdminProfile';
import DriversList from '../../pages/admin/DriversList';
import Brands from '../../pages/admin/Brands';

export default function AdminRoute() {
  return (
    <>
    <SideNavigation>
    <ReactRoutes>
        <Route
            path={Routes.HOME}
            element={<AdminDashboard/>}
            
        />
        <Route
          path={Routes.OWNER_REQUEST}
          element={<Requests/>}
        />
        <Route path={Routes.CATEGORIES} element={<Categories/>}/>
        <Route path={Routes.SUBSCRIPTION} element={<Subscription/>}/>
        <Route path={Routes.USER} element={<User/>}/>
        <Route path={Routes.VEHICLES} element={<Vehicles/>}/>
        <Route path={Routes.ADMIN_INCOME} element={<Income/>}/>
        <Route path={Routes.PROFILE} element={<AdminProfile/>}/>
        <Route path={Routes.ADMIN_DRIVER} element={<DriversList/>}/>
        <Route path={Routes.ADMIN_BRAND} element={<Brands/>}/>
    </ReactRoutes>
    </SideNavigation>
    </>
  )
}
