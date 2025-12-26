import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function AdminSettings() {
    return (
        <>
            <Helmet>
                <title>Settings - Admin Dashboard</title>
            </Helmet>

            <DashboardLayout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
                        <p className="text-muted-foreground">
                            Configure your platform settings and preferences.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Tabs defaultValue="general" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="email">Email</TabsTrigger>
                                <TabsTrigger value="payment">Payment</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                            </TabsList>

                            {/* General Settings */}
                            <TabsContent value="general">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>General Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="site-name">Site Name</Label>
                                            <Input
                                                id="site-name"
                                                defaultValue="AI-Verse Hub"
                                                placeholder="Enter site name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="site-description">Site Description</Label>
                                            <Textarea
                                                id="site-description"
                                                defaultValue="Premier platform for AI events and workshops"
                                                placeholder="Enter site description"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact-email">Contact Email</Label>
                                            <Input
                                                id="contact-email"
                                                type="email"
                                                defaultValue="contact@aiverse.com"
                                                placeholder="Enter contact email"
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Maintenance Mode</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable maintenance mode to restrict access
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>User Registration</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Allow new users to register
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <Button className="w-full sm:w-auto">Save Changes</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Email Settings */}
                            <TabsContent value="email">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Email Configuration</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="smtp-host">SMTP Host</Label>
                                            <Input
                                                id="smtp-host"
                                                placeholder="smtp.example.com"
                                            />
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="smtp-port">SMTP Port</Label>
                                                <Input
                                                    id="smtp-port"
                                                    placeholder="587"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="smtp-username">SMTP Username</Label>
                                                <Input
                                                    id="smtp-username"
                                                    placeholder="username@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="smtp-password">SMTP Password</Label>
                                            <Input
                                                id="smtp-password"
                                                type="password"
                                                placeholder="Enter SMTP password"
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Email Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Send email notifications to users
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <Button className="w-full sm:w-auto">Save Changes</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Payment Settings */}
                            <TabsContent value="payment">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Payment Gateway Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="razorpay-key">Razorpay Key ID</Label>
                                            <Input
                                                id="razorpay-key"
                                                placeholder="rzp_test_xxxxxxxxxx"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="razorpay-secret">Razorpay Secret Key</Label>
                                            <Input
                                                id="razorpay-secret"
                                                type="password"
                                                placeholder="Enter secret key"
                                            />
                                        </div>

                                        <Separator />

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Test Mode</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Use test mode for payment gateway
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Auto Refunds</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Automatically process refunds
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>

                                        <Button className="w-full sm:w-auto">Save Changes</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Settings */}
                            <TabsContent value="security">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Two-Factor Authentication</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Require 2FA for admin accounts
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Session Timeout</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Auto logout after 30 minutes of inactivity
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Login Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Notify on new login attempts
                                                </p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                placeholder="Enter current password"
                                            />
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="new-password">New Password</Label>
                                                <Input
                                                    id="new-password"
                                                    type="password"
                                                    placeholder="Enter new password"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                                <Input
                                                    id="confirm-password"
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                        </div>

                                        <Button className="w-full sm:w-auto">Update Password</Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </DashboardLayout>
        </>
    );
}
