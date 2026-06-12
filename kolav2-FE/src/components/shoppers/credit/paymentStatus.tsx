import { Typography } from "@material-tailwind/react";
import { X, Check } from "@phosphor-icons/react";

interface PaymentStatusProps {
  status: string;
  method: string;
  date: string;
  amount: string;
}

const PaymentStatus = ({
  status,
  method,
  date,
  amount,
}: PaymentStatusProps) => {
  const isSuccess = status == "success";

  return (
    <>
      <div className="flex justify-between px-2">
        <div className="flex items-start gap-x-2">
          <div className="pt-1">
            {isSuccess ? (
              <Check color="#6D7280" size={16} />
            ) : (
              <X color="#6D7280" size={16} />
            )}
          </div>
          <div>
            {isSuccess ? (
              <Typography className="font-semibold text-sm text-[#474A4E] pb-1 ">
                Payment Successful
              </Typography>
            ) : (
              <Typography className="font-semibold text-sm text-[#474A4E]">
                Payment Failed
              </Typography>
            )}

            <Typography className="text-xs text-[#6D7280]">
              {" "}
              via <span>{method}</span>{" "}
              <span className="text-[#0D121D]">/</span> <span>{date}</span>
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            className={`font-semibold ${
              isSuccess ? "text-[#22C55E]" : "text-[#EF4444]"
            } `}
          >
            {amount}
          </Typography>
        </div>
      </div>
      <hr className="border border-1 border-[#F1F1F1] border-opacity-40 my-2" />
    </>
  );
};

export default PaymentStatus;
