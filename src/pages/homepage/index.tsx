import Lottie from 'lottie-react';
import Car from '../../assets/application.json';

import { vehicleCategory } from '../../constant/Category';
import { useMemo } from 'react';
import { CarCard } from '../../component';
import { Routes } from '../../types/Routes.enum';
export default function Home() {
  
const displayImage = useMemo(()=>{
    return vehicleCategory.map((val:any,i:number)=>(
      // eslint-disable-next-line react/jsx-key
      <CarCard imagePath={val.image} name={val.name} key={i.toString()}/>
    ))
  },[])
  
 
  return (
    <main className="">
      <section className=' h-screen flex w-full '>
        <div className=' flex flex-1 flex-col justify-center ml-16'>
          <h1 className=' text-bold text-5xl font-extrabold'>Rentify</h1>
          <h3 className=' text-3xl mt-3'>Transport your materials or furniture <span className=' text-blue-800'>effortlessly.</span></h3>
          <button className=' bg-black text-white px-5 w-1/4 py-2 text-xl rounded-full mt-10' onClick={()=>window.location.href=Routes.VEHICLES}>
            Rent now!
          </button>
        </div>
        <div className=' flex flex-1 justify-center item-center mt-10'>
          <Lottie animationData={Car} />
        </div>
      </section>
      <section className=' h-screen w-full pt-32'>
        <h3 className=' text-3xl  font-extrabold ml-16'>Vehicle Categories</h3>
          <div className=' grid grid-cols-4 px-10 justify-center items-center mt-24'>
            {displayImage}
          </div>  
      </section>
    </main>
  )
}
