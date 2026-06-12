import { Button, Typography } from "@material-tailwind/react";
import notice from "@/assets/images/notice.svg";
import caution from "@/assets/images/caution.svg";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useDash } from "@/context/dashboardContext";
import toast from "react-hot-toast";

const BulkUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleInventoryBulkUpload, isInventoryBulkUploading } = useDash();

  const validateFile = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "csv") {
      toast.error("Invalid file type. Please upload a CSV file.", {
        duration: 3000,
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const handleFileSelection = (file: File) => {
    if (validateFile(file)) {
      setFileSelected(true);
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      resetForm();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelection(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleFileSelection(file);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = selectedFile !== null;

  const resetForm = () => {
    setSelectedFile(null);
    setFileSelected(false);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    handleInventoryBulkUpload(selectedFile, () => {
      setFileName("");
    });
  };

  return (
    <main className="flex flex-col gap-14 mt-4">
      <section className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex w-full md:w-1/2 items-center gap-4">
          <Image src={notice} alt="notice" />
          <Typography variant="small" className="font-normal">
            Please download the import template file, fill it with content and
            then re-upload to import new products to the Stock Library or update
            existing products.
          </Typography>
        </div>
        <div className="w-full md:w-1/2">
          <label className="text-sm font-normal">* Sale Data File</label>
          <div
            className={`items-center flex border rounded ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button
              className="bg-gray-100 text-gray-700 py-2 px-4 border-r"
              onClick={handleBrowse}
              type="button"
            >
              Browse
            </button>
            <div className="px-3 text-gray-500 w-full">
              {fileSelected ? fileName : "No file selected"}
            </div>
          </div>
          <input
            ref={fileInputRef}
            title="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".csv"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex w-full md:w-1/2 items-center gap-4">
          <Image src={caution} alt="notice" />
          <Typography variant="small" className="font-normal">
            <span className="font-semibold mr-1">CAUTION:</span>
            Existing products in the database will be updated to reflect the new
            RECOMMENDED RETAIL PRICE (rec_retail_price) in the template data
            supplied. Do not include a product if you do not intend to update
            it.
          </Typography>
        </div>
        <div className="flex w-full md:w-[50%] justify-between">
          <div>
            <Button
              onClick={resetForm}
              className="w-full md:w-40 px-4 py-3 bg-[#F8FAFB] text-pry2 shadow-none border border-gray_2 text-sm font-normal normal-case"
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              onClick={handleUpload}
              loading={isInventoryBulkUploading}
              disabled={!isFormValid || isInventoryBulkUploading}
              className="w-full md:w-40 px-4 py-3 bg-pry2 text-white text-sm font-normal normal-case"
            >
              Upload File
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BulkUploadForm;
