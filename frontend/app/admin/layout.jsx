import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50/50 flex">
            {/* Sidebar - Hidden on mobile, handled via Sheet usually, but simple for now */}
            <aside className="hidden md:block fixed inset-y-0 left-0 z-40">
                <AdminSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <AdminHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}