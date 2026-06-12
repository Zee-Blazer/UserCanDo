import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { CodeXml, RefreshCcw, Sparkles } from "lucide-react";

const IntroMiniSection = () => {
	const valueProps = [
		{
			icon: CodeXml,
			title: "Strategic Product Development",
			description: "From concept to market launch",
		},
		{
			icon: RefreshCcw,
			title: "Digital Transformation",
			description: "Modernize operations and unlock growth",
		},
		{
			icon: Sparkles,
			title: "AI Integration",
			description: "Practical AI Implementation that drives results",
		},
	];

	return (
		<motion.div
			className='bg-white py-6 sm:py-8 px-4 sm:px-8 lg:px-12 shadow-lg rounded-[20px] sm:rounded-[40px] w-[95%] sm:w-[85%] lg:w-[75%] mx-auto -mt-2 md:-mt-4 lg:-mt-36 relative z-20'
			initial={{ opacity: 0, y: 100, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.8,
				delay: 1.4,
				ease: "easeOut",
			}}
			whileHover={{
				y: -5,
				boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.8 }}
			>
				<Typography
					className='text-[#1E1E1E] font-bold text-xl sm:text-2xl lg:text-3xl text-center capitalize px-2'
					style={{ fontFamily: "Consolas, Monaco, monospace" }}
				>
					Why Estabilished Businesses Choose UserCanDo
				</Typography>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 2 }}
			>
				<Typography
					className='text-sm sm:text-base lg:text-lg mt-3 sm:mt-5 text-[#3E3B3B] w-[95%] sm:w-[90%] lg:w-[85%] mx-auto text-center px-2'
					style={{ fontFamily: "Consolas, Monaco, monospace" }}
				>
					We don't just build products-we create comprehesive solutions that
					drives real business results. Our approach combines deep market
					understanding with technical excellence, ensuring every product we
					build becomes a competitive advantage.
				</Typography>
			</motion.div>

			<motion.div
				className='bg-[#014B39] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mt-4 text-white'
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, delay: 2.2 }}
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 2.4 }}
				>
					<Typography
						className='text-center font-bold text-lg sm:text-xl lg:text-2xl text-white mb-6 sm:mb-8'
						style={{ fontFamily: "Consolas, Monaco, monospace" }}
					>
						Value Props:
					</Typography>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6'>
					{valueProps.map((prop, index) => {
						const IconComponent = prop.icon;
						return (
							<motion.div
								key={index}
								className='col-span-1'
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: 2.6 + index * 0.2,
									ease: "easeOut",
								}}
								whileHover={{
									y: -5,
									transition: { duration: 0.3 },
								}}
							>
								<motion.div
									className='w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto bg-[#ffffff4A] flex items-center justify-center'
									whileHover={{
										scale: 1.1,
										backgroundColor: "rgba(255, 255, 255, 0.7)",
										transition: { duration: 0.3 },
									}}
								>
									<motion.div
										whileHover={{
											rotate: 360,
											transition: { duration: 0.5 },
										}}
									>
										<IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
									</motion.div>
								</motion.div>

								<Typography
									className='mt-3 text-center font-bold text-base sm:text-lg lg:text-xl px-2'
									style={{ fontFamily: "Consolas, Monaco, monospace" }}
								>
									{prop.title}
								</Typography>
								<Typography
									className='text-center text-sm sm:text-base w-full sm:w-[85%] lg:w-[78%] mx-auto mt-2 sm:mt-3 px-2'
									style={{ fontFamily: "Consolas, Monaco, monospace" }}
								>
									{prop.description}
								</Typography>
							</motion.div>
						);
					})}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default IntroMiniSection;
