import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Users,
    Target,
    Award,
    TrendingUp,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-80"></div>
                {/* Decorative background effect */}
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/5 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Kiến tạo tương lai mua sắm trực tuyến
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Tại NextGen Ecommerce, chúng tôi không chỉ bán sản phẩm. Chúng tôi mang đến trải nghiệm công nghệ đỉnh cao, kết nối đam mê và phong cách sống hiện đại.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            <Link href="/products" className="flex items-center gap-x-2 hover:text-indigo-400 transition-colors">
                                Khám phá sản phẩm <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="/contact" className="flex items-center gap-x-2 hover:text-indigo-400 transition-colors">
                                Liên hệ hợp tác <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Mission & Story Section */}
            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Câu chuyện của chúng tôi</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Hành trình từ ý tưởng đến hiện thực
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Được thành lập vào năm 2024, NextGen Ecommerce bắt đầu với một sứ mệnh đơn giản: làm cho việc tiếp cận các sản phẩm công nghệ mới nhất trở nên dễ dàng và tin cậy hơn bao giờ hết.
                                </p>
                                <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600">
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <Target className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Sứ mệnh.
                                        </dt>
                                        <dd className="inline"> Mang đến những sản phẩm chất lượng cao với dịch vụ khách hàng tận tâm nhất.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <Award className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Cam kết.
                                        </dt>
                                        <dd className="inline"> 100% sản phẩm chính hãng, bảo hành uy tín và hỗ trợ kỹ thuật trọn đời.</dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <TrendingUp className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Phát triển.
                                        </dt>
                                        <dd className="inline"> Không ngừng đổi mới công nghệ để tối ưu hóa trải nghiệm mua sắm của bạn.</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Placeholder image - bạn có thể thay thế bằng ảnh thật của team/văn phòng */}
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80"
                                alt="Đội ngũ làm việc"
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                                width={2432}
                                height={1442}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Stats Section */}
            <div className="bg-indigo-600 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Được tin tưởng bởi hàng ngàn khách hàng
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-indigo-200">
                                Những con số biết nói khẳng định chất lượng và uy tín của chúng tôi trên thị trường.
                            </p>
                        </div>
                        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Sản phẩm đa dạng</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">5000+</dd>
                            </div>
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Khách hàng hài lòng</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">10k+</dd>
                            </div>
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Đơn hàng mỗi tháng</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">2.5k</dd>
                            </div>
                            <div className="flex flex-col bg-white/5 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-300">Hỗ trợ 24/7</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-white">100%</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* 4. Values Section */}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Giá trị cốt lõi</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Điều gì làm nên sự khác biệt?
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Chúng tôi xây dựng doanh nghiệp dựa trên sự tin tưởng và minh bạch. Mỗi sản phẩm đến tay bạn đều là tâm huyết của cả đội ngũ.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {[
                            {
                                name: 'Chất lượng hàng đầu',
                                description: 'Chúng tôi chỉ hợp tác với các nhà cung cấp uy tín và kiểm tra kỹ lưỡng từng sản phẩm trước khi nhập kho.',
                                icon: CheckCircle2,
                            },
                            {
                                name: 'Giao hàng siêu tốc',
                                description: 'Hệ thống logistics tối ưu giúp đơn hàng đến tay bạn nhanh chóng, an toàn và nguyên vẹn.',
                                icon: TrendingUp,
                            },
                            {
                                name: 'Khách hàng là trọng tâm',
                                description: 'Mọi quyết định của chúng tôi đều bắt đầu và kết thúc với sự hài lòng của khách hàng.',
                                icon: Users,
                            },
                        ].map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* 5. CTA Section */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#7775D6" />
                                    <stop offset={1} stopColor="#E935C1" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Sẵn sàng trải nghiệm?
                                <br />
                                Bắt đầu mua sắm ngay hôm nay.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Đăng ký ngay để nhận ưu đãi đặc biệt cho đơn hàng đầu tiên và cập nhật những xu hướng công nghệ mới nhất.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <Link
                                    href="/products"
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Mua sắm ngay
                                </Link>
                                <Link href="/contact" className="text-sm font-semibold leading-6 text-white hover:text-gray-300">
                                    Liên hệ chúng tôi <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            {/* Hình ảnh minh họa sản phẩm/app */}
                            <img
                                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                                src="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                alt="App screenshot"
                                width={1824}
                                height={1080}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}