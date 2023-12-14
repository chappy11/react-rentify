import { useMemo, useRef, useState } from 'react';
import useGetAdminIncome from '../../../hooks/useGetAdminIncome';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import { Button } from '../../../component';
import useAlertOption from '../../../hooks/useAlertOption';
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
        text: `Income Graph for ${dayjs().year()}`,
      },
    },
  };
  export const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];
export default function Income() {
    const {graphData,data:users,totalIncome,sendRequest} = useGetAdminIncome();
    const componentRef = useRef(null);
    const [startDate,setStartDate] = useState<string>("");
    const [endDate,setEndDate] = useState<string>("");
    const {alertError} = useAlertOption();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  //  console.log(graphData)
  const displayBarGraph = useMemo(() => {
    if(!graphData){
        return;
    }
    const data = {
        labels: months,
        datasets: [
          {
            label: 'Dataset 1',
            data: graphData,
            backgroundColor: 'rgb(31 41 55)',
            // You can add more properties as needed
          },
        ],
      };
    
      // Define chart options with correct scale configuration
    
return <Bar className=' w-52 '  data={data} options={options} />;
}, [graphData]);

const displayData = useMemo(()=>{
    if(!users){
        return;
    }
    return users.map((val:any,i:number)=>{
      return (
        <tr className=" border-b border-slate-400" key={i.toString()}>
                  
                    
                  <td className=" p-3 text-center">{val.firstname}</td>
                  <td className=" p-3 text-center">{val.middlename}</td>
                  <td className=" p-3 text-center">{val.lastname}</td> 
                  <td className=" p-3 text-center">{val.sub_name}</td>
                  <td className=" p-3 text-center">{val.price}</td>
              </tr>
      );
    })
  },[users]);

  async function handleFilter(){
  try {
    if(startDate === "" || endDate === ""){
      alertError("Please fill out all fields")
      return;
    }
    const payload = {
      startDate: startDate,
      endDate : endDate
  }
   await sendRequest(payload);
  } catch (error) {
    alertError();
  }
  }


  function clear(){
    setStartDate("");
    setEndDate("");
  }
return (
        <div className=' w-full flex  flex-col'>
           
                   
                <div className=' w-1/4 self-end'>
        <Button onClick={()=>handlePrint()} text='Print this Data'/>
        </div>
        <div className=' w-full flex flex-row mt-10'>
        <div className=' flex flex-row flex-1 gap-2'>
                <input type='date' className=' px-2 border border-gray-400' value={startDate} placeholder="" onChange={(e)=>setStartDate(e.target.value)}/>
                <input type='date' className=' px-2 border border-gray-400' placeholder="" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
              </div>
              <div className=' flex flex-1 flex-row gap-3'>
                <Button text='Filter' onClick={()=>handleFilter()}/>
                <Button text='Cancel' outline onClick={()=>clear()}/> 
              </div>
        </div>
      
        <div ref={componentRef} className=' w-full m-auto flex justify-center items-center flex-col'>
        <div className=' w-[900px] mb-10 flex items-center justify-center items-end flex-col'>
            <h1 className=' text-2xl text-slate-800 font-bold mt-10'>
                Rentify Income Reports
            </h1>
            <div className=' w-1/2'>
                {displayBarGraph}
            </div>
        </div>
        <div className=' bg-white '>
          <table className=" w-full">
            <thead className=" bg-slate-300">
                <tr className="">                   
                    <th className=" p-3">Firstname</th>
                    <th className=" p-3">Middle Name</th>
                    <th className=" p-3">Lastname</th>     
                    <th className=" p-3">Subscription Name</th>               
                    <th className=" p-3">Price </th>
                  
                </tr>
            </thead>
            <tbody>
               {displayData}
            </tbody>
        </table>
        <h1 className=' text-xl text-right p-4'><span className=' font-bold text-gray-800'>Total Amount: </span>: Php{totalIncome}</h1>
                
          </div>           
          </div>
        </div>
  )
}
