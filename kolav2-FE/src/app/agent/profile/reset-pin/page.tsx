import ResetShopperPinPage from "@/(shopperPages)/resetShopperPinPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {

    return (
        <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
            <ResetShopperPinPage />
        </PageGuard>
    )
}

export default Page;
