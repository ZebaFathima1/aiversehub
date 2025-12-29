import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/admin/DashboardLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Users,
    CreditCard,
    TrendingUp,
    ArrowRight,
    RefreshCw,
} from "lucide-react";
import { analyticsApi } from "@/lib/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const quickActions = [
    {
        title: "Create Event",
        description: "Add a new event to the platform",
        icon: Calendar,
        color: "from-blue-500 to-cyan-500",
        link: "/admin/events",
    },
    {
        title: "Manage Users",
        description: "View and manage user accounts",
        icon: Users,
        color: "from-purple-500 to-pink-500",
        link: "/admin/users",
    },
    {
        title: "View Payments",
        description: "Track payment transactions",
        icon: CreditCard,
        color: "from-green-500 to-emerald-500",
        link: "/admin/payments",
    },
    {
        title: "Analytics",
        description: "View detailed analytics",
        icon: TrendingUp,
        color: "from-orange-500 to-red-500",
        link: "/admin",
    },
];

export default function AdminDashboard() {
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await analyticsApi.getDashboard();
            setAnalyticsData(response.data);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - AI-Verse Hub</title>
            </Helmet>

            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Admin Dashboard
                            </h1>
                            <p className="text-muted-foreground">
                                Welcome back! Here's what's happening with your platform today.
                            </p>
                        </motion.div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchAnalytics}
                            disabled={loading}
                            className="gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh Data
                        </Button>
                    </div>

                    {/* Stats */}
                    <DashboardStats data={analyticsData?.stats} loading={loading} />

                    {/* Charts */}
                    <DashboardCharts data={analyticsData?.chart_data} loading={loading} />

                    {/* Quick Actions & Recent Activity */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {quickActions.map((action, index) => {
                                            const Icon = action.icon;
                                            return (
                                                <Link to={action.link} key={index}>
                                                    <Button
                                                        variant="outline"
                                                        className="h-auto p-4 w-full flex flex-col items-start gap-2 group hover:shadow-glow transition-all"
                                                    >
                                                        <div
                                                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                                        >
                                                            <Icon className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="font-semibold">{action.title}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {action.description}
                                                            </p>
                                                        </div>
                                                    </Button>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Activity</CardTitle>
                                    <Button variant="ghost" size="sm" className="gap-2" asChild>
                                        <Link to="/admin/payments">
                                            View All
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {loading ? (
                                            [1, 2, 3, 4].map(i => (
                                                <div key={i} className="flex items-center gap-3 p-3">
                                                    <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-4 w-2/3 bg-muted animate-pulse" />
                                                        <div className="h-3 w-1/3 bg-muted animate-pulse" />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (analyticsData?.activities && analyticsData.activities.length > 0) ? (
                                            analyticsData.activities.map((activity: any) => (
                                                <div
                                                    key={activity.id}
                                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                                            {activity.user[0].toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm">
                                                            <span className="font-medium">{activity.user}</span>{" "}
                                                            {activity.action}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {new Date(activity.time).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            activity.type === "payment"
                                                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                                : activity.type === "registration"
                                                                    ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                                    : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                                        }
                                                    >
                                                        {activity.type}
                                                    </Badge>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center py-4 text-muted-foreground">No recent activities</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
