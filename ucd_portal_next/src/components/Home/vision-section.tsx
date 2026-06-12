import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { CodeXml, Users, Briefcase, MonitorCog, Quote } from "lucide-react";

const VisionSection = () => {
	const vision = [
		{
			icon: Users,
			title: "Product Strategy & Market Validation",
			description: "Ensure product-market fit before you build.",
		},
		{
			icon: CodeXml,
			title: "Technical Excellence & Scalability",
			description: "Enterprise-grade development that grows with you.",
		},
		{
			icon: MonitorCog,
			title: "Operational Efficiency",
			description:
				" Streamlined processes that reduce costs and increase productivity.",
		},
		{
			icon: Briefcase,
			title: "Revenue Growth",
			description:
				"New products and services that drive measurable business results.",
		},
	];

	return (
		<motion.div
			className='py-8 sm:py-12 lg:py-14 px-4 sm:px-8 lg:px-16 bg-[#014B39] my-8 sm:my-12 lg:my-16 mx-4 sm:mx-8 lg:mx-[120px] text-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px]'
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.8, ease: "easeOut" }}
		>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<Typography
					className='text-2xl sm:text-3xl lg:text-5xl text-center font-bold w-[95%] lg:w-[90%] mx-auto px-2'
					style={{ fontFamily: "Consolas, Monaco, monospace" }}
				>
					Beyond Development: Your Strategic Growth Partner
				</Typography>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.4 }}
			>
				<Typography
					className='text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 text-center w-[95%] sm:w-[85%] lg:w-[80%] mx-auto px-2'
					style={{ fontFamily: "Consolas, Monaco, monospace" }}
				>
					We don't just build and leave. Our partnership model ensures your
					financial technology initiatives succeed across every critical
					business function.
				</Typography>
			</motion.div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6'>
				{vision.map((prop, index) => {
					const IconComponent = prop.icon;
					return (
						<motion.div
							key={index}
							className='col-span-1 bg-[#FFFFFF1A] pb-6 sm:pb-8 rounded-2xl sm:rounded-3xl border border-[#FFFFFF4D] p-3 sm:p-4'
							initial={{ opacity: 0, y: 50, scale: 0.9 }}
							whileInView={{ opacity: 1, y: 0, scale: 1 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.6,
								delay: 0.6 + index * 0.1,
								ease: "easeOut",
							}}
							whileHover={{
								y: -10,
								scale: 1.02,
								boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
								transition: { duration: 0.3 },
							}}
						>
							<motion.div
								className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full mx-auto bg-[#FFFFFF33] flex items-center justify-center'
								whileHover={{
									scale: 1.1,
									backgroundColor: "rgba(255, 255, 255, 0.5)",
									transition: { duration: 0.3 },
								}}
							>
								<motion.div
									whileHover={{
										rotate: 360,
										transition: { duration: 0.5 },
									}}
								>
									<IconComponent className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white' />
								</motion.div>
							</motion.div>

							<Typography
								className='mt-3 text-center font-bold text-lg sm:text-xl px-2'
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

			{/* Our Vision Section */}
			<motion.div
				className='mt-8 sm:mt-12 lg:mt-16 bg-[#FFFFFF1A] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] flex flex-col lg:flex-row border border-[#FFFFFF4D] p-6 sm:p-8 lg:p-12'
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 1 }}
				whileHover={{
					scale: 1.02,
					boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
					transition: { duration: 0.3 },
				}}
			>
				<motion.div
					className='flex justify-center lg:justify-start mb-4 lg:mb-0 lg:mr-6'
					animate={{
						scale: [1, 1.1, 1],
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						repeatDelay: 2,
					}}
				>
					<Quote className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white' />
				</motion.div>
				<div className='flex-1'>
					<motion.div
						className='flex items-center justify-center gap-4 mb-6 sm:mb-8'
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 1.2 }}
					>
						<Typography
							className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center'
							style={{ fontFamily: "Consolas, Monaco, monospace" }}
						>
							Our Vision
						</Typography>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 1.4 }}
					>
						<Typography
							className='text-base sm:text-lg lg:text-xl text-center leading-relaxed w-full lg:w-[90%] mx-auto px-2'
							style={{ fontFamily: "Consolas, Monaco, monospace" }}
						>
							Long-term strategic partnership for comprehensive financial
							technology success across all 8 pillars of sustainable growth.
						</Typography>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default VisionSection;
