import { Upload, X } from "lucide-react";
import { useState } from "react";

const FileInputComponent = ({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      onFileChange(selectedFile);
    } else if (selectedFile) {
      alert("Please select an image file");
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    handleFileSelect(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const clearFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    onFileChange(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`border border-dashed rounded-lg p-4 text-center transition-colors ${isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <label
            htmlFor="profilePictureInput"
            className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium"
          >
            <div className="flex items-center gap-2">
              <Upload
                strokeWidth={1.5}
                size={16}
                className={isDragOver ? "text-blue-500" : "text-gray-500"}
              />
              <span className={isDragOver ? "text-blue-600" : ""}>
                {isDragOver ? "Drop your image here" : "Click to upload a file"}
              </span>
            </div>
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full py-2 px-3 border border-gray-300 rounded-lg">
          <div className="flex items-center gap-3">
            {previewUrl && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover border border-gray-300 shadow-sm"
                />
              </div>
            )}
            <div className="text-sm font-medium">{file.name}</div>
          </div>
          <button
            title="Remove file"
            type="button"
            onClick={clearFile}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <X strokeWidth={1.5} size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInputComponent;
