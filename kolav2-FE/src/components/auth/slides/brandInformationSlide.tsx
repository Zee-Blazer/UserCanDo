import SlideWrapper from "../slideWrapper";
import { Typography } from "@material-tailwind/react";
import { InstagramIcon, FacebookIcon, WebsiteIcon } from "@/assets/svg";
import { useAuth } from "@/context/authContext";
import { FormInput, FormTextArea } from "@/components/General/form";

const BrandInformationSlide = () => {
	const {
		nextBusinessSlide,
		prevSlide,
		handleBusinessInputChange,
		businessProfileInputs,
	} = useAuth();

	return (
		<SlideWrapper
			isDisabled={!businessProfileInputs.year_established}
			onContinue={nextBusinessSlide}
			onBack={prevSlide}
			activeIndex={1}
		>
			<main>
				<div className='pt-6 pb-[10px]'>
					<div className='flex justify-between items-start gap-y-1 pb-5'>
						<Typography className='text-2xl font-semibold text-[#0D121D] tracking-[-0.6px]'>
							Tell us about your brand
						</Typography>
						<Typography className='font-semibold text-xs text-[#6F6F6F]'>
							Step 2/4
						</Typography>
					</div>

					<Typography className='font-medium text-[13px] text-[#787486] '>
						We want to get to know your business better so we can help you
						succeed.
					</Typography>
				</div>

				<FormInput
					label='Year Established'
					type='number'
					required
					name='year_established'
					value={businessProfileInputs.year_established}
					onChange={handleBusinessInputChange}
				/>

				<div className='pt-4'>
					<Typography className='font-medium text-base text-[#0D121D] pb-1'>
						Social Media Presence
					</Typography>
					<Typography className='text-[13px] font-medium text-[#787486]'>
						Please provide the handles for your brands social media accounts.
						This <br />
						will help us connect and collaborate with you effectively.
					</Typography>
				</div>
				<div className='flex flex-col gap-y-5 pt-2'>
					<FormInput
						label='Instagram'
						optional
						name='instagram'
						value={businessProfileInputs.instagram}
						onChange={handleBusinessInputChange}
						icon={<InstagramIcon />}
						iconPosition='left'
						placeholder='https://'
					/>

					<FormInput
						label='Facebook'
						optional
						icon={<FacebookIcon />}
						iconPosition='left'
						placeholder='https://www.facebook.com/examplebusiness'
						name='facebook'
						value={businessProfileInputs.facebook}
						onChange={handleBusinessInputChange}
					/>

					<FormInput
						label='Website'
						optional
						icon={<WebsiteIcon />}
						iconPosition='left'
						placeholder='https://'
						name='website'
						value={businessProfileInputs.website}
						onChange={handleBusinessInputChange}
					/>

					<div className='text-[#474A4E]'>
						<FormTextArea
							label='What are your goals and expectations for promoting your brand on Kola Market?'
							name='expectations'
							value={businessProfileInputs.expectations}
							onChange={handleBusinessInputChange}
						/>
					</div>
				</div>
			</main>
		</SlideWrapper>
	);
};

export default BrandInformationSlide;
