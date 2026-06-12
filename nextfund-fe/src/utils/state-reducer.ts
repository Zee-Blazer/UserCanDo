
import { reviewStatusMap } from "../types/mapped-data";
import { ListingDetails, TableRow } from "../types/queries-type";

export const mapListingToTableRow = (listing: ListingDetails): TableRow => {
  const ownerName =
    listing.owner_name ??
    listing.ownwer_name ??
    '';

  return {
    businessName: listing.business_name,
    category: listing.category,
    owner: ownerName,
    lastUpdated: listing.last_modified,
    status: reviewStatusMap[listing.review_status] ?? listing.review_status,
    listing_id: listing.listing_id,
    business_id: listing.business_id,
  };
};