import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Calendar, Mail, Phone, MapPin, CreditCard, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userApi } from "@/lib/api";
import { toast } from "sonner";

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile?: {
        role: string;
        department: string;
        year: string;
    };
    avatar?: string;
    registrations?: number;
    joinedDate?: string;
}

interface UserDetailsDialogProps {
    user: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUserAdded?: () => void;
}

export default function UserDetailsDialog({
    user,
    open,
    onOpenChange,
    onUserAdded
}: UserDetailsDialogProps) {
    const isCreating = !user;
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "", // Optional, can derive from email
        password: "password123", // Default for now
        department: "",
        year_of_study: ""
    });

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            // Basic validation
            if (!formData.email || !formData.first_name) {
                toast.error("Email and Name are required");
                return;
            }

            const payload = {
                ...formData,
                username: formData.email, // Use email as username
                full_name: `${formData.first_name} ${formData.last_name}`.trim(),
                college: "N/A" // Default
            };

            await userApi.create(payload);
            toast.success("User created successfully");
            onOpenChange(false);
            if (onUserAdded) onUserAdded();

            // Reset form
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                password: "password123",
                department: "",
                year_of_study: ""
            });

        } catch (error: any) {
            console.error("Failed to create user:", error);
            const msg = error.response?.data?.email?.[0] || "Failed to create user";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    if (isCreating) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john.doe@example.com"
                                type="email"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Input
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    placeholder="CSE"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Year</Label>
                                <Input
                                    value={formData.year_of_study}
                                    onChange={(e) => setFormData({ ...formData, year_of_study: e.target.value })}
                                    placeholder="3rd Year"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={handleCreate} disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create User"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    // View Mode (Existing Code)
    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || "Unknown";
    const initials = user?.first_name ? `${user.first_name[0]}${user.last_name?.[0] || ""}` : (user?.username?.[0] || "?").toUpperCase();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* User Profile */}
                    <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold">{fullName}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant={user?.profile?.role === "admin" ? "default" : "secondary"}>
                                    {user?.profile?.role || "user"}
                                </Badge>
                                <Badge
                                    variant="default"
                                    className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                    active
                                </Badge>
                                {user?.profile?.department && (
                                    <Badge variant="outline">
                                        {user.profile.department}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Contact Information */}
                    <div>
                        <h4 className="font-semibold mb-3">Contact Information</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>@{user?.username}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Joined {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 bg-muted/30">
                            <div className="text-sm text-muted-foreground">Total Registrations</div>
                            <div className="text-2xl font-bold">{user?.registrations || 0}</div>
                        </Card>
                        <Card className="p-4 bg-muted/30">
                            <div className="text-sm text-muted-foreground">Year</div>
                            <div className="text-2xl font-bold">{user?.profile?.year || 'N/A'}</div>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
