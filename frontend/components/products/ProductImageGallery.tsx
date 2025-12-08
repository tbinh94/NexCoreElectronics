"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ProductImageGalleryProps {
    mainImage: string
    productName: string
}

export default function ProductImageGallery({ mainImage, productName }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = React.useState(mainImage)

    const images = [
        mainImage,
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    ]

    return (
        <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-white shadow-sm">
                <Image
                    src={selectedImage}
                    alt={productName}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out hover:scale-105"
                    priority
                />
            </div>

            <div className="px-2">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-full"
                >
                    <CarouselContent className="-ml-4">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="pl-4 basis-1/4 sm:basis-1/5">
                                <div
                                    className={cn(
                                        "relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                                        selectedImage === image
                                            ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-1 opacity-100"
                                            : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                                    )}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${productName} view ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 lg:-left-8 cursor-pointer" />
                    <CarouselNext className="-right-4 lg:-right-8 cursor-pointer" />
                </Carousel>
            </div>
        </div>
    )
}
