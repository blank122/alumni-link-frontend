import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiChevronDown,
    FiHelpCircle,
    FiMessageCircle,
    FiMail,
    FiExternalLink
} from "react-icons/fi";

const faqData = [
    {
        question: "How do I create an account?",
        answer: "Click on the Sign Up button, fill in your details, and verify your email. Once approved by an admin, you can log in.",
    },
    {
        question: "How can I view job postings?",
        answer: "Visit the Jobs section to see available opportunities posted by alumni and companies.",
    },
    {
        question: "How do I find upcoming alumni events?",
        answer: "Check the Events page for upcoming reunions, seminars, and networking events.",
    },
    {
        question: "I'm experiencing technical issues. What should I do?",
        answer: "Try refreshing the page or clearing your browser cache. If the issue persists, contact support at support@alumnitracking.com.",
    },
];

const Help = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                            <FiHelpCircle className="w-12 h-12 text-blue-500" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-3">
                        Help Center
                    </h1>
                    <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Find answers to common questions and get support for your alumni tracking needs.
                    </p>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 mb-12"
                >
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            <motion.button
                                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                className="w-full flex justify-between items-center text-left p-6"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                        <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                                        {faq.question}
                                    </h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                >
                                    <FiChevronDown className="w-5 h-5" />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6">
                                            <div className="pl-10 border-l-2 border-blue-200 dark:border-blue-800">
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Help Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800"
                >
                    <div className="text-center mb-6">
                        <FiMessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <h2 className="text-2xl font-light text-gray-900 dark:text-white mb-2">
                            Still Need Help?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Our support team is here to assist you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="mailto:support@alumnitracking.com"
                            className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                                    <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        Email Support
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        support@alumnitracking.com
                                    </div>
                                </div>
                            </div>
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#"
                            className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors">
                                    <FiExternalLink className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-left">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        Documentation
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        User guides & tutorials
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Help;