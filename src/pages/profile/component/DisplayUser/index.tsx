import { Button, ListItem } from "../../../../component";
import { UserDto } from "../../../../types/UserDto.type";

type Props = {
    user:UserDto;
    setIsUpdate:(isUpdate:boolean)=>void;
}

export default function DisplayUser(props:Props) {
    const {user} = props;
    return (
    <div className=' w-full mt-10'>
        <h2 className=" text-lg font-bold">User Information</h2>
        <div className=" h-10"/>
        <ListItem label="Firstname" value={user?.firstname}/>
        <ListItem label="Middlename" value={user?.middlename}/>
        <ListItem label="Lastname" value={user?.lastname}/>
        <ListItem label="Gender" value={user?.gender}/>
        <ListItem label="Email" value={user?.email}/>
        <ListItem label="Mobile Number" value={user?.mobileNumber}/>
        <ListItem label="Birthdate" value={user?.birthdate}/>
        <div className=" h-10"/>
        <div className=' my-10 flex w-full flex-row gap-5'>
            <Button text="Update Details" onClick={()=>props.setIsUpdate(true)}/>
            <Button text='Back' onClick={() => window.history.back()} />
        </div>
    </div>
  )
 }
