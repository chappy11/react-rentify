import { useMemo, useState } from "react";
import DisplayUser from "../../profile/component/DisplayUser";
import UpdateModal from "../../profile/component/UpdateModal";
import UpdateUser from "../../profile/component/UpdateUser";
import useGetAccountFromStorage from "../../../hooks/useGetAccountFromStorage";
import { useModalContext } from "../../../context/ModalContext/ModalContext";

const image = require('../../../assets/images/user.png');

export default function AdminProfile() {
    const {user} = useGetAccountFromStorage();
    const {setContent,setIsOpen} = useModalContext();
    const [isUpdate,setIsUpdate] = useState<boolean>(false);
    const profileImage = useMemo(() => {
        if(!user){
            return;
        }
        console.log(user)
        if(!user.image){
            return <img src={image} alt='profile' className=" w-[150px] h-[150px]"/>
        }
        
    }, [user]);

    const handleShowUpdatePicture =()=>{
        setContent(<UpdateModal/>)
        setIsOpen(true)
    }

    const displayContent = useMemo(()=>{
        if(isUpdate){
            return <UpdateUser user={user} setIsUpdate={setIsUpdate}/>
        }

        return <DisplayUser user={user} setIsUpdate={setIsUpdate} />
    },[user,isUpdate])

  return (
    <div className=" w-full flex justify-center">
          <div className=" w-1/2 bg-white p-10">
                <h1 className=" font-bold text-lg">Profile</h1>
                <div className=" mt-5 flex justify-center ">
                    <div className="  w-fit">
                        {profileImage}
                        <div className=" mt-5 flex justify-center">
                            <button onClick={()=>handleShowUpdatePicture()} className=" p-2 rounded bg-slate-900 text-white  ">Edit Profile Picture</button>
                        </div>                     
                    </div>
                </div>
                {displayContent}
            </div>
    </div>
  )
}
