import Image from "next/image";
import buyerImage from "@/assets/images/buyer_form.png";
import yelloStar from "@/assets/images/yellow_star.svg";
import appStore from "@/assets/images/app_store.svg";
import playStore from "@/assets/images/play_store.svg";
import { Button, Typography } from "@material-tailwind/react";
import blackStar from "@/assets/images/black_star.svg";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const BuyerFormFinalSlide = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden font-outfit">
      <section
        className="z-10 flex w-full flex-col justify-center p-5 md:w-full lg:w-[45%]"
        aria-labelledby="landing-header"
      >
        <div className="mx-auto w-full lg:max-w-[85%]">
          <article
            className="flex w-full flex-col justify-center"
            aria-labelledby="landing-article-header"
          >
            <div className="max-w-[400px]">
              <Image src={yelloStar} alt="Yellow star" />
              <Typography
                variant="h2"
                className="text-2xl md:text-3xl leading-normal mt-3 font-semibold"
              >
                Download the mobile app to begin shopping and unlock the best
                deals
              </Typography>
            </div>
            <div className="flex flex-col md:flex-row max-w-[460px] items-center">
              <Typography className="font-normal text-gray_4 mt-4 md:mr-4">
                Click to download and join the vibrant community of retailers
                who are discovering new products and start maximizing your sales
                potential today
              </Typography>
              <Image
                src={blackStar}
                alt="Black star"
                className="w-11 h-11 mt-2 md:mt-0"
              />
            </div>
          </article>

          <div>
            <div className="flex flex-row mt-10 gap-4">
              <Button className="normal-case px-4 py-2 flex items-center bg-black text-white rounded-lg mb-4 md:mb-0">
                <Image
                  src={appStore}
                  alt="App Store"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-normal">Available on the</span>
                  <span className="text-base font-semibold -mt-1">
                    App Store
                  </span>
                </div>
              </Button>
              <Button className="normal-case px-4 py-2 flex items-center bg-black text-white rounded-lg mb-4 md:mb-0">
                <Image
                  src={playStore}
                  alt="App Store"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-normal">Available on the</span>
                  <span className="text-base font-semibold -mt-1">
                    Google Store
                  </span>
                </div>
              </Button>
            </div>
            <Link href={ROUTES.home}>
              <Button
                variant="text"
                className="mt-8 w-full max-w-xs text-center items-center justify-center gap-3 bg-blue_pry bg-opacity-10 text-pry2 py-3 px-6 flex normal-case rounded shadow-md font-semibold"
              >
                <Typography className="font-semibold text-lg">
                  Continue with browser
                </Typography>
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <aside
        className="hidden md:block absolute right-0 top-0 bottom-0 w-0 md:w-[55%] overflow-y-auto"
        aria-label="Welcome image"
      >
        <div className="relative w-full min-h-screen">
          <Image
            src={buyerImage}
            alt="Buyer form welcome"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center"
          />
        </div>
      </aside>
    </div>
  );
};

export default BuyerFormFinalSlide;
