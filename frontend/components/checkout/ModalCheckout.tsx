'use client';
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react"

const bankId = "MB";
const accountNo = "56111166662004";
const template = "compact2";
const content = "Thanh toan don hang";

interface ModalProps {
    amount: number;
}

export default function CheckoutModal({ amount }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${content}`;
    return (
        <div>
            <Button className="cursor-pointer text-white bg-blue-500 hover:bg-blue-700"
                onClick={() => {
                    setIsLoading(true);
                    setIsOpen(true);
                }}
            >Thanh toán</Button>
            {isOpen && (
                <div
                    className={`aspect-square fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    ${isLoading ? "" : "bg-white p-4 rounded-lg shadow-lg"}`}
                >
                    {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}
                    <Image src={qrUrl} alt="QR" width={400} height={400}
                        className="object-contain w-full h-full mt-4"
                        onLoadingComplete={() => setIsLoading(false)} />
                    {!isLoading && (
                        <Button
                            className="cursor-pointer absolute bottom-4 right-4 hover:bg-black bg-gray-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Đóng
                        </Button>
                    )}
                </div>
            )}
            <p className="sr-only text-center font-semibold leading-1.3">{formatPrice(amount)}</p>
        </div>
    );
}
