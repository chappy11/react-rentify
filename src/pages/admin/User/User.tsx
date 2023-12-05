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
      legend: {
        position: 'top' as const,
      },
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                // You can add more properties as needed
              },
            ],
          };
        
          // Define chart options with correct scale configuration
        
          return <Bar  data={data} options={options} />;
    }, [montsarr])

        return <div className=' w-full via-gray-800'>
            {displayBarGraph}
        </div>
    }
