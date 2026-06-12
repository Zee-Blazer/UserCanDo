import React from "react";
import sadImage from "@/assets/images/sad-circle.png";
import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src={sadImage} alt="Sad Image" width={150} height={150} />
      <p className="text-2xl font-bold mt-4">No Result Found</p>
      <p className="mb-4">Please try again.</p>
    </div>
  );
};

export default EmptyState;
