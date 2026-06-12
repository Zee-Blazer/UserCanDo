import { CloudArrowUp, FileDoc, FileText, Image } from "@phosphor-icons/react";
import { StaticImageData } from "next/image";
import React, { ReactNode, useState } from "react";

interface DragAndDropFileInputProps {
  onFileSelect: (files: File[], id: string) => void;
  maxSize?: string;
  singleFile?: boolean;
  addBgGraphics?: boolean;
  type?: string;
  size?: "lg" | "sm";
  id: string;
  acceptedFormats?: string[];
  clickFunction?: () => void;
  bgColor?: string;
  titleComponent?: ReactNode;
  subHeadingComponent?: ReactNode;
  labelDirection?: string;
  icon?: ReactNode;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  value?: string | StaticImageData | null | undefined;
  editable?: boolean;
  centerPreview?: boolean;
}

const DragAndDropFileInput: React.FC<DragAndDropFileInputProps> = ({
  onFileSelect,
  maxSize,
  singleFile,
  type,
  size = "sm",
  id,
  acceptedFormats = [".jpeg", ".jpg", ".png"],
  clickFunction,
  bgColor = "transparent",
  titleComponent,
  subHeadingComponent,
  labelDirection,
  icon,
  borderColor = "transparent",
  borderWidth = "1px",
  borderStyle = "solid",
  value,
  editable = true,
  centerPreview = false,
}) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!editable) return;
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    if (!editable) return;
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!editable) return;
    e.preventDefault();
    setDragging(false);
    let files = Array.from(e.dataTransfer.files);
    if (singleFile) {
      files = files.slice(0, 1);
    }
    setSelectedFiles(files);
    onFileSelect(files, id);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editable) return;
    let files = Array.from(e.target.files || []);
    if (singleFile) {
      files = files.slice(0, 1);
    }
    setSelectedFiles(files);
    onFileSelect(files, id);
  };

  const handleClick = () => {
    if (!editable) return;
    if (clickFunction) {
      clickFunction();
    }
  };

  const containerStyle = {
    backgroundColor: bgColor,
    borderColor: dragging ? "var(--pry-color, #F5AA29)" : borderColor,
    borderWidth: dragging ? "1px" : borderWidth,
    borderStyle: dragging ? "dashed" : borderStyle,
  };

  const displayValue =
    typeof value === "object" && value !== null && "src" in value
      ? (value as { src: string }).src
      : value;

  return (
    <div
      onDragOver={editable ? handleDragOver : undefined}
      onDragLeave={editable ? handleDragLeave : undefined}
      onDrop={editable ? handleDrop : undefined}
      onClick={editable ? handleClick : undefined}
      style={containerStyle}
      className={`${editable ? "cursor-pointer" : "cursor-default"
        } rounded-lg transition ${size === "lg"
          ? "h-[336px] flex flex-col items-center justify-center"
          : "px-6 py-4"
        }`}
    >
      {!clickFunction && editable && (
        <input
          type="file"
          multiple={!singleFile}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-input-${id}`}
          accept={acceptedFormats.join(",")}
        />
      )}

      <label
        htmlFor={editable ? `file-input-${id}` : undefined}
        className={`${labelDirection === "vertical"
          ? "flex flex-col justify-center text-center"
          : "flex"
          } gap-4 items-center ${editable ? "cursor-pointer" : "cursor-default"}`}
      >
        {displayValue ? (
          <div className="flex flex-col py-5 items-center">
            <div
              className={
                centerPreview
                  ? "w-full flex justify-center"
                  : "flex justify-start"
              }
            >
              <img
                src={displayValue}
                alt="preselected-file"
                className={`w-auto h-auto max-h-20 ${centerPreview ? "mx-auto" : "ml-0"
                  }`}
              />
            </div>
            {subHeadingComponent && <div>{subHeadingComponent}</div>}
          </div>
        ) : (
          <>
            {size === "sm" && (
              <div className="items-center justify-center flex">
                {icon ? (
                  icon
                ) : (
                  <Image className="h-20 w-20" size={32} alt="alt" />
                )}
              </div>
            )}
            <div className={`${size === "lg" && "flex flex-col items-center"}`}>
              {size === "lg" && (
                <div className="flex gap-4 items-center mb-4">
                  <FileText size={32} />
                  <FileDoc size={32} />
                  <CloudArrowUp size={32} />
                </div>
              )}

              {selectedFiles && selectedFiles.length > 0 ? (
                <div className="font-medium dark:text-white text-base">
                  {selectedFiles.length} file(s) selected
                </div>
              ) : titleComponent ? (
                titleComponent
              ) : (
                <div className="font-medium dark:text-white text-base">
                  {clickFunction
                    ? "Click to upload"
                    : editable
                      ? "Drag here or click to upload"
                      : "File upload"}
                  {type || "photo"}
                </div>
              )}
              {subHeadingComponent ? (
                subHeadingComponent
              ) : (
                <>
                  <div className="text-xs mt-2">
                    Maximum file size is {maxSize || "1 MB"}
                  </div>
                  <div className="text-xs">
                    File must be in {acceptedFormats.join(", ").toUpperCase()}{" "}
                    formats.
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </label>
    </div>
  );
};

export default DragAndDropFileInput;
