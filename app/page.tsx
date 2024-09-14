import Image from "next/image";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import { get } from "http";
import getListings, { IListingParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { SafeListings } from "./types/types";


interface HomeProps{
  searchParams:IListingParams;
}
const Home= async({searchParams } : HomeProps)=> {

const listings = await getListings(searchParams);
const currentUser = await getCurrentUser();

if(listings.length === 0) {
  
  return(
    <EmptyState showReset/>
   )
}



  return (
 <Container>
    <div className="pt-24 grid sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
    
    ">
      {listings.map((listing)=>{
        return(
          <div className="" >
           <ListingCard
            data={listing}
            key={listing.id}
            currentUser={currentUser}
           />
          </div>
        )
      })}
    </div>
 </Container>

  );
}


export default Home;