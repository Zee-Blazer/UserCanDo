import React from "react";
import AuthNavigation from "./authNavigation";
import ActionButton from "./continueAction";
import { ArrowLeft } from "lucide-react";

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
		<div className='max-w-lg mx-auto min-h-[60vh] p-4'>
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
