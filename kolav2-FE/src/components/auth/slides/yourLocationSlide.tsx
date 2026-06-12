import SlideWrapper from "../slideWrapper";
import { Typography, Button } from "@material-tailwind/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useAuth } from "@/context/authContext";
import { FormInput } from "@/components/General/form";

function YourLocationSlide() {
	const {
		nextBusinessSlide,
		prevSlide,
		businessProfileInputs,
		handleBusinessInputChange,
	} = useAuth();

	return (
		<SlideWrapper
			isDisabled={
				!businessProfileInputs.business_headquarters ||
				!businessProfileInputs.region_two ||
				!businessProfileInputs.city_two
			}
			onContinue={nextBusinessSlide}
			onBack={prevSlide}
			activeIndex={1}
		>
			<main>
				<div className='pt-6 pb-3'>
					<div className='flex justify-between items-start gap-y-1 pb-5'>
						<Typography className='text-2xl font-semibold text-[#0D121D] tracking-[-0.6px]'>
							Your Location
						</Typography>
						<Typography className='font-semibold text-xs text-[#6F6F6F]'>
							Step 3/4
						</Typography>
					</div>

					<Typography className='font-medium text-[13px] text-[#787486] '>
						We want to get to know your business better so we can help you
						succced.
					</Typography>
				</div>

				<form className='flex flex-col gap-y-4'>
					<div>
						<FormInput
							label='Business Headquarters'
							required
							name='business_headquarters'
							value={businessProfileInputs.business_headquarters}
							onChange={handleBusinessInputChange}
						/>
						<Button
							variant='text'
							className='flex gap-x-2 items-center pt-4 px-0'
						>
							<PaperPlaneTilt size='16px' color='#4AA2FB' />
							<Typography
								className={`text-xs font-semibold  lowercase text-[#4AA2FB] `}
							>
								<span className='capitalize'>Use</span> Current Location
							</Typography>
						</Button>
					</div>
					<FormInput
						label='Region'
						name='region_two'
						value={businessProfileInputs.region_two}
						onChange={handleBusinessInputChange}
						placeholder='Enter Region'
						// options={["Accra", "Bono", "East", "Northern"]}
						required
					/>

					<FormInput
						label='City'
						required
						name='city_two'
						value={businessProfileInputs.city_two}
						onChange={handleBusinessInputChange}
					/>
					<FormInput
						label='TIN Number'
						optional
						name='tin_number'
						value={businessProfileInputs.tin_number}
						onChange={handleBusinessInputChange}
						type='text'
					/>
				</form>
			</main>
		</SlideWrapper>
	);
}

export default YourLocationSlide;
