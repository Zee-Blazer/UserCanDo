import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import cartBasket from "@/assets/images/cart_basket.png";
import { useRouter } from "next/navigation";

const NoFavorites = ({
  updateActiveTabIndex,
}: {
  updateActiveTabIndex: (value: number) => void;
}) => {
  const router = useRouter();

  const startShopping = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 md:w-1/2 lg:w-1/3 mx-auto text-center font-inter">
      <Image
        src={cartBasket}
        alt="empty shopping basket"
        width={240}
        height={240}
        className=""
      />
      <Typography className="font-bold text-2xl">No saved items</Typography>
      <Typography className="">
        Looks like your haven't saved anything yet. Add items to get started
      </Typography>
      <Button
        className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4 disabled:text-[#474A4E]`}
        onClick={startShopping}
      >
        Start Shopping
      </Button>
    </div>
  );
};

export default NoFavorites;
