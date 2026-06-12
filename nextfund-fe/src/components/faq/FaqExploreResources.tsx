import React from 'react';
import { Button, Card } from '../General/ui';
import Link from 'next/link';

const resources = [
    {
        title: 'Investment Guide',
        description: 'Comprehensive guide to investing in African businesses.',
        button: 'Read Guide',
        href: '/investment-guide',
    },
    {
        title: 'How It Works',
        description: 'Learn about our investment process step by step.',
        button: 'Learn More',
        href: '/how-it-works',
    },
    {
        title: 'Blog & Insights',
        description: 'Latest insights on African markets and investment trends.',
        button: 'Read Blog',
        href: '/african-investment-insights',
    },
];

const FaqExploreResources: React.FC = () => {
    return (
        <section className="py-12 flex justify-center items-center px-4">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {resources.map((res, idx) => (
                    <Card key={idx} className="p-8 flex flex-col justify-between !bg-[#F9FBFC] !rounded-3xl h-full">
                        <div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#043A66' }}>{res.title}</h3>
                            <p className="text-base mb-6" style={{ color: '#043A66' }}>{res.description}</p>
                        </div>
                        <Link href={res.href}>
                            <Button
                                variant="primary"
                                size="lg"
                                className="text-white rounded-full font-semibold text-base whitespace-nowrap"
                                style={{
                                    backgroundColor: '#33CC33',
                                    width: 'fit-content',
                                    minWidth: '140px',
                                    padding: '0.75rem 2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                {res.button} <span className="ml-2">→</span>
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FaqExploreResources;