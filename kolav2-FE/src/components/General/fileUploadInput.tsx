import React, { useState, useRef } from "react";
import { Typography } from "@material-tailwind/react";

interface FileUploadInputProps {
  onChange: (file: File | null) => void;
  label?: string;
  name?: string;
  error?: string;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  customStyles?: {
    container?: string;
    button?: string;
    input?: string;
    label?: string;
  };
  maxSize?: number;
  allowedTypes?: string[];
  onError?: (error: string) => void;
}

const FileUploadInput = ({
  onChange,
  label,
  name,
  error,
  accept,
  placeholder = "No file detected",
  disabled = false,
  required = false,
  className = "",
  customStyles = {},
  maxSize,
  allowedTypes,
  onError,
}: FileUploadInputProps) => {
  const [fileName, setFileName] = useState<string>(placeholder);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      onError?.(`File must be smaller than ${sizeMB}MB`);
      return false;
    }

    if (allowedTypes && allowedTypes.length > 0) {
      const isValidType = allowedTypes.some((type) => file.type.includes(type));
      if (!isValidType) {
        onError?.("Invalid file type");
        return false;
      }
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (validateFile(file)) {
        setFileName(file.name);
        onChange(file);
      } else {
        setFileName(placeholder);
        onChange(null);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col gap-2 ${customStyles.container || ""}`}>
      {label && (
        <Typography
          variant="small"
          className={`font-medium ${customStyles.label || ""}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Typography>
      )}
      <div className="relative">
        <div
          className={`
            flex items-center w-full border bg-white rounded
            ${error ? "border-red-500" : "border-gray-300"}
            ${disabled ? "bg-gray-50 cursor-not-allowed" : ""}
            ${className}
          `}
        >
          <input
            title="file_upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            disabled={disabled}
            name={name}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled}
            className={`
              min-w-[120px] px-4 py-2 text-gray-700 border-r bg-[#FAFAFB]
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
              ${customStyles.button || ""}
            `}
          >
            Browse
          </button>
          <div className="flex-1 px-4 py-2 text-gray-500 truncate">
            {fileName}
          </div>
        </div>
        {error && (
          <Typography variant="small" className="mt-1 text-red-500">
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default FileUploadInput;
