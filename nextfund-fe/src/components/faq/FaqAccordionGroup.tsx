import React from 'react';
import { Card } from '../General/ui';
import FaqAccordion from './FaqAccordion';

interface Faq {
    question: string;
    answer: string;
}

interface FaqAccordionGroupProps {
    title: string;
    faqs: Faq[];
    searchTerm: string;
}

const FaqAccordionGroup: React.FC<FaqAccordionGroupProps> = ({ title, faqs, searchTerm }) => {
    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredFaqs.length === 0) return null;

    return (
        <div className="mb-6 w-full pt-0">
            <h3 className="text-3xl font-bold mb-8 font-neue-bold" style={{ color: '#043A66' }}>{title}</h3>
            <div className="flex flex-col gap-6 w-full">
                {filteredFaqs.map((faq, idx) => (
                    <Card
                        key={idx}
                        className="w-full px-0 py-0 shadow-none bg-white border border-[#e9ecef] rounded-[2rem] overflow-hidden"
                    >
                        <FaqAccordion question={faq.question} answer={faq.answer} />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FaqAccordionGroup; 