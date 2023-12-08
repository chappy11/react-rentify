import { Rating } from "@smastrom/react-rating";
import { configVariable } from "../../constant/ConfigVariable";
import { VehicleDto } from "../../types/VehicleDto.type";
import { useMemo } from "react";

type Props = {
    vehicle:any
    onClick:()=>void;
};

export default function Cards(props:Props) {
    const {vehicle_id,brand,model,description,price,owner_rating} = props.vehicle;

    const displayRating = useMemo(() => {
        return owner_rating ? parseInt(owner_rating) : 0;
    }, [owner_rating])
    return (
    <div className=' bg-white mx-3  px-3 py-4 rounded-lg shadow-lg zoom group' onClick={()=>props.onClick()}>
        <div className=" h-[300px] flex justify-center items-center">
            <img
                src={configVariable.BASE_URL+props.vehicle?.images?.[0]?.path}
                alt={`${brand+vehicle_id}`}
                className=" h-[300px]  w-full p-3"
            />
        </div>
        <div className=" m-auto self-center w-3/4 ">
        <Rating value={displayRating} readOnly />
        </div>
       
        <p className=" font-bold text-center">{description}</p>
        <p className=" text-center">PHP {" "+price+" per km "}</p>
    </div>
    )
}