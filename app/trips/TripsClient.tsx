"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types/types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps{
    reservations:SafeReservation[];
    currentUser?:SafeUser|null;
}

const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
  
}) => {

 const router = useRouter()
 const [deletingId, setDeletingId] = useState("");

const onCancel = useCallback((id:string)=>{
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`).then(()=>
   {
    toast.success("Reservation cancelled")
    router.refresh()
   }
   
    ).catch((error)=>{
        toast.error("something went wrong")
    }).finally(()=>setDeletingId(''))

},[router])


  return (
    <Container>
        <Heading
        title="Trips"
        subtitle="Where you've been and where you want to go"
        
        />
<div className="mt-10 grid 
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
2xl:grid-cols-6
gap-8

">
    {reservations && reservations.map((reservation)=>(
        <ListingCard
        key={reservation.id}
        data={reservation.listing}
        actionId={reservation.id}
        reservation={reservation}
        onAction={onCancel}
        disabled={deletingId===reservation.id}
        actionLabel="Cancel reservation"
        currentUser={currentUser}
        />
    ))}



</div>

    </Container>
  );
};

export default TripsClient;