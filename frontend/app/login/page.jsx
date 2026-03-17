'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toggleVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            await login(email, password);
            // Router push is handled in AuthContext or here if you prefer, but AuthContext already does it.
            // If AuthContext does it, we don't strictly need it here, but it doesn't hurt.
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to login");
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-center py-12 md:py-24">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Đăng nhập</h1>
                        <p className="text-balance text-muted-foreground">
                            Nhập email của bạn để đăng nhập vào tài khoản
                        </p>
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <div className='relative'>
                                <Input placeholder='Mật khẩu của bạn' id="password" type={passwordVisible ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button
                                    type="button"
                                    onClick={toggleVisibility}
                                    variant="ghost"
                                    className="absolute right-0 top-0 h-full px-3 py-2"
                                >
                                    {passwordVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Đăng nhập
                        </Button>
                        <div className="flex justify-center w-full overflow-hidden rounded-md">
                            <GoogleLogin
                                width="350"
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        await login(null, null, credentialResponse.credential);
                                    } catch (err) {
                                        setError("Google Login Failed");
                                    }
                                }}
                                onError={() => {
                                    setError("Google Login Failed");
                                }}
                                useOneTap
                            />
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Chưa có tài khoản?{" "}
                        <Link href="/register" className="underline">
                            Đăng ký ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
