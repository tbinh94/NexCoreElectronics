"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay? Tôi có thể tư vấn về các sản phẩm công nghệ mới nhất." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    // Load messages from localStorage
    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error("Failed to parse chat messages", e);
            }
        }
    }, []);

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        }
    }, [messages]);

    const handleClearChat = () => {
        const initialMessage = [{ role: "assistant", content: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay? Tôi có thể tư vấn về các sản phẩm công nghệ mới nhất." }];
        setMessages(initialMessage);
        localStorage.removeItem("chatMessages");
    };

    const suggestedQuestions = [
        "Gợi ý laptop gaming dưới 20 triệu",
        "Điện thoại nào chụp ảnh đẹp nhất?",
        "So sánh iPhone 15 và Samsung S24",
        "Tai nghe chống ồn tốt nhất hiện nay"
    ];

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const extractProducts = (content) => {
        const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
        const match = content.match(jsonRegex);

        if (match && match[1]) {
            try {
                const products = JSON.parse(match[1]);
                const text = content.replace(jsonRegex, "").trim();
                return { text, products };
            } catch (e) {
                console.error("Failed to parse product JSON", e);
            }
        }
        return { text: content, products: [] };
    };

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = text.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                setMessages((prev) => [...prev, { role: "assistant", content: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau." }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Chat Window */}
            {isOpen && (
                <Card className="w-[380px] h-[600px] shadow-2xl border-primary/20 flex flex-col mb-4 animate-in slide-in-from-bottom-10 fade-in duration-300 backdrop-blur-md bg-background/95 supports-[backdrop-filter]:bg-background/80">
                    <CardHeader className="bg-primary/10 backdrop-blur-sm text-primary p-4 rounded-t-xl flex flex-row items-center justify-between shrink-0 border-b border-primary/10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-lg">
                                <Bot className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold">Trợ lý ảo AI</CardTitle>
                                <p className="text-xs text-muted-foreground">Luôn sẵn sàng hỗ trợ</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-primary/20 h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                                onClick={handleClearChat}
                                title="Xóa đoạn chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-primary/20 h-8 w-8 rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden relative">
                        <ScrollArea className="h-full p-4">
                            <div className="flex flex-col gap-4 pb-4">
                                {messages.map((msg, index) => {
                                    const { text, products } = extractProducts(msg.content);
                                    const isUser = msg.role === "user";

                                    return (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex w-full gap-3 mb-4",
                                                isUser ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            {/* Avatar */}
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm",
                                                isUser ? "bg-gradient-to-br from-primary to-violet-600 border-transparent text-white" : "bg-background border-border text-primary"
                                            )}>
                                                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                            </div>

                                            {/* Message Bubble */}
                                            <div
                                                className={cn(
                                                    "flex flex-col gap-2 max-w-[80%] text-sm break-words shadow-sm relative group",
                                                    isUser
                                                        ? "items-end"
                                                        : "items-start"
                                                )}
                                            >
                                                <div className={cn(
                                                    "px-5 py-3.5",
                                                    isUser
                                                        ? "bg-gradient-to-br from-primary to-violet-600 text-white rounded-2xl rounded-tr-none"
                                                        : "bg-background/80 backdrop-blur-sm border border-border/60 text-foreground rounded-2xl rounded-tl-none"
                                                )}>
                                                    {msg.role === "assistant" ? (
                                                        <div className="flex flex-col gap-3">
                                                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted/50 prose-pre:p-2 prose-pre:rounded-lg">
                                                                <ReactMarkdown>{text}</ReactMarkdown>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        msg.content
                                                    )}
                                                </div>

                                                {/* Product Carousel (Outside bubble for better width) */}
                                                {msg.role === "assistant" && products.length > 0 && (
                                                    <div className="w-full max-w-[280px] mt-2">
                                                        <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 snap-x scrollbar-none">
                                                            {products.map((product, pIndex) => {
                                                                const imageUrl = product.image && product.image.startsWith('/uploads')
                                                                    ? `http://localhost:5000${product.image}`
                                                                    : (product.image || "/placeholder.svg");

                                                                return (
                                                                    <div key={pIndex} className="min-w-[180px] max-w-[180px] bg-background rounded-xl border border-border/50 overflow-hidden shadow-md hover:shadow-lg transition-all snap-center flex-shrink-0 group/card">
                                                                        <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                                                                            <img
                                                                                src={imageUrl}
                                                                                alt={product.name}
                                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                                                                onError={(e) => { e.target.src = "/placeholder.svg"; }}
                                                                            />
                                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end p-2">
                                                                                <a href={`/products/${product.id}`} target="_blank" rel="noopener noreferrer" className="text-xs text-white font-medium hover:underline">
                                                                                    Xem chi tiết &rarr;
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-3">
                                                                            <h4 className="font-medium text-xs line-clamp-2 mb-1.5 h-8 leading-snug" title={product.name}>{product.name}</h4>
                                                                            <div className="flex items-center justify-between">
                                                                                <span className="text-primary font-bold text-xs">
                                                                                    {typeof product.price === 'number'
                                                                                        ? product.price.toLocaleString('vi-VN') + ' đ'
                                                                                        : product.price}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {isLoading && (
                                    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-2xl rounded-bl-none px-4 py-3 text-sm bg-muted/50 text-foreground border border-border/50">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                            <span className="text-muted-foreground text-xs">Đang suy nghĩ...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        {/* Suggested Questions Overlay (only show if few messages) */}
                        {messages.length === 1 && !isLoading && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent">
                                <p className="text-xs text-muted-foreground mb-2 font-medium px-1">Gợi ý câu hỏi:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedQuestions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(q)}
                                            className="text-xs bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1.5 transition-colors text-left"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="p-3 border-t border-border/50 bg-background/50 backdrop-blur-sm rounded-b-xl">
                        <div className="flex w-full items-center gap-2 bg-muted/50 p-1 rounded-full border border-border/50 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                            <Input
                                placeholder="Nhập câu hỏi của bạn..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent px-4 h-10"
                                disabled={isLoading}
                            />
                            <Button
                                size="icon"
                                onClick={() => handleSend()}
                                disabled={isLoading || !input.trim()}
                                className="h-9 w-9 rounded-full shrink-0 mr-1"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 animate-in zoom-in duration-300"
                >
                    <MessageCircle className="w-7 h-7" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </Button>
            )}
        </div>
    );
}
