
import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "@/assets/images/ucd_logo.png";
import { Typography, Button } from "@material-tailwind/react";

const FooterSection = ()  => {

    return (
        <motion.div 
            className="flex flex-col sm:flex-row items-center justify-between border-t border-t-[#00725626] pt-6 sm:pt-[53px] mt-8 sm:mt-[32px] mx-4 sm:mx-8 lg:mx-[120px] gap-4 sm:gap-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                }}
            >
                <Image src={Logo} alt="UserCanDo Logo" width={50} height={50} className="sm:w-[62px] sm:h-[62px]" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Typography
                    className="text-sm sm:text-base text-center sm:text-left"
                    style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                >
                    &copy; 
                    Copyright 2025 | UserCanDo
                </Typography>
            </motion.div>
        </motion.div>
    )
}

export default FooterSection;
