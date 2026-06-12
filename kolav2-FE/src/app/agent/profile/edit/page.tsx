import EditPersonalProfile from "@/(pages)/editPersonalProfile";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <EditPersonalProfile />
    </PageGuard>
  );
};

export default Page;
