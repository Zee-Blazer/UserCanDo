import { useDash } from "@/context/dashboardContext";
import { Button } from "@material-tailwind/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface BulkUploadFormProps {
  closeFlyout: () => void;
}

const BulkUploadForm = ({ closeFlyout }: BulkUploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleCustomerBulkUpload, isCustomerBulkUploading } = useDash();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (fileExtension !== "csv") {
        toast.error("Invalid file type. Please upload a CSV file.", {
          duration: 3000,
          position: "top-right",
        });
        setSelectedFile(null);
        setFileSelected(false);
        setFile("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setFileSelected(true);
      setFile(selectedFile.name);
      setSelectedFile(selectedFile);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = selectedFile !== null;

  const resetForm = () => {
    setSelectedFile(null);
    setFileSelected(false);
    setFile("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    handleCustomerBulkUpload(selectedFile, () => {
      closeFlyout();
      setFile("");
    });
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="w-full">
        <div className="flex items-center border rounded">
          <button
            className="bg-gray-100 text-gray-700 py-2 px-4 border-r"
            onClick={handleBrowse}
            type="button"
          >
            Browse
          </button>
          <div className="px-3 text-gray-500 w-full">
            {fileSelected ? file : "No file selected"}
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
      <div className="py-14 flex justify-end items-center gap-x-11">
        <Button
          onClick={resetForm}
          disabled={!isFormValid}
          className="px-4 py-[10px] rounded-lg text-sm font-medium text-center w-40 bg-[#F8FAFB] border-2 border-[#D0D5DD66] text-[#344054] hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          loading={isCustomerBulkUploading}
          disabled={!isFormValid || isCustomerBulkUploading}
          className="bg-[#003366] px-4 py-[10px] rounded-lg text-sm font-medium text-center  w-40 normal-case text-white hover:opacity-90"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default BulkUploadForm;
