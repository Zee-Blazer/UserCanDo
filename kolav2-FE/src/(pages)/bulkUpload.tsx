"use client";

import BulkUploadForm from "@/components/dashboard/inventory/bulkUploadForm";
import BulkUploadHeader from "@/components/dashboard/inventory/bulkUploadHeader";

const BulkUpload = () => {
  return (
    <div>
      <BulkUploadHeader />
      <BulkUploadForm />
    </div>
  );
};

export default BulkUpload;
