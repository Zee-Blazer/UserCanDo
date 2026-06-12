import React from "react";

interface IconContainerProps {
	icon: React.ReactNode;
	onClick?: () => void;
}
const IconContainer = ({ icon, onClick }: IconContainerProps) => {
	return (
		<div
			onClick={onClick}
			className='border-[1px] w-14 h-14 rounded-md flex items-center justify-center dark:border-borderDark border-borderLight'
		>
			{icon}
		</div>
	);
};

export default IconContainer;
