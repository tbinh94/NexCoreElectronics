import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-6 px-4 text-center">
            <div className="bg-blue-50 p-6 rounded-full">
                <FileQuestion className="h-16 w-16 text-blue-600" />
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Không tìm thấy</h1>
                <p className="text-muted-foreground text-lg max-w-[500px]">
                    Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển đi nơi khác.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/">Quay lại trang chủ</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                    <Link href="/products">Xem tất cả sản phẩm</Link>
                </Button>
            </div>
        </div>
    );
}
