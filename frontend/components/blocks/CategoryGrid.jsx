import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Gamepad2, Smartphone, Briefcase, Building2, Feather, Monitor } from "lucide-react";

const categoryIcons = {
    "Business Laptop": Briefcase,
    "Gaming Laptop": Gamepad2,
    "Macbook": Laptop,
    "Office Laptop": Building2,
    "Phone": Smartphone,
    "Ultrabook": Feather,
    "Default": Monitor
};

export default function CategoryGrid({ categories }) {
    if (!categories?.length) return null;

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Danh mục nổi bật</h2>
                <Link href="/products" className="text-sm font-medium text-primary hover:underline">
                    Xem tất cả
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => {
                    const Icon = categoryIcons[category] || categoryIcons["Default"];
                    return (
                        <Link key={category} href={`/products?category=${category}`}>
                            <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full group bg-card/50 backdrop-blur-sm">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full gap-3">
                                    <div className="p-3 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                                        <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {category}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
