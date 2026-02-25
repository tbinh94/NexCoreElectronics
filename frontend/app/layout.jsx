import { Inter } from "next/font/google";
import "./globals.css";
import MainLayoutWrapper from "@/components/layout/MainLayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/components/theme-provider";
import ChatBot from "@/components/features/ChatBot";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CompareProvider } from "@/context/CompareContext";
import CompareWidget from "@/components/products/CompareWidget";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "NexCore Electronics - Cửa hàng công nghệ hàng đầu",
    description: "Chuyên cung cấp Laptop, Macbook và linh kiện điện tử chính hãng với giá tốt nhất thị trường.",
    icons: {
        icon: '/logo1.png', // Sử dụng logo của bạn làm favicon tạm thời nếu chưa có file .ico
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1.5,
    userScalable: false,
};

export const dynamic = 'force-dynamic';

import { fetchFilters } from "@/lib/api";

export default async function RootLayout({
    children,
}) {
    const filters = await fetchFilters();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} overflow-x-hidden`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                        <AuthProvider>
                            <CompareProvider>
                                <CartProvider>
                                    <MainLayoutWrapper categories={filters.categories}>
                                        {children}
                                    </MainLayoutWrapper>
                                    <ChatBot />
                                    <CompareWidget />
                                    <Toaster />
                                </CartProvider>
                            </CompareProvider>
                        </AuthProvider>
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
