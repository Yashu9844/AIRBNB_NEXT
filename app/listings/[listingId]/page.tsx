import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";
import ClientOnly from "@/app/components/ClientOnly";

interface IParams{
    listingId?: string;
}

const ListingPage = async ({params}:{params:IParams}) => {
const listing = await getListingById(params);
const  currentUser = await getCurrentUser();
const reservation = await getReservations(params);
if(!listing){
  return (
  <ClientOnly>
      <EmptyState  />
  </ClientOnly>
  )
}
  return (
    <div>
<ClientOnly>
<ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservation}
      />
</ClientOnly>
    </div>
  );
};

export default ListingPage;