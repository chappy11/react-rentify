import { useMemo } from 'react';
import { Container } from '../../../component';
import useGetAccountFromStorage from '../../../hooks/useGetAccountFromStorage';
import { formatFullName } from '../../../utils/string';
import CardOptions from './components/CardOptions';
import { Routes } from '../../../types/Routes.enum';

const DRIVER = require('../../../assets/option/driver.png');
const TRANSACTIONS = require('../../../assets/option/transaction.png');
const BOOKINGS = require('../../../assets/option/booking.png');
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
    title:'Bookings',
    icon:BOOKINGS,
    redirect:Routes.BOOKINGS
  },
  {
    title:'Transactions',
    icon:TRANSACTIONS,
    redirect:Routes.TRANSACTIONS
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
  
  const displayOption = useMemo(() => {
    return OPTION.map((val)=>(
      <CardOptions icon={val.icon} title={val.title} redirect={val.redirect}/>
    ))
  }, [OPTION])
  
  return (
    <Container>
       <div className=' flex  w-full items-center flex-col justify-center'>
          <div className=' w-1/2 bg-slate-900  p-10'>
            <h1 className=' text-white font-bold text-xl'>Welcome, {formatFullName({firstName:user?.firstname,middleName:user?.middlename,lastName:user?.lastname})}</h1>
          </div>
          <div className=' h-10'/>
          <div className=' w-1/2 grid grid-cols-2 gap-3'>
           {displayOption}
          </div>
       </div>
    </Container>
  )
}
