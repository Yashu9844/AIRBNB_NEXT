import getCurrentUser from "../actions/getCurrentUser";
import getFavroiteListings from "../actions/getFavroites";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingsPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavroiteListings() || [];

  if (listings.length === 0) {
    return (
      <div>
      <ClientOnly>
      <EmptyState
          title="No favorites Found"
          subtitle="Looks like you have no favorite listings available"
        />
      </ClientOnly>
      </div>
    );
  }

  return (
    <ClientOnly
    >
      <FavoritesClient
      listings={listings}
      currentUser={currentUser}
    />
    </ClientOnly>
  );
};

export default ListingsPage;
