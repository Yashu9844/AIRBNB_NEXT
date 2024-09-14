import getCurrentUser from "../actions/getCurrentUser";
import getFavroiteListings from "../actions/getFavroites";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavroiteListings() || [];

  if (listings.length === 0) {
    return (
      <div>
        <EmptyState
          title="No favorites Found"
          subtitle="Looks like you have no favorite listings available"
        />
      </div>
    );
  }

  return (
    <FavoritesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
