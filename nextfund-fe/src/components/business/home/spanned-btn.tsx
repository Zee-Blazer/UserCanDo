
import { ReactNode } from "react";


type BtnType = "default" | "danger" | "muted" | "primary" | "grass" | "border-danger";

interface SpannedBtnConfig {
    text: ReactNode;
    type?: BtnType;
    func?: () => void;
    loading?: boolean;
    inactive?: boolean;
    className?: string;
}

interface SpannedBtnProps {
    buttons: Array<{ text: ReactNode; type?: BtnType; func?: () => void; loading?: boolean; inactive?: boolean; className?: string }>;
    className?: string;
}

const BTN_CLASS_MAP: Record<string, string> = {
    default: "py-3 border border-[#EEF1F4] bg-white text-[#272932] rounded-[12px] text-base transition-colors duration-150 cursor-pointer hover:bg-[#EEF1F4] hover:text-[#272932]",
    muted: "py-3 border border-[#EEF1F4] bg-transparent text-[#ADACAC] rounded-[12px] text-base transition-colors duration-150 cursor-pointer hover:bg-[#EEF1F4] hover:text-[#272932]",
    danger: "py-3 border border-[#EEF1F4] bg-[#FF3F21] text-white rounded-[12px] text-base transition-colors duration-150 cursor-pointer hover:bg-[#d32f13]",
    grass: "py-3 border border-[#33CC33] bg-[#33CC33] text-white rounded-[12px] text-base transition-colors duration-150 cursor-pointer hover:bg-[#33CC33F8]",
    "border-danger": "py-3 border border-[#FF3F21] bg-transparent text-[#FF3F21] rounded-[12px] text-base transition-colors duration-150 cursor-pointer hover:bg-[#ff3f2110] hover:text-[#d32f13]",
    primary: "py-3 border border-[#EEF1F4] bg-[#043A66] text-white rounded-[12px] text-base transition-colors duration-150 cursor-pointer hover:bg-[#021f3a]",
};

const SpannedBtn = ({ buttons, className = "flex flex-col gap-4 mt-8 md:flex-row" }: SpannedBtnProps) => {

    return (
        <div className={className}>
            {buttons.map((btn, idx) => {
                let btnClass = "";
                if (btn.type === "muted") {
                    btnClass = BTN_CLASS_MAP.muted;
                } else if (btn.type === "danger") {
                    btnClass = BTN_CLASS_MAP.danger;
                } else if (btn.type === "border-danger") {
                    btnClass = BTN_CLASS_MAP['border-danger'];
                } else if (btn.type === "primary") {
                    btnClass = BTN_CLASS_MAP.primary;
                } else if (btn.type === "grass") {
                    btnClass = BTN_CLASS_MAP.grass;
                } else {
                    btnClass = BTN_CLASS_MAP.default;
                }
                const isDisabled = !!btn.inactive || !!(btn as any).loading;

                return (
                    <button
                        key={typeof btn.text === "string" ? btn.text : idx}
                        className={`w-full md:flex-1 ${btnClass} ${btn.className || ''} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={btn.func}
                        disabled={isDisabled}
                        style={isDisabled ? { cursor: 'not-allowed' } : undefined}
                    >
                        {btn.text}
                    </button>
                );
            })}
        </div>
    );
};

export type { SpannedBtnConfig };
export default SpannedBtn;
