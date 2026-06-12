import React from "react";
import { ArrowLeft } from "lucide-react";
import AuthNavigation from "@/components/auth/authNavigation";
import ActionButton from "@/components/auth/continueAction";

interface SlideWrapperProps {
	children: React.ReactNode;
	onContinue?: () => void;
	isDisabled?: boolean;
	onBack?: () => void;
	activeIndex?: number;
	noButton?: boolean;
	paddingY?: string;
	loading?: boolean;
}
const SlideWrapper = ({
	children,
	onContinue,
	isDisabled,
	onBack,
	activeIndex = 0,
	noButton,
	paddingY,
	loading,
}: SlideWrapperProps) => {
	return (
		<div className='max-w-lg mx-auto min-h-[60vh]'>
			<AuthNavigation onBack={onBack} activeIndex={activeIndex} visible />
			{children}
			<div className='flex-1' />
			{!noButton && (
				<ActionButton
					action={onContinue}
					label='Continue'
					disabled={isDisabled}
					icon={<ArrowLeft />}
					paddingY={paddingY && paddingY}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default SlideWrapper;
