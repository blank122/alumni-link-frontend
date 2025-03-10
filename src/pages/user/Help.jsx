import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqData = [
    {
        question: "How do I create an account?",
        answer:
            "Click on the Sign Up button, fill in your details, and verify your email. Once approved by an admin, you can log in.",
    },
    {
        question: "How can I view job postings?",
        answer:
            "Visit the Jobs section to see available opportunities posted by alumni and companies.",
    },
    {
        question: "How do I find upcoming alumni events?",
        answer:
            "Check the Events page for upcoming reunions, seminars, and networking events.",
    },
    {
        question: "I’m experiencing technical issues. What should I do?",
        answer:
            "Try refreshing the page or clearing your browser cache. If the issue persists, contact support at support@alumnitracking.com.",
    },
];

const Help = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-center mb-6">
                    <FaQuestionCircle className="text-blue-500 text-4xl mr-2" />
                    <h1 className="text-3xl font-bold text-gray-800">Help & FAQ</h1>
                </div>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow-md bg-gray-50">
                            <button
                                className="w-full text-left font-semibold text-lg flex justify-between items-center text-gray-800"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                {openIndex === index ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown className="text-gray-500" />}
                            </button>
                            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Help;
