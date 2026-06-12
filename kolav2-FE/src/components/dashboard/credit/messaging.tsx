import React from "react";
import { CancelIcon, SendIcon } from "@/assets/svg";
import Message from "@/components/shoppers/orders/message";

const Messaging = () => {

  const messages = [    {
        content: "Hello.",
        sender: "You",
        time: "12:41 pm"
    },
    {
        content: "Hi, how can I be of help?",
        sender: "admin",
        time: "12:41 pm"
    },]

  return (
    <div
      className={
        "w-full max-w-[840px] rounded-[24px] bg-white h-full drop-shadow-sm flex flex-col justify-end"
      }
    >
      <div
        className={
          "px-5 py-4 flex flex-col justify-end gap-2 h-[calc(100vh-390px)] overflow-y-auto"
        }
      >
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
      </div>
      <div className={"flex flex-row  p-5"}>
        <div
          className={
            "border-[#D2D5DA] border-solid border-[1px] bg-[#F9FAFB] rounded-[6px] w-full flex flex-row items-center justify-between"
          }
        >
          <input
            type={"text"}
            className={
              "flex-1 h-full w-full bg-transparent p-3 outline-none text-black_1"
            }
            placeholder={"Type here..."}
          />
          <button className={"mr-3"}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
