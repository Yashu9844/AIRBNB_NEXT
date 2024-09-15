import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";
import { Suspense } from "react";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="Unauthorized" 
        subtitle="Please login" 
      />
    );
  }

  const reservation = await getReservations({
    authorId: currentUser.id,
  });

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="You don't have any reservations on your property."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationClient currentUser={currentUser} reservations={reservation} />
      </Suspense>
    </ClientOnly>
  );
};

export default ReservationPage;
