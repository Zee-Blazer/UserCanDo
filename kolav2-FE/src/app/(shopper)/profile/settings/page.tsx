import ShopperSettingsPage from "@/(shopperPages)/shopperSettingsPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BOTH]}>
      <ShopperSettingsPage />
    </PageGuard>
  );
};

export default page;
