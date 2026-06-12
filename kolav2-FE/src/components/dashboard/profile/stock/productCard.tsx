import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  image: string | StaticImageData;
  productName: string;
  productVariant: string;
  productType: string;
  price: number;
  quantity: number;
  weight: number;
  onClose?: () => void;
}

export function ProductCard({
  id,
  image,
  productName,
  productVariant,
  productType,
  price,
  quantity,
  weight,
  onClose,
}: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/profile/stock/${id}`);
  };

  return (
    <Card className="max-w-[20rem] overflow-hidden cursor-pointer">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 bg-[#F9FAFB] relative py-2 flex justify-center rounded-none"
        onClick={handleCardClick}
      >
        <Image src={image} alt="product" />
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={(e) => {
            e.stopPropagation();
            onClose && onClose();
          }}
        >
          <X className="h-5 w-5 stroke-2" />
        </IconButton>
      </CardHeader>
      <CardBody
        className="flex flex-col gap-2 text-center"
        onClick={handleCardClick}
      >
        <div>
          <Typography className="font-semibold text-black">
            {productName} <span className="font-normal">{productVariant}</span>
          </Typography>
          <Typography className="font-normal text-black">
            {productType}
          </Typography>
        </div>
        <Typography variant="h4" className="text-[#B87C16]">
          GHS {price.toFixed(2)}
          <small>.{(price % 1).toFixed(2).substring(2)}</small>
        </Typography>
        <Typography>{quantity} pieces</Typography>
        <Typography>{weight}kg</Typography>
      </CardBody>
    </Card>
  );
}
