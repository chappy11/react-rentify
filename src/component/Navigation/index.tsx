'use client';
import { MdOutlineLogout, MdNotifications, MdEmail } from 'react-icons/md';
import { Routes } from "../../types/Routes.enum";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useGetActiveNotif from '../../hooks/notification/useGetActiveNotif';
export default  function Navigation() {
    const [user,setUser] = useState<any>(null);
    const location = useLocation();
    const {sendRequest,data} = useGetActiveNotif();

    const displayNotifCount = useMemo(()=>{
        return data.length;
    },[data])

    const getUser = async()=>{
        const data = await localStorage.getItem('account');
        if(!data){
            return;
        }
        const userData = JSON.parse(data);

        setUser(userData)
    }
    const logout = async() =>{
        await localStorage.clear();
        window.location.href=Routes.HOME;
     }
 
   function handleLogout(){
     Swal.fire({
         title:'Confirmation',
         text:'Are you sure do want to logout?',
         confirmButtonText:'Yes',
         showCancelButton:true
     }).then((e)=>{
         if(e.isConfirmed){
           logout();
         }    
     })
   }

    const displayUser = useMemo(()=>{
        if(!user){
           return(<>
            <li className=" text-white px-4">
                About
            </li>
            <a href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                Login
            </a>
        </>)
           
        }

        if(!user.user_type){
            return(<>
                 <a href={Routes.HISTORY}  className=" text-white px-4 hover:text-slate-300 relative" >
                    Transaction History
                </a>
                <a href={Routes.NOTIFICATION}  className=" text-white px-4 hover:text-slate-300 relative" >
                    <label className=' absolute top-[-10px] right-[10px]'>{displayNotifCount}</label><MdNotifications className=' text-2xl'/>
                </a>
                <a href={Routes.CONVO}  className=" text-white px-4 hover:text-slate-300 relative" >
                    <label className=' absolute top-[-10px] right-[10px]'>{}</label><MdEmail className=' text-2xl'/>
                </a>
                    <a href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                        {user?.username}
                </a>
                <p className=' text-white px-4 hover:text-slate-300 text-xl' onClick={handleLogout}><MdOutlineLogout/></p>
            </>)   
        }


        if(user.user_type === 'OWNER'){
            return(<>
                
                <a href={Routes.PROFILE}  className=" text-white px-4 hover:text-slate-300" >
                        {user?.username}
                </a>
                <a href={Routes.NOTIFICATION}  className=" text-white px-4 hover:text-slate-300 relative" >
                    <label className=' absolute top-[-10px] right-[10px]'>{displayNotifCount}</label><MdNotifications className=' text-2xl'/>
                </a>
                <a href={Routes.CONVO}  className=" text-white px-4 hover:text-slate-300 relative" >
                    <label className=' absolute top-[-10px] right-[10px]'>{}</label><MdEmail className=' text-2xl'/>
                </a>
                <p className=' text-white px-4 hover:text-slate-300 text-xl' onClick={handleLogout}><MdOutlineLogout/></p>
            </>)    
        }

        return(<>
            <a href={Routes.REGISTER_OWNER}>
                <li className=" text-white px-4">
                    Become a Owner
                </li>
            </a>
            <a href={Routes.TRANSACTIONS}>
                <li className=" text-white px-4">
                    Transactions
                </li>
            </a>
            <a href={Routes.PROFILE}  className=" text-white px-4 hover:text-slate-300" >
                {user?.username}
            </a>
            <a href={Routes.NOTIFICATION}  className=" text-white px-4 hover:text-slate-300 relative" >
                    <label className=' absolute top-[-10px] right-[10px]'>{displayNotifCount}</label><MdNotifications className=' text-2xl'/>
            </a>
            <a href={Routes.CONVO}  className=" text-white px-4 hover:text-slate-300 relative" >
                    <label className=' absolute top-[-10px] right-[10px]'>{}</label><MdEmail className=' text-2xl'/>
                </a>
            <p className=' text-white px-4 hover:text-slate-300 text-xl' onClick={handleLogout}><MdOutlineLogout/></p>
        </>)
        
    },[user,displayNotifCount])
    
    useEffect(()=>{
        getUser()
    },[])
    
    const MINUTE_MS = 10000;

    useEffect(() => {
      const interval = setInterval(() => {
        sendRequest();
      }, MINUTE_MS);
    
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

   
    const displayNav = useMemo(()=>{

        if(location.pathname.split('/')[1] === 'viewmaps' || location.pathname.split('/')[1] === 'show-maps' || user?.user_type === 'ADMIN'){
            return 'hidden';
        }else{
            return ' p-3 bg-black flex fixed w-screen z-30'
        }

       
    },[location,user])
    return (
    <nav className={displayNav}>
        <ul className=" px-4">
            <li className=" p-3 text-white font-bold text-xl">
                Rentify
            </li>
        </ul>
        <ul className=" flex flex-1 py-3 mr-10 justify-end">
            <a href={Routes.HOME}  className=" text-white px-4 hover:text-slate-300" >
                Home
            </a>
            {displayUser}
        </ul>
    </nav>
  )
}
