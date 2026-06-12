import FaqAccordionGroup from '@/components/faq/FaqAccordionGroup';
import FaqExploreResources from '@/components/faq/FaqExploreResources';
import FaqHeader from '@/components/faq/FaqHeader';
import FaqStillHaveQuestions from '@/components/faq/FaqStillHaveQuestions';
import { FAQ_GROUPS } from '@/constants/landing-page-data';
import React, { useState } from 'react';

const Faq: React.FC = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen w-full pb-16">
            <FaqHeader searchValue={search} onSearchChange={e => setSearch(e.target.value)} />
            <div className="w-full pt-[7rem] px-4 md:px-8 xl:px-24">
                {FAQ_GROUPS.map(group => (
                    <FaqAccordionGroup
                        key={group.id}
                        title={group.title}
                        faqs={group.faqs}
                        searchTerm={search}
                    />
                ))}
            </div>
            <div className="mt-12">
                <FaqStillHaveQuestions />
            </div>
            <div className="mt-12">
                <FaqExploreResources />
            </div>
        </div>
    );
};

export default Faq; 