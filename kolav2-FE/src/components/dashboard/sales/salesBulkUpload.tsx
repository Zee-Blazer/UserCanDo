"use client";
import React, { useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ListIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useDash } from "@/context/dashboardContext";
import toast from "react-hot-toast";
import { UploadWhite } from "@/assets/svg";

const SalesBulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleSaleBulkUpload, isSaleBulkUploading } = useDash();

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
    handleSaleBulkUpload(selectedFile, () => {
      setFileName("");
    });
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <p className="text-xl font-semibold">Import Sales Transactions</p>
        <div className="flex gap-5">
          <Link href="/sale-bulk-template.csv">
            <Button className="inline-flex items-center justify-center w-full md:w-40 whitespace-nowrap normal-case gap-2 text-white min-w-[200px] bg-[#027848] font-normal shadow-none hover:shadow-none py-3 px-4">
              <UploadWhite />
              <span className="truncate">Download Template</span>
            </Button>
          </Link>
          <Link href={ROUTES.salesLog}>
            <Button
              variant="outlined"
              className="flex items-center text-black gap-2 py-3 px-3 border border-[#D5D8DC] font-normal rounded-[0.375rem] capitalize"
            >
              <ListIcon size={16} />
              <span className="text-sm">Import Logs</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-[220px_1fr] items-center">
          <label className="text-sm font-normal">* Sale Data File</label>
          <div className="w-full">
            <div
              className={`flex items-center border rounded ${
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
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] items-center">
        <div></div>
        <div className="mt-10 flex justify-between">
          <Button
            className="w-full md:w-52 px-4 py-3 flex justify-center normal-case bg-pry2 text-sm font-medium"
            onClick={handleUpload}
            loading={isSaleBulkUploading}
            disabled={!isFormValid || isSaleBulkUploading}
          >
            Upload
          </Button>
          <Button
            variant="outlined"
            className="w-full md:w-52 px-4 py-3 bg-[#F63838] text-white text-sm font-medium border border-[#F63838] normal-case"
            onClick={resetForm}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesBulkUpload;
