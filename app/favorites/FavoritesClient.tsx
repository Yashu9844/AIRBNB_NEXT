
import Container from "../components/Container";
import Heading from "../components/Heading";
import {  SafeListings, SafeUser } from "../types/types";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps{
    listings:SafeListings[];
    currentUser?: SafeUser | null;
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
     <Heading
     title="Favorites"
     subtitle="List of places you have favroites!"
     
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
   {
    listings.map((list)=>(
        <ListingCard
        currentUser={currentUser}
         key={list.id}
         data={list}        
        />
    ))
   }



 </div>


    </Container>
  );
};

export default FavoritesClient;