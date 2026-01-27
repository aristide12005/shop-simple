import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, ShoppingBag, CreditCard, Eye, MapPin, Package } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { useOrderItems } from "@/hooks/useOrderItems";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, parseISO, subDays, isAfter, startOfDay } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/database";

// Order Details Component
function OrderDetailsDialog({ order, open, onOpenChange }: { 
  order: Order | null; 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
}) {
  const { data: orderItems, isLoading } = useOrderItems(order?.id || '');
  
  if (!order) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Order Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{format(parseISO(order.created_at), 'PPP p')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'}>
                {order.status}
              </Badge>
            </div>
          </div>
          
          {/* Customer Info */}
          <div className="border rounded-lg p-4 space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Customer Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{order.customer_name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
            </div>
          </div>
          
          {/* Shipping Address */}
          {(order.shipping_address || order.shipping_city || order.shipping_country) && (
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Shipping Address
              </h4>
              <div className="text-sm">
                <p>{order.shipping_address}</p>
                <p>{order.shipping_city}, {order.shipping_country}</p>
              </div>
            </div>
          )}
          
          {/* Order Items */}
          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Package className="h-4 w-4" /> Order Items
            </h4>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading items...</p>
            ) : orderItems && orderItems.length > 0 ? (
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.collection_name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No items found</p>
            )}
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
            <span>Total</span>
            <span className="text-primary">${order.total_amount.toFixed(2)}</span>
          </div>
          
          {/* PayPal ID */}
          {order.paypal_order_id && (
            <div className="text-xs text-muted-foreground">
              PayPal Transaction: <span className="font-mono">{order.paypal_order_id}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function IncomeTracking() {
  const { data: orders, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading income data...</div>
      </div>
    );
  }

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
  const totalOrders = orders?.length || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Recent 7 days revenue
  const last7Days = orders?.filter(o => isAfter(parseISO(o.created_at), subDays(new Date(), 7))) || [];
  const last7DaysRevenue = last7Days.reduce((sum, o) => sum + o.total_amount, 0);

  // Group by date for chart
  const salesByDateMap = new Map<string, { date: string; amount: number; orders: number }>();
  orders?.forEach(order => {
    const date = format(parseISO(order.created_at), 'yyyy-MM-dd');
    const current = salesByDateMap.get(date) || { date, amount: 0, orders: 0 };
    salesByDateMap.set(date, {
      date,
      amount: current.amount + order.total_amount,
      orders: current.orders + 1,
    });
  });

  const chartData = Array.from(salesByDateMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);

  // Completed orders
  const completedOrders = orders?.filter(o => o.status === 'completed') || [];
  const pendingOrders = orders?.filter(o => o.status === 'pending') || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-serif">Income Tracking</h2>
        <p className="text-muted-foreground">Detailed financial overview and order history.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${last7DaysRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{last7Days.length} orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {completedOrders.length} completed, {pendingOrders.length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order average</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Chart</TabsTrigger>
          <TabsTrigger value="orders">Orders Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(val) => format(parseISO(val), 'MMM dd')}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        tickFormatter={(val) => `$${val}`}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                        labelFormatter={(label) => format(parseISO(label), 'PPP')}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No sales data available to display chart.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(val) => format(parseISO(val), 'MMM dd')}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value: number) => [value, 'Orders']}
                        labelFormatter={(label) => format(parseISO(label), 'PPP')}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No orders data available to display chart.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No orders yet.
                  </TableCell>
                </TableRow>
              ) : (
                orders?.slice(0, 50).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {format(parseISO(order.created_at), 'MMM d, yyyy h:mm a')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer_name || 'Guest'}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.shipping_city ? (
                        <div className="text-sm">
                          <p>{order.shipping_city}</p>
                          <p className="text-muted-foreground">{order.shipping_country}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="font-bold">${order.total_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'completed' ? 'default' :
                          order.status === 'pending' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <OrderDetailsDialog 
        order={selectedOrder} 
        open={!!selectedOrder} 
        onOpenChange={(open) => !open && setSelectedOrder(null)} 
      />
    </div>
  );
}
