import { FacebookIcon, InstagramIcon, TiktokIcon } from "@/assets/icons";
import { Typography } from "@material-tailwind/react";
import React from "react";
import FooterNavs from "./footerNavs";

const AuthLayerFooter = () => {
  return (
    <div>
      <FooterNavs />
      <Typography>
        Copyright © {new Date().getFullYear()} Keepingly. <br /> All rights
        reserved.{" "}
      </Typography>
      <div className="flex gap-2 mt-6 dark:text-gray_0">
        <a
          href="https://web.facebook.com/keepingly?_rdc=1&_rdr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          <FacebookIcon />
        </a>

        <a
          href="https://www.instagram.com/keepingly/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          <InstagramIcon />
        </a>
      </div>
    </div>
  );
};

export default AuthLayerFooter;
