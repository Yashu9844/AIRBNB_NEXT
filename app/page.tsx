import Image from "next/image";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { IListingParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingParams;
}

export const dynamic = 'force-dynamic'; // Ensures dynamic behavior

const Home = async ({ searchParams }: HomeProps) => {
  try {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }



    return (
      <ClientOnly>
        <Container>
          <div className="pt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
              <ListingCard
                data={listing}
                key={listing.id}
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    );
  } catch (error) {
    console.error('Error fetching listings or user:', error);
    return (
      <ClientOnly>
        <EmptyState title="Error" subtitle="Something went wrong, please try again." />
      </ClientOnly>
    );
  }
};

export default Home;
