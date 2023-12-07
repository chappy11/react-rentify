import React, { useMemo } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
  } from 'chart.js'
  import { Bar } from 'react-chartjs-2'
import dayjs from 'dayjs';
import useGetUserForByMonth from '../../../hooks/user/useGetUserForByMonth';
import useGetAllUser from '../../../hooks/user/useGetAllUser';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'User List',
      },
    },
  };
  export const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];
export default function User() {    
    const {data:montsarr} = useGetUserForByMonth();
    const {data:users} = useGetAllUser();
    console.log('monts',montsarr)
    console.log(dayjs('2023-11-12').month())


    const displayBarGraph = useMemo(() => {
        if(!montsarr){
            return;
        }
        const data = {
            labels: months,
            datasets: [
              {
                label: 'Dataset 1',
                data: montsarr,
                backgroundColor: 'rgb(31 41 55)',
                // You can add more properties as needed
              },
            ],
          };
        
          // Define chart options with correct scale configuration
        
          return <Bar className=' w-52 '  data={data} options={options} />;
    }, [montsarr]);

    const displayData = useMemo(()=>{
      return users.map((val:any,i:number)=>{
        return (
          <tr className=" border-b border-slate-400" key={i.toString()}>
                    <td className=" p-3 text-center">{val.firstname}</td>
                    <td className=" p-3 text-center">{val.middlename}</td>
                    <td className=" p-3 text-center">{val.lastname}</td> 
                    <td className=" p-3 text-center">{val.birthdate}</td>
                    <td className="p-3 text-center">{val.user_type}</td>
                </tr>
        );
      })
    },[users])

        return <div className=' w-full flex  flex-col'>
          <div className=' w-full mb-10 flex  justify-center items-end'>
            {displayBarGraph}
          </div>
          <div className=' bg-white'>
          <table className=" w-full">
            <thead className=" bg-slate-300">
                <tr className="">
                    <th className=" p-3">Firstname</th>
                    <th className=" p-3">Middle Name</th>
                    <th className=" p-3">Lastname</th>
                    <th className=" p-3">Birthdate</th>
                    <th className=" p-3">User Type</th>
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>

          </div>           
        </div>
    }
