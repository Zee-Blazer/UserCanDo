import AccountActivity from "@/(shopperPages)/accountActivity";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <AccountActivity />
    </PageGuard>
  );
};

export default Page;
