import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, DollarSign, LogOut, Store, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Income",
    href: "/admin/income",
    icon: DollarSign,
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-card w-64 p-4">
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <Store className="h-6 w-6 text-primary" />
          <div>
            <span className="text-lg font-bold font-serif text-foreground">Shop Simple</span>
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Admin</span>
          </div>
        </div>

        <Separator />

        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/admin" && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <Separator />

        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ShoppingBag className="h-4 w-4" />
          View Store
        </Link>
      </div>

      <div className="space-y-1">
        <Separator className="mb-4" />
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
