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

export default function ProductImageGallery({ mainImage, images, productName, selectedImage, onImageSelect }) {
    // Fallback to internal state if not controlled (though we intend to control it)
    const [internalImage, setInternalImage] = React.useState(mainImage);

    const currentImage = selectedImage !== undefined ? selectedImage : internalImage;
    const handleImageSelect = onImageSelect || setInternalImage;

    const galleryImages = images && images.length > 0 ? images : [mainImage];

    return (
        <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-white shadow-sm">
                <Image
                    src={currentImage}
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
                        {galleryImages.map((image, index) => (
                            <CarouselItem key={index} className="pl-4 basis-1/4 sm:basis-1/5">
                                <div
                                    className={cn(
                                        "relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                                        currentImage === image
                                            ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-1 opacity-100"
                                            : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
                                    )}
                                    onClick={() => handleImageSelect(image)}
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
