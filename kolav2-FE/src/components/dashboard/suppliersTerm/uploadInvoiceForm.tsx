import React, { useState } from "react";
import {
  DragAndDropFileInput,
  FormInput,
  FormSelect,
} from "@/components/General/form";
import { Typography } from "@material-tailwind/react";
import { CloudArrowUp } from "@phosphor-icons/react";

const UploadInvoiceForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[], id: string) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <main className="space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium">Product name</label>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
              + Add a supplier
            </button>
          </div>
          <FormSelect
            options={["smoove"]}
            placeholder="e.g. coffee"
            className="w-full rounded-md"
            paddingX="6"
            paddingY="3"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          type="date"
          label="Request Date"
          color="#101828"
          bgColor="white"
          borderColor="#D5D8DC"
          placeholder="Select date"
          fontSize="14px"
          required
          paddingX="6"
          paddingY="3"
          requiredColor="black"
          className="w-full"
        />
        <FormInput
          type="date"
          label="Issue Date"
          color="#101828"
          bgColor="white"
          borderColor="#D5D8DC"
          placeholder="Select date"
          fontSize="14px"
          required
          paddingX="6"
          paddingY="3"
          requiredColor="black"
          className="w-full"
        />
        <FormInput
          type="date"
          label="Due Date"
          color="#101828"
          bgColor="white"
          borderColor="#D5D8DC"
          placeholder="Select date"
          fontSize="14px"
          required
          paddingX="6"
          paddingY="3"
          requiredColor="black"
          className="w-full"
        />
        <FormInput
          type="text"
          label="Invoice Number"
          color="#101828"
          bgColor="white"
          borderColor="#D5D8DC"
          placeholder="Enter invoice number"
          fontSize="14px"
          required
          paddingX="6"
          paddingY="3"
          requiredColor="black"
          className="w-full"
        />
        <FormInput
          type="number"
          label="Amount"
          color="#101828"
          bgColor="white"
          borderColor="#D5D8DC"
          placeholder="Enter amount"
          fontSize="14px"
          paddingX="6"
          paddingY="3"
          required
          requiredColor="black"
          className="w-full"
        />
      </div>

      <div className="space-y-3 mt-8">
        <Typography variant="small" className="font-medium">
          Upload product image
        </Typography>
        <DragAndDropFileInput
          onFileSelect={handleFileSelect}
          id="logo"
          bgColor="#EFF3F6"
          borderColor="#F5AA29"
          borderStyle="none"
          borderWidth="2px"
          size="sm"
          icon={<CloudArrowUp className="w-6 h-6 text-gray-400" />}
          titleComponent={
            <Typography className="text-sm pt-2">
              <span className="font-semibold text-gray-700">
                Click to Upload
              </span>{" "}
              or drag and drop
            </Typography>
          }
          subHeadingComponent={
            <Typography className="text-xs text-gray-500 pb-2">
              PNG, JPG (max. 2MB)
            </Typography>
          }
          labelDirection="vertical"
        />
      </div>
    </main>
  );
};

export default UploadInvoiceForm;
