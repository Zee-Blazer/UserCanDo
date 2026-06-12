import {IOrderUpdate} from "@/types";
import {InTransitIcon, MarkIcon} from "@/assets/svg";

interface IOrderTrackerItemProps {
    update: IOrderUpdate;
    isLast: boolean;
    afterDone: boolean;
}

const OrderTrackerItem = ({ update, isLast, afterDone }:  IOrderTrackerItemProps) => (
    <div className={"flex flex-row gap-3"}>
        <div className={"flex flex-col items-center"}>
            {update.done ? (
                <div className={"h-[32px] w-[32px] rounded-full bg-[#E0F0FF] flex flex-row justify-center items-center"}>
                    <MarkIcon color={"#007AF5"} className={"h-[14px] w-[14px]"}/>
                </div>
            ) : (
                <div
                    className={"h-[32px] w-[32px] rounded-full bg-[#F1F1F1] flex flex-row justify-center items-center"}>
                    <InTransitIcon />
                </div>
            )}
            {!isLast && <div className={`w-[2px] h-[24px] ${afterDone ? "bg-[#E0F0FF]" : "bg-[#F1F1F1]"}`}/>}
        </div>
        <div className={"flex flex-col"}>
            <p className={`${update.done ? "text-black_0" : "text-dark_gray"} font-[600] text-[14px]`}>
                {update.title}
            </p>
            <p className={`text-[12px] font-[400] ${update.done ? "text-black_1" : "text-[#D2D5DA]"}`}>
                {update.time}
            </p>
        </div>
    </div>
)

export default OrderTrackerItem;