
import { Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const ArticleSection = () => {

    const articles = [
        {
            num: "1",
            title: "The $10M Mistake: Why 73% of Bank-Fintech Partnerships Fail (And How to Beat the Odds)",
            description: "A insider's guide to avoiding costly partnership failures.Learn the critical success factors that separate...",
            date: "2nd July, 2025",
        },
        {
            num: "2",
            title: "From Concept to Scale: The Complete Financial Technology Growth Playbook",
            description: "The comprehensive guide to fintech success, written by operators who've  built winning products. Step-by-step...",
            date: "1st July, 2025",
        },
        {
            num: "3",
            title: "The $50 Billion Digital Finance Gap: Why Traditional Models Are Failing (And How to Capture the Opportunity)",
            description: "The market opportunity that's reshaping financial services. Analysis  showing how customer expectations are...",
            date: "12th June, 2025",
        },
        {
            num: "4",
            title: "The Real Cost of Delayed Innovation: Why 'Wait and See' Strategies Cost Financial Companies Millions",
            description: "The competitive and operational costs of delayed financial technology adoption. Real case studies of successful...",
            date: "10th June, 2025",
        },
        {
            num: "5",
            title: "Build vs. Buy vs. Partner: The Strategic Decision Framework Every Financial Executive Needs",
            description: "The strategic framework that guides financial technology decisions.  Complete cost-benefit analysis of internal...",
            date: "7th June, 2025",
        },
    ]

    return (
        <motion.div 
            className="my-8 sm:my-12 lg:my-16 mx-4 sm:mx-8 lg:mx-[120px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Typography
                    className="capitalize text-center text-2xl sm:text-3xl lg:text-5xl font-bold mb-8 sm:mb-12"
                    style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                >
                    Our Articles
                </Typography>
            </motion.div>

            {articles.map((article, index) => (
                <motion.div 
                    key={index} 
                    className="cursor-pointer mb-4 sm:mb-6 border-b border-b-[#00725626] pb-4 sm:pb-6 px-2 sm:px-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: "easeOut"
                    }}
                    whileHover={{ 
                        x: 10,
                        backgroundColor: "rgba(1, 75, 57, 0.02)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <Typography
                        className="text-lg sm:text-xl mb-2 font-bold text-[#3E3B3B]"
                        style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                    >
                        {article.num}. 
                        <span className="underline ml-2">
                            {article.title}
                        </span>
                    </Typography>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ml-0 sm:ml-8">
                        <Typography className="text-sm sm:text-base text-gray-600 flex-1">
                            {article.description}
                        </Typography>
                        <Typography className="text-sm sm:text-base text-gray-500 mt-2 sm:mt-0">
                            {article.date}
                        </Typography>
                    </div>
                </motion.div>
            ))}

            <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <motion.div
                    whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        className="text-[#014B39] border text-base border-[#0072564D] bg-transparent rounded-lg font-bold px-24"
                        style={{ fontFamily: 'Consolas, Monaco, monospace' }}
                    >
                        View More
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default ArticleSection;
