import OtpInput from "react-otp-input";
import { Dispatch } from "react";

interface iOTP {
	OTP: string;
	setOTP: Dispatch<string>;
	length: number;
}

const OTP = ({ OTP, setOTP, length }: iOTP) => {
	return (
		<>
			<OtpInput
				value={OTP}
				onChange={setOTP}
				numInputs={4}
				renderSeparator={<span> </span>}
				inputStyle={{
					width: "100%",
					height: 80,
					backgroundColor: "#E6F2FC66",
					borderRadius: 10,
					margin: 6,
					fontSize: 20,
					fontWeight: "bold",
					color: "#0496FF",
				}}
				renderInput={(props) => <input {...props} />}
			/>
		</>
	);
};

export default OTP;
