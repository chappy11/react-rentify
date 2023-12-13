import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from '../../../component';
import useGetAccountFromStorage from '../../../hooks/useGetAccountFromStorage';
import { formatFullName } from '../../../utils/string';
import CardOptions from './components/CardOptions';
import { Routes } from '../../../types/Routes.enum';
import TransactionTabs from '../../../component/TransactionTabs';
import useAlertOption from '../../../hooks/useAlertOption';
import { getUserSubscription } from '../../../services/UserSubscription.service';
import { getDataFromStorage } from '../../../utils/storage';

const DRIVER = require('../../../assets/option/driver.png');
const TRANSACTIONS = require('../../../assets/option/transaction.png');
const VEHICLE = require('../../../assets/option/vehicle.png');

const OPTION = [
  {
    title:'Drivers',
    icon:DRIVER,
    redirect:Routes.DRIVERS
  },
  {
    title:'Vehicles',
    icon:VEHICLE,
    redirect:Routes.VEHICLES
  },
  {
    title:"Subscription",
    icon:TRANSACTIONS,
    redirect:Routes.SUBSCRIPTION,
  },
  {
    title:"Income",
    icon:TRANSACTIONS,
    redirect:Routes.OWNER_INCOME,
  }
];


export default function DashBoard() {
  const {user} = useGetAccountFromStorage();
  const [mySubscription,setMySubscription] = useState<any>(null);
  const {alertError,alertSuccess} = useAlertOption();

  const displayOption = useMemo(() => {
    return OPTION.map((val)=>(
      <CardOptions icon={val.icon} title={val.title} redirect={val.redirect} subscription={mySubscription}/>
    ))
  }, [mySubscription])
  
  const sendRequest = useCallback(async()=>{
    try {
      const user = await getDataFromStorage('account');
      if(!user){
        return;
      }
      const resp = await getUserSubscription(user?.user_id);

      setMySubscription(resp.data);
    } catch (error) {
      alertError();
    }
  },[])

  useEffect(() => {
    sendRequest();
  }, [])

  const displaySubscription = useMemo(()=>{
    if(!mySubscription){
      return <p className=' font-bold text-white'>No Subscription</p>
    }

    return <div className=' mt-5'>
      <p className=' text-bold text-lg font-bold text-white'>{mySubscription.sub_name}</p> 
      <p className=' text-bold text-md text-white'>{mySubscription.sub_description}</p>
      <div className=' h-5'/>
      <p className=' text-bold text-md text-white'>Validity until {mySubscription.validity}</p>
      {mySubscription.usersub_status === 'EXPIRED' && 
        <p className=' text-red-500 font-bold'>Expired</p>
      }
    </div>
  },[mySubscription])
  
  return (
    <Container>
       <div className=' flex  w-full items-center flex-col justify-center'>
          <div className=' w-1/2 bg-slate-900  p-10'>
            <h1 className=' text-white font-bold text-xl'>Welcome, {formatFullName({firstName:user?.firstname,middleName:user?.middlename,lastName:user?.lastname})}</h1>
            {displaySubscription}
          </div>
          <div className=' h-10'/>
          <div className=' w-1/2 grid grid-cols-2 gap-3'>
           {displayOption}
          </div>
          <div className=' h-10'/>
          <div className=' w-1/2 bg-white p-5'>
          <TransactionTabs/>
          </div>
         
       </div>
    </Container>
  )
}
