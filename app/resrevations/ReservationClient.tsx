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

interface ReservationClientProps{
    reservations:SafeReservation[];
    currentUser?:SafeUser|null;
}

const ReservationClient:React.FC<ReservationClientProps> = ({
    reservations,
    currentUser,
  
}) => {
const router = useRouter()
const [deletingId,setDeletingId] =useState("")

const onCancel = useCallback((id:string)=>{
setDeletingId(id);
axios.delete(`/api/reservations/${id}`).then(()=>{
  toast.success("Reservation canceled successfully!")
  
  setDeletingId("")
  router.refresh()
 
}).catch((error:any)=>{
  toast.error("Something went wrong!")
  console.error(error)
  setDeletingId("")
})

},[router])

  return (
    <Container>
      <Heading
      title="Reservations"
      subtitle="Bookings on your properties"
      />
<div className="mt-10 grid 
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
2xl:grid-cols-6
gap-8

">{reservations && reservations.map((reservation)=>(
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
))}</div>
    </Container>
  );
};

export default ReservationClient;