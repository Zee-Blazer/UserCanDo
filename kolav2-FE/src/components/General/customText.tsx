import { Typography } from "@material-tailwind/react";
import React from "react";

interface CustomTextProps {
	lang: string;
	content: string;
}
const CustomText = ({ content, lang, ...rest }: CustomTextProps) => {
	const translate = () => {
		//do something
	};
	return <Typography {...rest}>{content}</Typography>;
};

export default CustomText;
