import React from 'react';
import { Truck, Globe, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Chính sách vận chuyển</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Chúng tôi cam kết mang sản phẩm đến tay bạn nhanh chóng và an toàn nhất.
                        </p>
                    </div>
                </div>
            </div>

            {/* Shipping Methods */}
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Phương thức & Phí vận chuyển</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Chúng tôi cung cấp nhiều lựa chọn vận chuyển để phù hợp với nhu cầu của bạn.
                    </p>

                    <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian dự kiến</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chi phí</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tiêu chuẩn</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 - 5 ngày làm việc</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30.000đ (Miễn phí cho đơn &gt; 1tr)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nhanh</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 - 2 ngày làm việc</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50.000đ</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hỏa tốc (Nội thành)</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Trong ngày (2 - 4 giờ)</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Theo giá Grab/Ahamove</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <Globe className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                Phạm vi giao hàng
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Chúng tôi giao hàng đến tất cả 63 tỉnh thành trên toàn quốc. Đối với các khu vực vùng sâu vùng xa, thời gian giao hàng có thể cộng thêm 1-2 ngày.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <ShieldCheck className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                Bảo hiểm hàng hóa
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">100% đơn hàng được đóng gói cẩn thận và có bảo hiểm. Nếu sản phẩm bị hư hỏng trong quá trình vận chuyển, chúng tôi sẽ đổi mới ngay lập tức.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                <Clock className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                Xử lý đơn hàng
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Đơn hàng đặt trước 14:00 sẽ được xử lý và gửi đi trong ngày. Đơn hàng đặt sau giờ này sẽ được xử lý vào ngày làm việc tiếp theo.</p>
                            </dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}