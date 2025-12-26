import { motion } from "framer-motion";
import { Users, Calendar, CreditCard, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventStatistics, formatCurrency } from "@/data/events";

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    index: number;
}

function StatCard({ title, value, change, icon: Icon, index }: StatCardProps) {
    const isPositive = change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="relative overflow-hidden group hover:shadow-glow transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {title}
                    </CardTitle>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold gradient-text">{value}</div>
                    <div className="flex items-center gap-1 mt-2">
                        {isPositive ? (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                        ) : (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                            className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {Math.abs(change)}%
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function DashboardStats() {
    // Basic stats from events data (static)
    const eventStats = getEventStatistics();

    // Dynamic stats from localStorage
    const storedPayments = localStorage.getItem("allPayments");
    let dynamicRevenue = 0;
    let dynamicRegistrations = 0;
    let dynamicUsers = 0;

    if (storedPayments) {
        try {
            const payments = JSON.parse(storedPayments);
            // Calculate total revenue from real payments
            // Assuming amounts are like "₹499", removing non-digits
            dynamicRevenue = payments.reduce((sum: number, p: any) => {
                const amount = parseInt(p.amount.replace(/[^0-9]/g, "")) || 0;
                return sum + amount;
            }, 0);

            dynamicRegistrations = payments.length;

            // Count unique users
            const uniqueUsers = new Set(payments.map((p: any) => p.email));
            dynamicUsers = uniqueUsers.size;

        } catch (e) {
            console.error("Failed to parse paymentsstats", e);
        }
    }

    // Combine static and dynamic stats?
    // Since we cleared dummy data, eventStats might be low. 
    // Let's rely on dynamic data if available + the static event counts.

    const stats = [
        {
            title: "Total Users",
            value: dynamicUsers.toLocaleString(), // Use dynamic user count
            change: 100, // Show simplified positive change
            icon: Users,
        },
        {
            title: "Active Events",
            value: eventStats.activeEvents,
            change: 0,
            icon: Calendar,
        },
        {
            title: "Total Registrations",
            value: dynamicRegistrations.toLocaleString(), // Use dynamic registrations
            change: 100,
            icon: TrendingUp,
        },
        {
            title: "Revenue",
            value: formatCurrency(dynamicRevenue), // Use dynamic revenue
            change: 100,
            icon: CreditCard,
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatCard key={stat.title} {...stat} index={index} />
            ))}
        </div>
    );
}
