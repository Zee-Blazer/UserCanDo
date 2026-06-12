import React from "react";
import Countdown from "react-countdown";

interface CountDownTimerProps {
	durationInSeconds: number;
	onComplete: () => void;
	className?: string;
}
const CountDownTimer = ({
	durationInSeconds,
	onComplete,
	className,
}: CountDownTimerProps) => {
	const renderer = ({ minutes, seconds, completed }: any) => {
		if (completed) {
			onComplete();
		} else {
			return (
				<span className={className}>
					{minutes}:{seconds}
				</span>
			);
		}
	};
	return (
		<Countdown
			date={Date.now() + 1000 * durationInSeconds}
			renderer={renderer}
		/>
	);
};

export default CountDownTimer;
