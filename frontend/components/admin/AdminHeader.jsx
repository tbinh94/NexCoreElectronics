import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminHeader() {
    return (
        <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
            {/* Search Bar */}
            <div className="w-96 hidden md:block">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm..."
                        className="pl-9 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-blue-600">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </Button>

                <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 hover:bg-gray-100 rounded-full">
                            <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4" />
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-semibold text-gray-700">Admin User</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                        <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Đăng xuất</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}