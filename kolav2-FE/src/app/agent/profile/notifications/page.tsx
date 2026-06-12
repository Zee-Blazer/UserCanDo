import NotificationPage from "@/(shopperPages)/notificationPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <NotificationPage />
    </PageGuard>
  );
};

export default Page;
