import SlideWrapper from "../slideWrapper";
import smiling_kola_vendor from "@/assets/images/smiling_kola_vendor.png";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import ActionButton from "../continueAction";
import { WhatsappLogo } from "@phosphor-icons/react";
import blackStar from "@/assets/images/black_star.svg";
import whiteStar from "@/assets/images/white_star.svg";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

function FinalSignUpSlide() {
	const { prevSlide } = useAuth();
	const router = useRouter();
	return (
		<SlideWrapper
			onContinue={() => router.push(ROUTES.login)}
			onBack={prevSlide}
			activeIndex={1}
			noButton
		>
			<main className='pt-6'>
				<Image src={smiling_kola_vendor} alt='smiling Kola vendor' />
				<div className='relative'>
					<Image
						className='absolute top-4 left-[-16px]'
						src={whiteStar}
						alt='white star'
					/>
					<Image
						className='absolute top-14 right-0'
						src={blackStar}
						alt='black star'
					/>
					<Typography className='text-2xl font-semibold text-[#0D121D] tracking-[-0.6px] pb-4 pt-9'>
						You Are On The Waitlist!
					</Typography>
					<Typography className='font-medium text-[13px] text-[#787486] pb-6'>
						Congratulations! Your application to trade on Kola Market has been
						sent for approval. This Usually takes between 24 - 72 hours. In the
						meantime you can reach out to us for inquiries.
					</Typography>
					<ActionButton
						action={() => router.push(ROUTES.login)}
						label='Continue to Shopping'
						paddingY='0'
					/>
					<div className='pt-4 flex items-center justify-center cursor-pointer'>
						<WhatsappLogo color='#027A48' size='18px' />
						<Typography className='text-[#027A48] font-medium text-sm'>
							Click to chat with an admin on Whatsapp.
						</Typography>
					</div>
				</div>
			</main>
		</SlideWrapper>
	);
}

export default FinalSignUpSlide;
