
interface CardDataItem {
    label: string;
    value: string;
    text?: string;
}

interface FundingCardProps {
    cardData?: CardDataItem[];
}

const FundingCard = ({ cardData = [] }: FundingCardProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cardData.map((item, idx) => (
                <div
                    key={idx}
                    className="rounded-lg shadow py-4 px-2 flex flex-col items-start border border-[#EEF1F4]"
                >
                    <div className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">{item.label}</div>
                    <div className="flex items-end gap-2">
                        <p className="text-[21px] font-bold text-[#1E1E1E] whitespace-nowrap">
                            {item.value}
                        </p>
                        {item.text && (
                            <p className="text-[10px] text-[#1E1E1E] font-bold mb-0.5 break-words overflow-hidden">{item.text}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FundingCard;
