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

export default function DashboardStats({ data, loading }: { data: any, loading: boolean }) {
    const stats = [
        {
            title: "Total Users",
            value: data?.total_users?.toLocaleString() || "0",
            change: 0,
            icon: Users,
        },
        {
            title: "Active Events",
            value: data?.active_events || "0",
            change: 0,
            icon: Calendar,
        },
        {
            title: "Total Registrations",
            value: data?.total_registrations?.toLocaleString() || "0",
            change: 0,
            icon: TrendingUp,
        },
        {
            title: "Revenue",
            value: formatCurrency(data?.total_revenue || 0),
            change: 0,
            icon: CreditCard,
        },
    ];

    if (loading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="h-32 animate-pulse bg-muted" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatCard key={stat.title} {...stat} index={index} />
            ))}
        </div>
    );
}
