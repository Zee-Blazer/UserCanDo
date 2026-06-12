import ProfileAddressPage from "@/(shopperPages)/profileAddressPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <ProfileAddressPage />
    </PageGuard>
  );
};

export default Page;
