import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Calendar, Mail, Phone, MapPin, CreditCard } from "lucide-react";

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
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function UserDetailsDialog({
    user,
    open,
    onOpenChange,
}: UserDetailsDialogProps) {
    const mockRegistrations: any[] = []; // Placeholder until we fetch real ones if needed

    const fullName = `${user.first_name} ${user.last_name}`.trim() || user.username;
    const initials = user.first_name ? `${user.first_name[0]}${user.last_name?.[0] || ""}` : user.username[0].toUpperCase();

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
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold">{fullName}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant={user.profile?.role === "admin" ? "default" : "secondary"}>
                                    {user.profile?.role || "user"}
                                </Badge>
                                <Badge
                                    variant="default"
                                    className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                    active
                                </Badge>
                                {user.profile?.department && (
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
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>@{user.username}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Joined {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 bg-muted/30">
                            <div className="text-sm text-muted-foreground">Total Registrations</div>
                            <div className="text-2xl font-bold">{user.registrations || 0}</div>
                        </Card>
                        <Card className="p-4 bg-muted/30">
                            <div className="text-sm text-muted-foreground">Year</div>
                            <div className="text-2xl font-bold">{user.profile?.year || 'N/A'}</div>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
