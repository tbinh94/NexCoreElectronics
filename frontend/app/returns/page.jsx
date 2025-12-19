import React from 'react';
import { RefreshCw, FileText, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ReturnsPage() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Chính sách đổi trả</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Mua sắm không rủi ro. Chúng tôi hỗ trợ đổi trả dễ dàng trong vòng 30 ngày.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">

                {/* Steps */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center mb-12">Quy trình đổi trả đơn giản</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 font-bold text-xl">1</div>
                            <h3 className="text-lg font-semibold text-gray-900">Đăng ký đổi trả</h3>
                            <p className="mt-2 text-gray-600">Liên hệ với CSKH hoặc điền form đổi trả trực tuyến để nhận mã vận đơn.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 font-bold text-xl">2</div>
                            <h3 className="text-lg font-semibold text-gray-900">Gửi hàng về</h3>
                            <p className="mt-2 text-gray-600">Đóng gói sản phẩm cẩn thận và gửi về kho của chúng tôi (miễn phí vận chuyển).</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl">
                            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 font-bold text-xl">3</div>
                            <h3 className="text-lg font-semibold text-gray-900">Nhận hoàn tiền</h3>
                            <p className="mt-2 text-gray-600">Chúng tôi sẽ kiểm tra và hoàn tiền hoặc gửi sản phẩm mới trong vòng 3-5 ngày.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                    {/* Conditions */}
                    <div>
                        <h3 className="flex items-center text-xl font-bold text-gray-900 mb-6">
                            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                            Điều kiện chấp nhận đổi trả
                        </h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Sản phẩm còn nguyên tem, mác và bao bì gốc.
                            </li>
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Sản phẩm chưa qua sử dụng, không bị dơ bẩn hoặc hư hỏng do lỗi người dùng.
                            </li>
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Có hóa đơn mua hàng hoặc bằng chứng mua hàng hợp lệ.
                            </li>
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Yêu cầu đổi trả được thực hiện trong vòng 30 ngày kể từ ngày nhận hàng.
                            </li>
                        </ul>
                    </div>

                    {/* Non-returnable items */}
                    <div>
                        <h3 className="flex items-center text-xl font-bold text-gray-900 mb-6">
                            <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                            Sản phẩm không áp dụng đổi trả
                        </h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Các sản phẩm khuyến mãi, giảm giá sâu (Clearance).
                            </li>
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Phần mềm, thẻ quà tặng hoặc các sản phẩm kỹ thuật số.
                            </li>
                            <li className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                Sản phẩm bị hư hỏng do tai nạn, sử dụng sai cách hoặc hao mòn thông thường.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 rounded-2xl bg-indigo-50 p-8 text-center sm:p-12">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Cần hỗ trợ đổi trả ngay?</h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp bạn thực hiện quy trình này nhanh chóng.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Liên hệ hỗ trợ
                        </Link>
                        <Link href="/" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
                            Tiếp tục mua sắm <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}