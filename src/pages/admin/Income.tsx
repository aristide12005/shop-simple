
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function IncomeTracking() {
    const { data: orders, isLoading } = useOrders();

    if (isLoading) return <div>Loading income data...</div>;

    const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
    const totalOrders = orders?.length || 0;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Group by date for chart
    const salesByDateMap = new Map<string, number>();
    orders?.forEach(order => {
        const date = format(parseISO(order.created_at), 'yyyy-MM-dd');
        const current = salesByDateMap.get(date) || 0;
        salesByDateMap.set(date, current + order.total_amount);
    });

    const chartData = Array.from(salesByDateMap.entries())
        .map(([date, amount]) => ({ date, amount }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-30); // Last 30 days

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight font-serif">Income Tracking</h2>
                <p className="text-muted-foreground">Detailed financial overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[300px] w-full">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(val) => format(parseISO(val), 'MMM dd')}
                                        stroke="#888888"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        tickFormatter={(val) => `$${val}`}
                                        stroke="#888888"
                                        fontSize={12}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                                        labelFormatter={(label) => format(parseISO(label), 'PPP')}
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
        </div>
    );
}
