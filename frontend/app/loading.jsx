import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-[70vh] w-full flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-muted-foreground animate-pulse font-medium">Đang tải dữ liệu...</p>
        </div>
    );
}
