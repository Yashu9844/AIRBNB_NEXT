"use client"

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Catagoris";
import useLoginModalStore from "@/app/hooks/useLoginModal";
import { SafeListings, SafeUser } from "@/app/types/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { error } from "console";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";


const intialDateRange ={
  startDate: new Date(),
  endDate: new Date(),
  key:'selection'
}
interface ListingClientProps{
    listing: SafeListings &{ user:SafeUser} ;
    currentUser:SafeUser | null ;
    reservations?:Reservation[]
}


const ListingClient:React.FC<ListingClientProps> = ({listing,reservations=[],currentUser}) => {

const category = useMemo(()=>{
 return categories.find((item)=>item.label === listing.category);


},[listing.category])


const [isLoading,setIsLoading] = useState(false);
const [totalPrice,setTotalPrice] = useState(listing.price)
const [dateRange,setDateRange] = useState<Range>(intialDateRange)


 



const loginModal = useLoginModalStore();
const router = useRouter();
const disabledDates = useMemo(()=>{
 let dates:Date[] = [];

 reservations.forEach((reservation)=>{
  const  range = eachDayOfInterval({
    start: new Date(reservation.startDate),
    end: new Date(reservation.endDate),
  })

  dates = [...dates,...range]
 })
 return dates;

},[reservations])



const onCreateReservations = useCallback(()=>{
if(!currentUser){
  return loginModal.onOpen();
}

setIsLoading(true);

axios.post('/api/reservations',{
  totalPrice,
  startDate: dateRange.startDate,
  endDate: dateRange.endDate,
  listingId: listing?.id,
}).then(()=>{
  toast.success('Your Reservation is success !')
  
}).catch((error)=>{
  toast.error('Reservation failed!')
}).finally(()=>setIsLoading(false))


},[totalPrice,dateRange,listing?.id,router,currentUser,loginModal])

useEffect(() => {
  if (dateRange.startDate && dateRange.endDate) {
    const dayCount: number = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
    if (dayCount && listing.price) {
      setTotalPrice(dayCount * listing.price);
    } else {
      setTotalPrice(listing.price);
    }
  }
}, [dateRange, listing.price]);



  return (
    <Container>
          <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                title={listing.title}
                imageSrc = {listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={currentUser}
                />
            <div className="grid grid-cols-1 md:grid-cols-7
            md:gap-10 mt-6">
            <ListingInfo
            user={listing.user}
            category = {category}
            description={listing.description}
            guestCount = {listing.guestCount}
            bathroomCount = {listing.bathroomCount}
            locationValue = {listing.locationValue}
            roomCount = {listing.roomCount}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate = {(value)=>setDateRange(value)}
              dateRange={dateRange}
              onSubmit = {onCreateReservations}
              disabled = {isLoading}
              disableDates={disabledDates}
              
              />
            </div>
        

            </div>
             

            </div>
          </div>
    </Container>
  );
};

export default ListingClient;