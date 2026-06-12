import OtpInput from "react-otp-input";
import { iOTP } from "./formTypes";

const OTP = ({
  OTP,
  setOTP,
  length,
  height,
  width,
  textColor,
  bgColor,
  borderColor,
  borderWidth,
  inputType,
}: iOTP) => {
  return (
    <>
      <OtpInput
        value={OTP}
        onChange={setOTP}
        numInputs={length ?? 4}
        renderSeparator={<span> </span>}
        inputType={inputType || "tel"}
        inputStyle={{
          width: width ?? "100%",
          height: height ?? 80,
          backgroundColor: bgColor ?? "#E6F2FC66",
          borderRadius: 10,
          margin: 6,
          fontSize: 20,
          fontWeight: "bold",
          color: textColor ?? "#0496FF",
          borderColor: borderColor ?? "transparent",
          borderWidth: borderWidth ?? 0,
        }}
        renderInput={(props) => <input {...props} />}
      />
    </>
  );
};

export default OTP;
