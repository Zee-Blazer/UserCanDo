
import { Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import BG_Image from "@/assets/images/bg-img.jpg";

const ScheduleAppointmentSection = () => {

    return (
        <motion.div 
            className="h-[350px] sm:h-[280px] lg:h-[305px] bg-cover bg-center bg-no-repeat bg-[#014B39] relative"
            style={{ backgroundImage: `url(${BG_Image.src})` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 bg-[#014B39] bg-opacity-85"></div>
            <motion.div 
                className="relative z-10 flex flex-col justify-center h-full px-4 sm:px-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Typography
                        className="text-2xl sm:text-3xl lg:text-5xl text-center font-bold w-[95%] lg:w-[90%] mx-auto text-white"
                        style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                    >
                        Beyond Development: Your Strategic Growth Partner
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Typography
                        className="text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 text-center w-[95%] sm:w-[85%] lg:w-[80%] mx-auto text-white"
                        style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                    >
                        We don't just build and leave. Our partnership model ensures your  financial 
                        technology initiatives succeed across every critical business  function.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex justify-center"
                >
                    <motion.div
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="https://calendly.com/usercando/info-call" target="_blank" rel="noopener noreferrer">
                            <Button
                                className="bg-white text-[#014B39] text-sm sm:text-base rounded-lg font-bold mt-6 sm:mt-8 px-8 sm:px-16 lg:px-32"
                                style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                            >
                                Schedule Appointment
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default ScheduleAppointmentSection;
