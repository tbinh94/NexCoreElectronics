"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ThemeProvider } from "next-themes";

export default function AdminGatekeeper({ children }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session storage on mount
        const verifiedTime = sessionStorage.getItem("admin_passcode_verified_at");
        const verified = sessionStorage.getItem("admin_passcode_verified");

        if (verified === "true" && verifiedTime) {
            const oneHour = 60 * 60 * 1000;
            const now = Date.now();
            if (now - parseInt(verifiedTime) < oneHour) {
                setIsUnlocked(true);
            } else {
                // Expired
                sessionStorage.removeItem("admin_passcode_verified");
                sessionStorage.removeItem("admin_passcode_verified_at");
                sessionStorage.removeItem("admin_passcode");
            }
        }
        setLoading(false);
    }, []);

    const handleUnlock = (e) => {
        e.preventDefault();
        const correctPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE;

        if (passcode === correctPasscode) {
            sessionStorage.setItem("admin_passcode_verified", "true");
            sessionStorage.setItem("admin_passcode_verified_at", Date.now().toString());
            sessionStorage.setItem("admin_passcode", passcode);
            setIsUnlocked(true);
            toast.success("Truy cập thành công!");
        } else {
            toast.error("Mã bảo mật không chính xác!");
            setPasscode("");
        }
    };

    if (loading) {
        return null; // Or a loading spinner
    }

    return (
        <ThemeProvider forcedTheme="light" attribute="class" enableSystem={false}>
            {!isUnlocked ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-gray-900">Admin Access</h2>
                            <p className="text-gray-500 mb-8">
                                Vui lòng nhập mã bảo mật để truy cập trang quản trị.
                            </p>

                            <form onSubmit={handleUnlock} className="space-y-4">
                                <div className="relative">
                                    <Input
                                        type="password"
                                        placeholder="Nhập mã bảo mật..."
                                        value={passcode}
                                        onChange={(e) => setPasscode(e.target.value)}
                                        className="pl-4 pr-4 h-12 text-lg text-center tracking-widest"
                                        autoFocus
                                    />
                                </div>
                                <Button type="submit" className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700">
                                    Mở khóa
                                </Button>
                            </form>
                        </div>
                        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Khu vực dành riêng cho quản trị viên
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                children
            )}
        </ThemeProvider>
    );
}
