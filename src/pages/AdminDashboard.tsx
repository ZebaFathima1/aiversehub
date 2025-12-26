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
} from "lucide-react";

const recentActivities = [
    {
        id: 1,
        user: "Rahul Sharma",
        action: "registered for AI-Verse 4.0",
        time: "2 minutes ago",
        type: "registration",
    },
    {
        id: 2,
        user: "Priya Patel",
        action: "completed payment of ₹1,499",
        time: "15 minutes ago",
        type: "payment",
    },
    {
        id: 3,
        user: "Amit Kumar",
        action: "updated profile information",
        time: "1 hour ago",
        type: "profile",
    },
    {
        id: 4,
        user: "Sneha Reddy",
        action: "registered for AI Workshop Series",
        time: "2 hours ago",
        type: "registration",
    },
];

const quickActions = [
    {
        title: "Create Event",
        description: "Add a new event to the platform",
        icon: Calendar,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Manage Users",
        description: "View and manage user accounts",
        icon: Users,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "View Payments",
        description: "Track payment transactions",
        icon: CreditCard,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Analytics",
        description: "View detailed analytics",
        icon: TrendingUp,
        color: "from-orange-500 to-red-500",
    },
];

export default function AdminDashboard() {
    return (
        <>
            <Helmet>
                <title>Admin Dashboard - AI-Verse Hub</title>
            </Helmet>

            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
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

                    {/* Stats */}
                    <DashboardStats />

                    {/* Charts */}
                    <DashboardCharts />

                    {/* Quick Actions & Recent Activity */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {quickActions.map((action, index) => {
                                            const Icon = action.icon;
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    className="h-auto p-4 flex flex-col items-start gap-2 group hover:shadow-glow transition-all"
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
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Activity</CardTitle>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        View All
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentActivities.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                                        {activity.user
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm">
                                                        <span className="font-medium">{activity.user}</span>{" "}
                                                        {activity.action}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {activity.time}
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
                                        ))}
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
