import React from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageSquare
} from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Liên hệ với chúng tôi</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Bạn có câu hỏi hoặc cần hỗ trợ? Đội ngũ NextGen Ecommerce luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">

                    {/* Contact Info (Left Side) */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Thông tin liên lạc</h3>
                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Hãy ghé thăm văn phòng của chúng tôi hoặc liên hệ qua các kênh trực tuyến. Chúng tôi mong muốn được hợp tác với bạn.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                            <div className="rounded-2xl bg-gray-50 p-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold leading-7 text-gray-900">Văn phòng chính</h3>
                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    123 Đường Công Nghệ, Quận 1<br />
                                    TP. Hồ Chí Minh, Việt Nam
                                </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <Phone className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold leading-7 text-gray-900">Điện thoại</h3>
                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    <a href="tel:+84123456789" className="hover:text-indigo-600">+84 (123) 456-789</a>
                                </p>
                                <p className="text-base leading-7 text-gray-600">
                                    <a href="tel:+84987654321" className="hover:text-indigo-600">+84 (987) 654-321</a>
                                </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold leading-7 text-gray-900">Email</h3>
                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    <a href="mailto:support@nextgen.com" className="hover:text-indigo-600">support@nextgen.com</a>
                                </p>
                                <p className="text-base leading-7 text-gray-600">
                                    <a href="mailto:sales@nextgen.com" className="hover:text-indigo-600">sales@nextgen.com</a>
                                </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-8">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <Clock className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 text-base font-semibold leading-7 text-gray-900">Giờ làm việc</h3>
                                <p className="mt-2 text-base leading-7 text-gray-600">
                                    Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                                    Thứ 7: 8:00 - 12:00
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right Side) */}
                    <div className="bg-white lg:pl-8">
                        <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-2">
                                <MessageSquare className="h-6 w-6 text-indigo-600" />
                                Gửi tin nhắn cho chúng tôi
                            </h3>
                            <form action="#" method="POST" className="space-y-6">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Họ
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                            Tên
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Số điện thoại
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="tel"
                                            name="phone-number"
                                            id="phone-number"
                                            autoComplete="tel"
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Nội dung tin nhắn
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                                    >
                                        Gửi tin nhắn
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section (Optional Placeholder) */}
            <div className="h-96 w-full bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500 font-medium flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Bản đồ Google Maps sẽ được tích hợp tại đây
                    </p>
                </div>
                {/* Bạn có thể nhúng iframe Google Maps thật vào đây */}
            </div>
        </div>
    );
}