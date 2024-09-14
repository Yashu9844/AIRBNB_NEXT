import EmptyState from "../components/EmptyState";

const ListingPage = () => {
  return (
    <div>
      <EmptyState
      title="No favroites Found"
      subtitle="Looks like you have no favroites listing available"
      />
    </div>
  );
};

export default ListingPage;