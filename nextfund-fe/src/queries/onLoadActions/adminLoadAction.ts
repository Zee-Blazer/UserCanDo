import { AllListingsResponse } from "../../types/queries-type";

export const AdminCreateListingDetails = (
  res: AllListingsResponse | undefined,
  dispatch: React.ActionDispatch<any>
) => {
  if (res?.is_success && res.payload) {
  }
};
