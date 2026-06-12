import SalesAgent from "@/(pages)/salesAgent";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="VIEW_ALL_SALES_AGENTS"
    >
      <SalesAgent />
    </PageGuard>
  );
};

export default Page;
