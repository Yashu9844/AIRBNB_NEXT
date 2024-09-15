import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage =async () => {

 const currentUser = await getCurrentUser();

 if(!currentUser){
    return (
      <ClientOnly>
         <EmptyState 
    title="Unauthorized"
    subtitle="Please login"
    
    />
      </ClientOnly>
    );
 }


 const reservation = await getReservations({
    userId: currentUser.id,
 })

 if(reservation.length === 0){
    return (
      <ClientOnly>
         <EmptyState 
    title="No trips found"
    subtitle="You haven't register any trips yet."
    
    />
      </ClientOnly>
    )
 }




  return (
       <ClientOnly>
          <TripsClient
        reservations={reservation}
        currentUser={currentUser}
        />
       </ClientOnly>
  );
};

export default TripsPage;