
import React from 'react';

export interface AdminCardItem {
    title: string;
    text: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

interface AdminCardsProps {
    cards: AdminCardItem[];
}

const AdminCards: React.FC<AdminCardsProps> = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mt-6">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="rounded-lg p-4 flex flex-col min-w-[180px] border shadow-sm"
                    style={{ borderColor: card.color, borderWidth: 2, borderStyle: 'solid', background: card.bgColor }}
                    title={card.title}
                >
                    <div className="flex items-center justify-between mb-2 w-full">
                        <span
                            className="font-semibold text-sm text-[#6A6A6A] whitespace-nowrap overflow-hidden text-ellipsis"
                            style={{ maxWidth: '70%' }}
                        >
                            {card.title}
                        </span>
                        <span className="whitespace-nowrap flex-shrink-0" style={{ color: card.color }}>{card.icon}</span>
                    </div>
                    <span className="text-lg md:text-2xl font-bold mt-1" style={{ color: card.color }}>{card.text}</span>
                </div>
            ))}
        </div>
    );
}

export default AdminCards;
