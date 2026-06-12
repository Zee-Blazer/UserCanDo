import { Typography } from "@material-tailwind/react";

interface Props {
    progress: string
}

const ProgressMiddleCont = ({ progress }: Props) => {

    return (
        <div className="mt-4 w-full">
            <div className="bg-[#0000000A] h-14">
                <div 
                    className={`h-full  bg-pry`} 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="flex w-full">
                <Typography style={{ width: `${progress}%` }}>
                    0
                </Typography>
                <Typography className="">
                    <span className="text-[#a61d4a] font-bold">{ progress }</span>/100
                </Typography>
            </div>
        </div>
    )
}

export default ProgressMiddleCont;
