import { useMemo } from "react";
import { Routes } from "../../types/Routes.enum";
import ItemList from "./components/ItemList";
import { SidebarItem } from "../../types/SidebarItemTypes.type";
import Swal from 'sweetalert2';

type Props ={
    children:React.ReactNode
}

const ITEM:SidebarItem[] = [
    {
        title:'Dashboard',
        route:Routes.HOME,
        subitem:[],
    },
    {
        title:'User Management',
        route:Routes.USER,
        subitem:[]
    },
    {
        title:'Vehicle Management',
        route:Routes.HOME,
        subitem:[],
    },
    {
        title:'Owner Request',
        route:Routes.OWNER_REQUEST,
        subitem:[]
    },
    {
        title:'Category Management',
        route:Routes.CATEGORIES,
        subitem:[]
    },
    {
        title:'Subscription Management',
        route:Routes.SUBSCRIPTION,
        subitem:[]
    },

];

export default function SideNavigation(props:Props) {

    const displayItem = useMemo(()=>{
        return ITEM.map((val:any,index:number)=>(
            <ItemList title={val.title} route={val.route} subitem={val.subitem}/>
        ));
    },[])

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
  return (
    <div className=" flex ">
        <nav className=' w-1/5 bg-slate-950 h-screen'>
            <div className=" px-8 py-14">
                <h1 className="  text-white font-bold text-2xl">Rentify Admin</h1>
            </div>
            {displayItem}
        </nav>
        <div className=" w-full">
        <div className=" h-50 w-full p-5 bg-slate-200 flex justify-end">
            <button className=" text-end px-5" onClick={handleLogout}>Logout</button>
        </div>
            <div className=" w-full  p-10">
                {props.children}
            </div>
        </div>
    </div>
  )
}
