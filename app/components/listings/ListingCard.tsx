
"use client"
import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns'

interface ListingCardProps{
    data:Listing;
    reservation?:Reservation;
    onAction?:(id:string)=>void;
    disabled?:boolean;
    actionLabel?:string;
    actionId?:string;
    currentUser?:SafeUser|null;

    
}

const ListingCard:React.FC<ListingCardProps> = (
    { data,
        reservation,
        onAction,
        disabled,
        actionLabel,
        actionId="",
        currentUser,
 
     }  // replace with actual data type
  
) => {
const router= useRouter()
const {getByValue} = useCountries();

const location = getByValue(data.locationValue)
const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    if(disabled){
        return;
    }
 onAction?.(actionId)



},[actionId,onAction,disabled])

const price = useMemo(()=>{
if(reservation){
    return reservation.totalPrice;
}
return data.price

},[reservation,data.price])

const reserationDate = useMemo(()=>{
    if(!reservation){
        return null;
    }

const start = new Date(reservation.startDate)
const end = new Date(reservation.endDate)

return `${format(start,'PP')} - ${format(end,'PP')}`

},[reservation])


  return (
    <div>
      ListingCard
    </div>
  );
};

export default ListingCard;