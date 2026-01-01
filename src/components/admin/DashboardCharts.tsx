import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allEvents } from "@/data/events";

// Generate user growth data (mock - would come from user analytics)
const userGrowthData = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1450 },
    { month: "Mar", users: 1680 },
    { month: "Apr", users: 1920 },
    { month: "May", users: 2340 },
    { month: "Jun", users: 2847 },
];

// Generate event registrations data from real events
const eventRegistrationsData = allEvents.map(event => ({
    event: event.name,
    registrations: event.registered,
}));

// Generate revenue data from real events
const revenueData = allEvents
    .filter(event => event.status === "completed" || event.status === "ongoing")
    .map((event, index) => ({
        month: new Date(event.date).toLocaleDateString('en-US', { month: 'short' }),
        revenue: event.revenue,
    }));

// Generate payment status data (mock - would come from payment analytics)
const paymentStatusData = [
    { name: "Completed", value: 856, color: "hsl(160, 84%, 39%)" },
    { name: "Pending", value: 234, color: "hsl(45, 93%, 47%)" },
    { name: "Failed", value: 144, color: "hsl(0, 84%, 60%)" },
];

export default function DashboardCharts({ data, loading }: { data: any, loading: boolean }) {
    if (loading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 mt-6">
                <Card className="h-[400px] animate-pulse bg-muted" />
                <Card className="h-[400px] animate-pulse bg-muted" />
                <Card className="h-[400px] animate-pulse bg-muted" />
                <Card className="h-[400px] animate-pulse bg-muted" />
            </div>
        );
    }

    // Safely extract chart data with fallbacks
    const registrationsByDay = Array.isArray(data?.registrations_by_day) ? data.registrations_by_day : [];
    const paymentStatusDist = Array.isArray(data?.payment_status_distribution) ? data.payment_status_distribution : [];

    // Revenue Trend Data - use registrations data for now
    const revenueTrendData = registrationsByDay.map((item: any) => ({
        name: item.date || 'N/A',
        revenue: item.count * 500, // Estimated revenue
        registrations: item.count || 0
    }));

    // Mock User Growth Data (Backend doesn't provide it yet, so we'll simulate based on registrations)
    const userGrowthData = registrationsByDay.map((item: any) => ({
        month: item.date || 'N/A',
        users: Math.floor((item.count || 0) * 1.5) + 10 // Simulated growth
    }));

    return (
        <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Revenue Trend Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="hsl(var(--primary))"
                                    fill="url(#colorRevenue)"
                                    strokeWidth={2}
                                />
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Registrations Trend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                        <CardTitle>Registrations Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar
                                    dataKey="registrations"
                                    fill="url(#colorRegs)"
                                    radius={[8, 8, 0, 0]}
                                />
                                <defs>
                                    <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--secondary))" />
                                        <stop offset="100%" stopColor="hsl(var(--primary))" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            {/* User Growth Chart (Simulated) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                        <CardTitle>User Growth (Est.)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                                    activeDot={{ r: 7 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Platform Health (Placeholder for now) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-500">Active</div>
                                    <div className="text-sm text-muted-foreground">Server State</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-500">99.9%</div>
                                    <div className="text-sm text-muted-foreground">Uptime</div>
                                </div>
                            </div>
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: "95%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
