import { Typography } from "@material-tailwind/react";
import { CodeXml, MessagesSquare, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import AI_Integration from "@/assets/images/AI-integration.jpg";
import Launch from "@/assets/images/launch.jpg";
import Strategic from "@/assets/images/Strategic-product.jpg";

const OurServiceSection = () => {
	const services = [
		{
			icon: MessagesSquare,
			title: "Strategic Financial Technology Development",
			description: "From concept to compliant launch",
		},
		{
			icon: CodeXml,
			title: "Platform Modernization & Integration",
			description: "When existing systems limit growth.",
		},
		{
			icon: Rocket,
			title: "Rapid Product Development",
			description: "Market-ready solutions in weeks, not months",
		},
	];

	const serviceDetails = [
		{
			title: "Strategic Product Development",
			description:
				"Transform your business vision into market-ready products and services, we guide you through validation, development, and launch while ensuring every decision is backed by customer evidence and market data.",
			image: Strategic,
			direct: true,
		},
		{
			title: "Digital Transformation & Modernization",
			description:
				"Transform legacy technology environments into modern, scalable  platforms. We eliminate bottlenecks across product development,  operations, and technical infrastructure while ensuring seamless  integration with existing systems.",
			image: Launch,
			direct: false,
		},
		{
			title: "AI Integration and Automation",
			description:
				"Implement practical AI solutions that drive measurable business outcomes. From process automation to customer experience enhancement, we make AI accessible and profitable for your business.",
			image: AI_Integration,
			direct: true,
		},
		{
			title: "Enterprise Product Launch",
			description:
				"Launch new revenue streams quickly with our proven methodology. We handle the technical complexity while you focus on strategy, ensuring your new products succeed in the market.",
			image: Launch,
			direct: false,
		},
	];

	return (
		<motion.div
			className='bg-[#F5F9FA] px-4 sm:px-8 md:px-16 lg:px-[8%] xl:px-[10%] 2xl:px-[12%] py-12 md:py-[72px] pb-[14px] min-h-fit'
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.8 }}
		>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<Typography
					className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center font-bold max-w-4xl mx-auto'
					style={{ fontFamily: "Consolas, Monaco, monospace" }}
				>
					Our Services
				</Typography>
				<Typography
					className='mt-3 text-center w-full sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] mx-auto text-sm sm:text-base lg:text-lg leading-relaxed'
					style={{ fontFamily: "Consolas, Monaco, monospace" }}
				>
					Proven approaches to transform your business vision into market-ready
					products that drives revenue growth
				</Typography>
			</motion.div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 mt-8 lg:mt-12 max-w-7xl mx-auto'>
				{services.map((prop, index) => {
					const IconComponent = prop.icon;
					return (
						<motion.div
							key={index}
							className='col-span-1 flex flex-col items-center'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.6,
								delay: index * 0.2,
								ease: "easeOut",
							}}
							whileHover={{
								y: -8,
								transition: { duration: 0.3 },
							}}
						>
							<motion.div
								className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full bg-[#0072561A] flex items-center justify-center flex-shrink-0'
								whileHover={{
									scale: 1.1,
									backgroundColor: "#014B39",
									transition: { duration: 0.3 },
								}}
							>
								<motion.div
									whileHover={{
										rotate: 360,
										transition: { duration: 0.5 },
									}}
								>
									<IconComponent
										className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-[#014B39]'
										style={{ color: "inherit" }}
									/>
								</motion.div>
							</motion.div>

							<Typography
								className='mt-4 lg:mt-6 text-center font-bold text-lg sm:text-xl lg:text-2xl px-2 max-w-xs'
								style={{ fontFamily: "Consolas, Monaco, monospace" }}
							>
								{prop.title}
							</Typography>
							<Typography
								className='text-center text-sm sm:text-base lg:text-lg mt-3 lg:mt-4 px-2 max-w-sm leading-relaxed'
								style={{ fontFamily: "Consolas, Monaco, monospace" }}
							>
								{prop.description}
							</Typography>
						</motion.div>
					);
				})}
			</div>

			{serviceDetails.map((service, index) => (
				<motion.div
					key={index}
					className={`my-12 lg:my-16 xl:my-20 max-w-7xl mx-auto`}
					initial={{ opacity: 0, x: service.direct ? -100 : 100 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{
						duration: 0.8,
						delay: 0.2,
						ease: "easeOut",
					}}
				>
					<div
						className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center ${
							!service.direct ? "lg:grid-flow-col-dense" : ""
						}`}
					>
						<motion.div
							className={`w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px] bg-cover bg-center bg-no-repeat rounded-tl-[40px] rounded-bl-[40px] rounded-br-[40px] shadow-lg ${
								!service.direct ? "lg:col-start-2" : ""
							}`}
							style={{
								backgroundImage: `url(${service.image.src})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
							whileHover={{
								scale: 1.02,
								transition: { duration: 0.3 },
							}}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}
						></motion.div>
						<motion.div
							className={`px-4 lg:px-0 ${
								!service.direct ? "lg:col-start-1 lg:row-start-1" : ""
							}`}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<Typography
								className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 lg:mb-6 xl:mb-8 text-center lg:text-left'
								style={{ fontFamily: "Consolas, Monaco, monospace" }}
							>
								{service.title}
							</Typography>
							<Typography
								className='text-base lg:text-lg xl:text-xl leading-relaxed text-gray-700 text-center lg:text-left max-w-none lg:max-w-lg xl:max-w-xl'
								style={{ fontFamily: "Consolas, Monaco, monospace" }}
							>
								{service.description}
							</Typography>
						</motion.div>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
};

export default OurServiceSection;
