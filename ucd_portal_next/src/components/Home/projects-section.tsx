
import Image from "next/image";
import { motion } from "framer-motion";
import Kola from "@/assets/images/kola.png";
import Fidelity from "@/assets/images/fidelity.png";
import Keepingly from "@/assets/images/keepingly.png";
import Ruff from "@/assets/images/ruff.png";
import Heart from "@/assets/images/heart.png";
import Nexfund from "@/assets/images/nexfund.png"

const ProjectSection = () => {
    const logos = [
        { src: Kola, alt: "Kola" },
        { src: Fidelity, alt: "Fidelity" },
        { src: Keepingly, alt: "Keepingly" },
        { src: Ruff, alt: "Ruff n Tumble" },
        { src: Heart, alt: "Heart" },
        { src: Nexfund, alt: "NexFund" }
    ];

    return (
        <motion.div 
            className="bg-[#F5F9FA] my-11 py-4 px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-center gap-12 flex-wrap opacity-60">
                    {logos.map((logo, index) => (
                        <motion.div
                            key={logo.alt}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            whileHover={{ 
                                scale: 1.1,
                                y: -5,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image 
                                src={logo.src} 
                                alt={logo.alt} 
                                width={120} 
                                height={66} 
                                className="grayscale hover:grayscale-0 transition-all duration-300" 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectSection;
