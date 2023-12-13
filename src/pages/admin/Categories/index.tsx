import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../component";
import useGetCategories from "../../../hooks/categories/useGetCategories";
import { useModalContext } from "../../../context/ModalContext/ModalContext";
import AddCategories from "./AddCategories";
export default function Categories() {
  const {data,sendRequest} = useGetCategories();

  const [isRefetch,setIsRefetch] = useState<boolean>(false);
  const {setContent,setIsOpen} = useModalContext(); 

  
 
  useEffect(() => {
    if(isRefetch){
        sendRequest();
        setIsRefetch(false)
    }
  }, [isRefetch])
  
  

  
  const handleOpen = () =>{
    setIsOpen(true)
    setContent(<AddCategories setIsOpen={setIsOpen} setIsRefetch={setIsRefetch}/>)
  }

  const displayData = useMemo(()=>{
    return data.map((val:any,i:number)=>{
        return (<tr className=" border-b border-b-slate-400">
            <td className=" p-3 text-center">{val.vehicleType}</td>
            <td className=" p-3 text-center">{val.price}</td>  
            <td className=" p-3 text-center">{val.typeDescription}</td>
            <td className=" p-3 text-center">{val.created}</td>
        </tr>)
    })
  },[data])
  
return (
    <div>
        <div className=" flex flex-row w-full">
            <div className=" flex flex-1">
                <h1 className=" text-xl font-bold">Categories Management</h1>
            </div>
            <div className=" flex flex-1 items-end justify-end">
                <div className=" w-1/4">
                   <Button text={"Add Categories"} onClick={handleOpen}/>
                </div> 
            </div>
        </div>
        <div className=" h-12"/>
        <table className=" min-w-full">
            <thead className=" bg-slate-300">
                <tr className="">
                    <th className=" p-3">Vehicle Type</th>
                    <th className=" p-3">Price per kilometer</th>
                    <th className=" p-3">Description</th>
                    <th className=" p-3">Date Created</th>
                </tr>
            </thead>
            <tbody>
                {displayData}
            </tbody>
        </table>
    </div>
  )
}
