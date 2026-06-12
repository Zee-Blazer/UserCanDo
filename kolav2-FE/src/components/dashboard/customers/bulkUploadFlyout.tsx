import FlyoutLayout from "@/components/General/flyoutLayout";
import BulkUploadForm from "./bulkUploadForm";
import { Button } from "@material-tailwind/react";
import { UploadWhite } from "@/assets/svg";
import Link from "next/link";

interface BulkUploadFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function BulkUploadFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: BulkUploadFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Bulk Upload"
      subheading="Provide a list of business to upload."
      headingRightComponent={
        <div className="flex justify-between items-center">
          <Link href="/customer-bulk-template.csv">
            <Button className="inline-flex items-center justify-center w-40 whitespace-nowrap normal-case gap-2 text-white min-w-[200px] bg-[#027848] font-normal shadow-none hover:shadow-none py-3 px-4">
              <UploadWhite />
              <span className="truncate">Download Template</span>
            </Button>
          </Link>
        </div>
      }
      showButtons={false}
    >
      <BulkUploadForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default BulkUploadFlyout;
