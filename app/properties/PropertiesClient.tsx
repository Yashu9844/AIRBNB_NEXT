"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListings, SafeReservation, SafeUser } from "../types/types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { error } from "console";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps{
    listing:SafeListings[];
    currentUser?:SafeUser|null;
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({
    listing,
    currentUser
  
}) => {

 const router = useRouter()
 const [deletingId, setDeletingId] = useState("");

const onCancel = useCallback((id:string)=>{
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`).then(()=>
   {
    toast.success("Listing Deleted")
    router.refresh()
   }
   
    ).catch((error)=>{
        toast.error("something went wrong")
    }).finally(()=>setDeletingId(''))

},[router])


  return (
    <Container>
        <Heading
        title="Properties"
        subtitle="List of your properties"
        
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
    {listing && listing.map((list)=>(
        <ListingCard
        key={list.id}
        data={list}
        actionId={list.id}

        onAction={onCancel}
        disabled={deletingId===list.id}
        actionLabel="Cancel reservation"
        currentUser={currentUser}
        />
    ))}



</div>

    </Container>
  );
};

export default PropertiesClient;