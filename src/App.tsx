import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Navigation } from './component';
import '@smastrom/react-rating/style.css'

import { useMemo } from 'react';
import useGetAccountFromStorage from './hooks/useGetAccountFromStorage';
import UnAuth from './RouterComponents/UnAuth';
import Renter from './RouterComponents/Renter';
import ModalContextProvider from './context/ModalContext/ModalContext';
import Owner from './RouterComponents/Owner';
import DriverRoute from './RouterComponents/DriverRoute';
import AdminRoute from './RouterComponents/AdminRoute';
import LoadingContextProvider from './context/LoadingContext/LoadingContext';


function App() {
  const {user,isLoading} = useGetAccountFromStorage();

  
  const loading = () =>{
    return (<div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
       <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0" >
         <i className="fas fa-circle-notch fa-spin fa-5x"></i>
       </span>
     </div>)
   }

  const checkRoutes = useMemo(()=>{
    if(isLoading){
      return loading();
    }

    


    if(!!!user){
      return <UnAuth/>
    }

 
    if(!!user){
    
      if(user.user_type === 'RENTER'){
        return <Renter/>
      }

      if(user.user_type === 'OWNER'){
        return <Owner/>
      }

      if(user.user_type === 'ADMIN'){
        return <AdminRoute/>
      }

    
      return(
        <DriverRoute/>
      );
    }
   
  },[user,isLoading])

  return (
   <>
   <LoadingContextProvider>
   <ModalContextProvider>
    <BrowserRouter>
      <Navigation/>
      {checkRoutes}    
 
    </BrowserRouter>
    </ModalContextProvider>
    </LoadingContextProvider>
   </>
   
  );
}

export default App;
