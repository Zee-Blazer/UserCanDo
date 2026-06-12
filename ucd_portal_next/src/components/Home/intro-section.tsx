import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Logo from "@/assets/images/ucd_logo.png";
import Highvoltage from "@/assets/images/high-voltage.png";
import Grouped from "@/assets/images/grouped.png";
import IntroMiniSection from "./intro-min-section";

const HomeIntroSection = () => {

    return (
        <div style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
            <motion.div 
                className="py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-28 h-auto lg:h-[754px] bg-[#F5F9FA] relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Image */}
                <motion.div 
                    className="absolute right-0 top-0 w-1/2 h-full opacity-30 lg:opacity-50 hidden sm:block"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Image
                        src={Grouped}
                        alt="Background Pattern"
                        fill
                        className="object-contain object-right"
                    />
                </motion.div>
                
                <motion.div 
                    className="flex justify-between items-center relative z-10 mb-8 lg:mb-0"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image src={ Logo } alt="Logo" width={50} height={50} className="sm:w-[62px] sm:h-[62px]" />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="https://calendly.com/usercando/info-call" target="_blank" rel="noopener noreferrer">
                            <Button
                                className="bg-[#014B39] rounded-lg font-bold text-xs sm:text-sm lg:text-base px-3 py-2 sm:px-4 sm:py-2 lg:px-6"
                                style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                            >Schedule A Call</Button>
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="text-center mt-8 sm:mt-12 lg:mt-20 relative z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div
                        className="text-[#014B39] flex items-center justify-center font-bold text-xs sm:text-sm lg:text-base uppercase max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] border mx-auto border-[#0072561A] px-3 sm:px-4 py-2 rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(1, 75, 57, 0.15)"
                        }}
                    >
                        <motion.div
                            animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        >
                            <Image src={ Highvoltage } alt="High Voltage" width={20} height={20} className="sm:w-[24px] sm:h-[24px] mr-1.5" />
                        </motion.div>
                        <span
                            className="ml-1.5 text-center whitespace-nowrap"
                            style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                        >Market - Ready Products</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Typography
                            className="text-[#014B39] font-bold text-2xl sm:text-3xl lg:text-5xl mt-4 lg:mt-6 px-4"
                            style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                        >
                            Turn Your Vision Into Market-Ready Products
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <Typography 
                            className="text-[#014B39] font-normal text-sm sm:text-lg mt-2 max-w-full sm:max-w-[85%] lg:max-w-[70%] mx-auto px-4"
                            style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                        >
                            We combine AI-powered speed with operator-led discipline to help established 
                            businesses launch new products and services that drive real revenue growth.
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="https://calendly.com/usercando/info-call" target="_blank" rel="noopener noreferrer">
                            <Button
                                className="bg-transparent border border-[#007256] text-[#014B39] rounded-lg font-bold mt-4 lg:mt-6 text-sm sm:text-base px-4 sm:px-6"
                                style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                            >
                                Schedule A Call
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>

            </motion.div>

            <div className='zoom-fix-container'>
                <IntroMiniSection />
            </div>
        </div>
    )
}

export default HomeIntroSection;
