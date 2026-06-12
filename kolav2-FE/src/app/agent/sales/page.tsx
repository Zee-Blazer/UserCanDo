import AuthProvider from "@/context/authContext";
import SalesPage from "@/(agentPages)/salesPage";
import { USE_CASES } from "@/types";
import { PageGuard } from "@/components/guards/roleGuard";

const Page = () => {
  return (
    <AuthProvider>
      <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
        <SalesPage />
      </PageGuard>
    </AuthProvider>
  );
};

export default Page;
