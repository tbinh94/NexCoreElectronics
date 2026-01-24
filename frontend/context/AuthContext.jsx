'use client';
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser && storedUser !== "undefined" && storedToken !== "undefined") {
            try {
                // Auto-fix: Remove extra quotes if token was double-stringified
                let cleanToken = storedToken;
                if (cleanToken.startsWith('"') && cleanToken.endsWith('"')) {
                    cleanToken = cleanToken.slice(1, -1);
                }

                // Check if token is expired
                const payload = JSON.parse(atob(cleanToken.split('.')[1]));
                const isExpired = payload.exp * 1000 < Date.now();

                if (isExpired) {
                    console.log("Token expired, logging out...");
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                    setToken(null);
                } else {
                    setUser(JSON.parse(storedUser));
                    setToken(cleanToken);
                }
            } catch (error) {
                console.error("Error parsing auth data:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password, credential = null) => {
        try {
            const url = credential ? "/api/auth/google" : "/api/auth/login";
            const body = credential ? { credential, clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID } : { email, password };

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                // Try to parse error message from server
                let errorMessage = "Đăng nhập thất bại";
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // ignore json parse error
                }
                throw new Error(errorMessage);
            }
            const data = await res.json();
            console.log("Login successful", data);

            if (data.user && data.token) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token); // Store token as raw string
                router.push("/");
            } else {
                throw new Error("Phản hồi không hợp lệ từ máy chủ: thiếu thông tin người dùng hoặc token");
            }
        } catch (error) {
            console.log(error);
            setError(error.message); // Update local error state if needed, though usually better for UI to handle
            throw error; // Re-throw to let the component handle the UI feedback
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
    };

    const updateUser = (data) => {
        console.log("Updating user data:", data);
        const { token: newToken, ...userData } = data;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        if (newToken) {
            setToken(newToken);
            localStorage.setItem("token", newToken);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
