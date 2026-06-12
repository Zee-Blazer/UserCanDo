import { useState } from "react";
import SlideWrapper from "../slideWrapper";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import uploadLogo from "@/assets/images/uploadLogo.png";
import { DragAndDropFileInput } from "@/components/General/form";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useAuth } from "@/context/authContext";

function UploadBusinessLogoSlide() {
  const {
    prevSlide,
    setBusinessLogo: setFile,
    businessLogo: file,
    handleCreateBusiness,
    isBusinessCreating,
  } = useAuth();

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
    <SlideWrapper
      isDisabled={!file}
      onContinue={handleCreateBusiness}
      onBack={prevSlide}
      activeIndex={1}
      loading={isBusinessCreating}
    >
      <main>
        <div className="pt-6 pb-3">
          <div className="flex justify-between items-start gap-y-1 pb-5">
            <Typography className="text-2xl font-semibold text-[#0D121D] tracking-[-0.6px]">
              Upload your business logo.
            </Typography>
            <Typography className="font-semibold text-xs text-[#6F6F6F]">
              Step 4/4
            </Typography>
          </div>

          <Typography className="font-medium text-[13px] text-[#787486] ">
            Please upload a clear professional photo of your brand logo to
            personalize
            <br /> your profile. Your profile photo will be visible to other
            users and will
            <br /> represent your identity on Kola Market
          </Typography>
        </div>

        <div className="pt-6 pb-8 flex justify-center">
          {previewUrl ? (
            <div className="w-full rounded-lg overflow-hidden border border-gray-300 shadow-md p-2">
              <img
                src={previewUrl}
                alt="Uploaded Preview"
                className="w-full h-full max-h-[200px] object-contain"
              />
            </div>
          ) : (
            <Image
              src={uploadLogo}
              alt="Placeholder Logo"
              className="object-contain"
            />
          )}
        </div>

        <DragAndDropFileInput
          onFileSelect={handleFileSelect}
          id="logo"
          bgColor="#FEFAF4"
          borderColor="#F5AA29"
          borderWidth="1px"
          borderStyle="dashed"
          size="sm"
          icon={<CloudArrowUp />}
          titleComponent={
            <Typography className="text-sm pt-4">
              <span className="font-semibold">Click to Upload</span> or drag and
              drop{" "}
            </Typography>
          }
          subHeadingComponent={
            <Typography className="text-xs">PNG, JPG</Typography>
          }
          labelDirection="vertical"
        />
      </main>
    </SlideWrapper>
  );
}

export default UploadBusinessLogoSlide;
