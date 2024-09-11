import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";

const ReservationPage = async() => {

    
 const currentUser = await getCurrentUser();

 if(!currentUser){
    return <EmptyState 
    title="Unauthorized"
    subtitle="Please login"
    
    />;
 }


 const reservation = await getReservations({
    authorId:currentUser.id,
 })

 if(reservation.length === 0){
    return <EmptyState 
    title="No trips found"
    subtitle="You dont have registretion on your property."
    
    />;
 }

  return (
    <ReservationClient
    currentUser={currentUser}
    reservations={reservation}/>
  );
};

export default ReservationPage;
