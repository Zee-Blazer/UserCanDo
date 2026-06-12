import toast from 'react-hot-toast';

type Refetchers = {
  refetch?: () => void;
  refetchBusinessInfo?: () => void;
  refetchListing?: () => void;
};

export const onUpdateBusinessProfileSuccess = (opts?: Refetchers & { message?: string }) => {
  if (opts?.message) toast.success(opts.message);
  else toast.success('Settings updated successfully');

  try {
    opts?.refetch?.();
  } catch (e) {
  }
  try {
    opts?.refetchBusinessInfo?.();
  } catch (e) {}
};

export const onEditListingSuccess = (opts?: Refetchers & { message?: string }) => {
  if (opts?.message) toast.success(opts.message);
  else toast.success('Listing updated successfully');

  try {
    opts?.refetchListing?.();
  } catch (e) {}
};

export const onApiError = (err?: any, fallback = 'An error occurred') => {
  const msg = err?.data?.message || err?.message || fallback;
  toast.error(msg);
};

export default {
  onUpdateBusinessProfileSuccess,
  onEditListingSuccess,
  onApiError,
};
