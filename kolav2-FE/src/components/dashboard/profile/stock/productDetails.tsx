import React, { useState } from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { BinIcon, Share } from "@/assets/svg";
import { ChevronLeft } from "lucide-react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import crunch from "@/assets/images/crunch.png";
import UpdateStockFlyout from "./updateStockFlyout";
import { TrashModal } from "./modal/trashModal";
import { useRouter } from "next/navigation";

const ProductDetails = ({ product }: any) => {
  const router = useRouter();
  if (!product) return null;
  const [isUpdateStockOpen, setIsUpdateStockOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleUpdateStock = () => {
    setIsUpdateStockOpen(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className="px-4 md:px-0">
      <header className="flex justify-between items-center">
        <button onClick={handleGoBack} className="flex gap-2 items-center">
          <ChevronLeft color="#0052A3" />
          <span className="text-[#0052A3] font-semibold">Product Details</span>
        </button>
        <div className="relative border rounded-md py-2 border-gray_2 text-gray_4">
          <button className="px-4 left-0 flex gap-3 h-full top-0 items-center justify-center cursor-pointer">
            <Share />
            <span>Share</span>
          </button>
        </div>
      </header>
      <section className="flex flex-col mt-6 md:mt-8 justify-center items-center">
        <div className="w-full max-w-[24rem]">
          <Card className="w-full overflow-hidden cursor-pointer">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 bg-[#F9FAFB] relative py-4 flex justify-center rounded-none"
            >
              <div className="w-48 h-48 relative">
                <Image
                  src={crunch}
                  alt="product"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex flex-col">
                  <Typography className="font-semibold text-black">
                    Catalina Crunch <span className="font-normal">Peanut</span>
                  </Typography>
                  <Typography className="font-normal text-black">
                    Butter Sandwich Cookies
                  </Typography>
                </div>
                <Typography variant="h5" className="text-[#B87C16]">
                  GHS 109
                  <small>.99</small>
                </Typography>
              </div>
              <Typography>86 pieces</Typography>
              <div className="flex justify-between">
                <Typography>20 in stock</Typography>
                <button onClick={handleDeleteClick}>
                  <BinIcon color="#B42318" />
                </button>
              </div>
            </CardBody>
          </Card>
          <Button
            onClick={handleUpdateStock}
            className="w-full bg-[#007AF5] normal-case mt-4"
          >
            <Typography className="text-white font-normal">
              Update Stock
            </Typography>
          </Button>
        </div>
      </section>
      <UpdateStockFlyout
        isStockOpen={isUpdateStockOpen}
        closeFlyout={() => setIsUpdateStockOpen(false)}
      />
      <TrashModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default ProductDetails;
