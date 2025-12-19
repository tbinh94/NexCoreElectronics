'use client';
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const bankId = "MB";
const accountNo = "56111166662004"; // Thay bằng số tài khoản của bạn
const template = "compact2";
const content = "Thanh toan don hang";

export default function VietQRImage({ amount }) {
    const [isLoading, setIsLoading] = useState(true);
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${content}`;

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg border shadow-sm max-w-sm mx-auto">
            <h3 className="font-bold text-lg mb-2 text-blue-600">Quét mã để thanh toán</h3>
            {/* <p className="text-gray-500 mb-4">Số tiền: <span className="font-bold text-red-600">{formatPrice(amount)}</span></p> */}

            <div className="relative w-64 h-64 bg-gray-100 rounded-md overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                )}
                <Image
                    src={qrUrl}
                    alt="VietQR"
                    fill
                    className="object-contain"
                    onLoadingComplete={() => setIsLoading(false)}
                />
            </div>
            <p className="text-xs text-gray-400 mt-4">Hỗ trợ bởi VietQR</p>
        </div>
    );
}