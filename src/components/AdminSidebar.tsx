
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, DollarSign, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Inventory",
        href: "/admin/inventory",
        icon: Package,
    },
    {
        title: "Income",
        href: "/admin/income",
        icon: DollarSign,
    },
    //   {
    //     title: "Settings",
    //     href: "/admin/settings",
    //     icon: Settings,
    //   },
];

export function AdminSidebar() {
    const location = useLocation();
    const { signOut } = useAuth();

    return (
        <div className="flex h-screen flex-col justify-between border-r bg-background w-64 p-4">
            <div className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-xl font-bold font-serif text-primary">Shop Simple</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Admin</span>
                </div>

                <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                location.pathname === item.href
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="space-y-1">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => signOut()}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
