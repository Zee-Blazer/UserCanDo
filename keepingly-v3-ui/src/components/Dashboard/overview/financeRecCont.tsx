import { Typography } from "@material-tailwind/react";

import { TrendingUp } from "lucide-react";

interface Props {
    amount: string,
    rate?: string
}

const FinanceRecCont = ({ amount, rate }: Props) => {

    return (
        <div className="flex bg-pry items-center justify-between mt-14 w-full bg-[#A61D4A29] py-4 px-4">
            <Typography className="text-4xl dark:text-white text-white font-semibold">
                { amount }
            </Typography>
            {
                rate &&
                <Typography className="flex text-[11px] items-center text-white font-bold dark:text-white">
                    {/* <TrendingUp className="text-white w-[13px] h-[13px] mr-0.5" /> */}
                    { rate }
                </Typography>
            }
        </div>
    )
}

export default FinanceRecCont;
