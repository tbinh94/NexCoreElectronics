'use client';
import React, { useEffect, useState } from 'react';
import { HelpCircle, Search, MessageCircle } from 'lucide-react';

export default function FAQPage() {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch('/api/faqs');
                const data = await response.json();
                setFaqs(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFaqs();
    }, []);
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Câu hỏi thường gặp</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Tìm kiếm câu trả lời nhanh chóng cho những thắc mắc phổ biến nhất về NextGen Ecommerce.
                        </p>
                        {/* Search Bar Placeholder */}
                        <div className="mt-10 relative max-w-xl mx-auto">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-md border-0 bg-white/10 py-3 pl-10 pr-3 text-white shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Tìm kiếm câu hỏi..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Chủ đề phổ biến</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <div key={faq._id} className="pt-6">
                                <dt>
                                    <div className="flex w-full items-start justify-between text-left text-gray-900">
                                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                                    </div>
                                </dt>
                                <dd className="mt-2 pr-12">
                                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Still have questions? */}
                <div className="mx-auto mt-16 max-w-2xl text-center">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900">Vẫn còn thắc mắc?</h3>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                        Nếu bạn không tìm thấy câu trả lời mình cần, đừng ngần ngại liên hệ với chúng tôi.
                    </p>
                    <div className="mt-6">
                        <a href="/contact" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <MessageCircle className="h-4 w-4" />
                            Liên hệ hỗ trợ
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}   