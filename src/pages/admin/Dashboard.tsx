import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, TrendingUp, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { useCollections } from "@/hooks/useCollections";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format, parseISO, subDays, isAfter } from "date-fns";

export default function AdminDashboard() {
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const { data: collections, isLoading: loadingStock } = useCollections();

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
  const totalOrders = orders?.length || 0;

  // Calculate total stock (main products + variants)
  const totalStock = collections?.reduce((sum, product) => {
    const variantStock = product.product_variants?.reduce((vSum, v) => vSum + v.stock_quantity, 0) || 0;
    return sum + (product.stock_quantity || 0) + variantStock;
  }, 0) || 0;

  // Low stock products (less than 10 units total)
  const lowStockProducts = collections?.filter((product) => {
    const totalQty = (product.stock_quantity || 0) +
      (product.product_variants?.reduce((s, v) => s + v.stock_quantity, 0) || 0);
    return totalQty > 0 && totalQty < 10;
  }) || [];

  // Recent orders (last 7 days)
  const recentOrders = orders?.filter(o => 
    isAfter(parseISO(o.created_at), subDays(new Date(), 7))
  ) || [];
  
  const recentRevenue = recentOrders.reduce((sum, o) => sum + o.total_amount, 0);

  if (loadingOrders || loadingStock) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-serif">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                ${recentRevenue.toFixed(2)}
              </span>
              {" "}last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                {recentOrders.length}
              </span>
              {" "}last 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
            <p className="text-xs text-muted-foreground">
              Across {collections?.length || 0} products
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collections?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Listed in store
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-yellow-500" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                All products are well stocked! 🎉
              </p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map((product) => {
                  const totalQty = (product.stock_quantity || 0) +
                    (product.product_variants?.reduce((s, v) => s + v.stock_quantity, 0) || 0);
                  return (
                    <div key={product.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{product.name}</span>
                      <Badge variant="secondary">{totalQty} left</Badge>
                    </div>
                  );
                })}
                {lowStockProducts.length > 5 && (
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link to="/admin/products">View all {lowStockProducts.length} products</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No orders in the last 7 days
              </p>
            ) : (
              <div className="space-y-3">
                {recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{order.customer_email}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(parseISO(order.created_at), "MMM d, h:mm a")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${order.total_amount.toFixed(2)}</p>
                      <Badge variant={order.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {recentOrders.length > 5 && (
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link to="/admin/income">View all orders</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/admin/products">Manage Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/income">View Income Report</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/" target="_blank">View Storefront</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
