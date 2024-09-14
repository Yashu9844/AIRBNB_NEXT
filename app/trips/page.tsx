import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage =async () => {

 const currentUser = await getCurrentUser();

 if(!currentUser){
    return <EmptyState 
    title="Unauthorized"
    subtitle="Please login"
    
    />;
 }


 const reservation = await getReservations({
    userId: currentUser.id,
 })

 if(reservation.length === 0){
    return <EmptyState 
    title="No trips found"
    subtitle="You haven't register any trips yet."
    
    />;
 }




  return (
        <TripsClient
        reservations={reservation}
        currentUser={currentUser}
        />
  );
};

export default TripsPage;