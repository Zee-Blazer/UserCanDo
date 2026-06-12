import { useAppContext } from "@/app/context";
import { colors } from "@/constants/colors";
import React from "react";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";

interface KeeptrackChartProps {
	max: number;
	value: number;
}

const KeeptrackChart: React.FC<KeeptrackChartProps> = ({ max, value }) => {
	const { isDarkMode } = useAppContext();

	return (
		// Original Height h-[200px]
		<div className='flex flex-col items-center w-full h-[200px]'> 
			<ReactSpeedometer
				maxValue={max}
				value={value}
				segments={6}
				segmentColors={[
					"#A6241D",
					"#D2918E",
					"#C3A868",
					"#A67D1D",
					"#64AC7C",
					"#17823B",
				]}
				// height={120}
				needleColor={colors.pry}
				textColor={isDarkMode ? "#fff" : "#000"}
				ringWidth={20}
				needleTransitionDuration={4000}
				needleTransition={Transition.easeQuadInOut}
				currentValueText={`${value}`}
				labelFontSize={"0px"}
				valueTextFontSize='24px'
			/>
		</div>
	);
};

export default KeeptrackChart;
