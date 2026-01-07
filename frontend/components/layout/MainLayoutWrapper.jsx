"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayoutWrapper({ children, categories }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header categories={categories} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
