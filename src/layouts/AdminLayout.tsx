
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminLayout() {
    const { user, isAdmin, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            toast.error('Access denied. Admin only.');
            navigate('/');
        }
    }, [user, isAdmin, loading, navigate]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background font-sans antialiased">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-muted/20 p-8">
                <div className="mx-auto max-w-6xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
