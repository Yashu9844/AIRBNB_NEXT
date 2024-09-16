import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservation";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage =async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
       return <EmptyState 
       title="Unauthorized"
       subtitle="Please login"
       
       />;
    }
   
   
    const listing = await getListings({
       userId: currentUser.id,
    })
   
    if(listing.length === 0){
       return (
         <ClientOnly>
            <EmptyState 
       title="No properties found"
       subtitle="You haven't have any properties yet."
       
       />;
         </ClientOnly>
       )
    }
   
   
   
   
     return (
          <ClientOnly>
             <PropertiesClient
           listing={listing}
           currentUser={currentUser}
           />
          </ClientOnly>
     );
   };

export default PropertiesPage;

