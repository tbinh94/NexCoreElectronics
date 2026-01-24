"use client";

import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        role: "Khách hàng thân thiết",
        avatar: "A",
        content: "Sản phẩm chất lượng tuyệt vời, giao hàng nhanh chóng. Tôi rất hài lòng với dịch vụ chăm sóc khách hàng của shop. Chắc chắn sẽ ủng hộ dài dài!",
        rating: 5
    },
    {
        id: 2,
        name: "Trần Thị B",
        role: "Verified Buyer",
        avatar: "B",
        content: "Giá cả cạnh tranh so với thị trường. Đóng gói cẩn thận, hàng nhận được nguyên vẹn không móp méo. Rất đáng tiền.",
        rating: 5
    },
    {
        id: 3,
        name: "Lê Văn C",
        role: "Tech Enthusiast",
        avatar: "C",
        content: "Mình mua laptop ở đây, được tư vấn rất nhiệt tình. Máy chạy mượt, đúng như mô tả. Chế độ bảo hành cũng rất rõ ràng.",
        rating: 4
    },
    {
        id: 4,
        name: "Phạm Thị D",
        role: "Office Worker",
        avatar: "D",
        content: "Tai nghe mua về nghe rất êm, pin trâu. Shop còn tặng thêm quà nhỏ xinh nữa. 10 điểm cho sự chu đáo!",
        rating: 5
    }
];

export default function Testimonials() {
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900/50 rounded-3xl w-full">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Khách hàng nói gì về chúng tôi?
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-175">
                        Sự hài lòng của khách hàng là động lực để chúng tôi không ngừng nỗ lực và phát triển.
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {testimonials.map((testimonial) => (
                            <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="h-full border-none shadow-md bg-white dark:bg-gray-950">
                                        <CardContent className="flex flex-col p-6 h-full">
                                            <div className="flex mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < testimonial.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            <div className="relative flex-1">
                                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-indigo-100 dark:text-indigo-900/30 rotate-180" />
                                                <p className="relative z-10 text-gray-600 dark:text-gray-300 italic leading-relaxed">
                                                    "{testimonial.content}"
                                                </p>
                                            </div>

                                            <div className="flex items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold">
                                                        {testimonial.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="ml-3">
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {testimonial.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-12" />
                    <CarouselNext className="hidden md:flex -right-12" />
                </Carousel>
            </div>
        </section>
    );
}
