'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toggleVisibility = () => setPasswordVisible(!passwordVisible);
    const [rePasswordVisible, setRePasswordVisible] = useState(false);
    const toggleReVisibility = () => setRePasswordVisible(!rePasswordVisible);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");

    const isInvalid = password !== rePassword;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isInvalid) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (!res.ok) {
                throw new Error("Failed to register");
            }
            const data = await res.json();
            console.log("Register successful", data);
            setName("");
            setEmail("");
            setPassword("");
            setRePassword("");
            router.push("/login");
        } catch (error) {
            console.log(error);
            setError("Failed to register");
        }
    }

    return (
        <div className="w-full lg:min-h-[600px] xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Register</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to register to your account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <div className='relative'>
                                <Input id="password" type={passwordVisible ? "text" : "password"} required placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button type="button" onClick={toggleVisibility} variant="outline" className='absolute bg-transparent border-none right-0 top-1/2 -translate-y-1/2'>
                                    {passwordVisible ? <Eye /> : <EyeOff />}
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className='relative'>
                                <Input id="confirm-password" type={rePasswordVisible ? "text" : "password"} required placeholder="Confirm your password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                                <Button type="button" onClick={toggleReVisibility} variant="outline" className='absolute bg-transparent border-none right-0 top-1/2 -translate-y-1/2'>
                                    {rePasswordVisible ? <Eye /> : <EyeOff />}
                                </Button>
                            </div>
                        </div>
                        {isInvalid && <p className="text-red-500">Passwords do not match</p>}
                        <Button disabled={isInvalid} className="w-full cursor-pointer">
                            Register
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}