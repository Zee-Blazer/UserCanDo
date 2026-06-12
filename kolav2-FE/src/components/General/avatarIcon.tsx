import Image from "next/image";
import { StaticImageData } from "next/image";

function AvatarIcon({ logo }: { logo: string | StaticImageData }) {
  return (
    <Image
      src={logo}
      className="w-10 h-10 rounded-full object-cover"
      alt="logo"
    />
  );
}

export default AvatarIcon;
