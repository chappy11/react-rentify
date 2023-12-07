import React, { useMemo, useRef } from 'react'
import useGetUserByStatus from '../../../hooks/user/useGetUserByStatus'
import { Container,Button } from '../../../component';
import useGetSuccessTransactions from '../../../hooks/bookings/useGetSuccessTransactions';
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
import { useReactToPrint } from 'react-to-print';

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
        text: `Owner Income Graph for ${dayjs().year()}`,
      },
    },
  };
  export const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];

export default function OwnerIncome() {
    const {data,incomePerMonth,totalIncome} = useGetSuccessTransactions();
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    

    const displayBarGraph = useMemo(() => {
        if(!incomePerMonth){
            return;
        }
        const data = {
            labels: months,
            datasets: [
              {
                label: 'Dataset 1',
                data: incomePerMonth,
                backgroundColor: 'rgb(31 41 55)',
                // You can add more properties as needed
              },
            ],
          };
        
          // Define chart options with correct scale configuration
        
    return <Bar className=' w-52 '  data={data} options={options} />;
    }, [incomePerMonth]);

    const displayData = useMemo(()=>{
        if(!data){
            return;
        }
        return data.map((val:any,i:number)=>{
            const total = parseFloat(val.amount) + parseFloat(val.additionalfee)
          return (
            <tr className=" border-b border-slate-400" key={i.toString()}>
                      
                        
                      <td className=" p-3 text-center">{val.ref_id}</td>
                      <td className=" p-3 text-center">{val.amount}</td>
                      <td className=" p-3 text-center">{val.additionalfee}</td> 
                      <td className=" p-3 text-center">{total}</td>

                  </tr>
          );
        })
      },[data])
  return (
    <Container>
    <div className=' flex w-full justify-center items-center'>
        <div className=' w-1/2 bg-white p-8' >
            <div className=' w-fit self-end ml-auto'>
                <Button text='Print Report' onClick={()=>handlePrint()}/>
            </div>
            <div  ref={componentRef} className=' p-10'>
            {displayBarGraph}
            <div className=' h-10'/>
            <table className=" w-full">
            <thead className=" bg-slate-300">
                <tr className="">                   
                    <th className=" p-3">Reference ID</th>
                    <th className=" p-3">Amount</th>
                    <th className=" p-3">Additional Fee</th>     
                    <th className=" p-3">Total Fee</th>                         
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>
        <h1 className=' text-xl text-right p-4'><span className=' font-bold text-gray-800'>Total Amount: </span>: Php {totalIncome.toFixed(2)}</h1>
        </div>
        </div>
    </div>
</Container>
  )
}
