import { Typography } from "@material-tailwind/react";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

export default function ValidationErrorCheck({
  status,
  label,
}: {
  status: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-x-1">
      {status ? (
        <CheckCircle size={20} color="green" />
      ) : (
        <XCircle size={20} color="red" />
      )}
      <Typography className="text-sm text-[#787486] font-normal ">
        {label}
      </Typography>
    </div>
  );
}
