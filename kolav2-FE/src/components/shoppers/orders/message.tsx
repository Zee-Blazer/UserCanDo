import {IMessage} from "@/types";

interface IMessageProps {
    msg: IMessage;
}

const Message = ({ msg }: IMessageProps) => (
    <div className={`flex w-full ${msg.sender?.toLowerCase() === "you" ? "justify-end" : "justify-start"}`}>
        <div className={"flex flex-col gap-1"}>
            <div className={`p-3 text-[14px] ${msg.sender?.toLowerCase() === "you" ? "bg-blue_pry rounded-t-[12px] rounded-bl-[12px] text-white" : "border-[1px] border-solid rounded-t-[12px] rounded-br-[12px]"} w-fit max-w-[400px]`}>
                {msg.content}
            </div>
            <div className={`flex flex-row items-center gap-2 text-[12px] font-[600] text-dark_gray ${msg.sender?.toLowerCase() === "you" ? "justify-end" : "justify-start"}`}>
                <span>{msg.sender}</span>
                <span className={"h-1 w-1 rounded-full bg-[#D9D9D9]"}/>
                <span>{msg.time}</span>
            </div>
        </div>
    </div>
)

export default Message;