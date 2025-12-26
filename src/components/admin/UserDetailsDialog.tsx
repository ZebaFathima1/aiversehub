import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, MapPin, CreditCard } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    registrations: number;
    joinedDate: string;
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
    const mockRegistrations = [
        { event: "AI-Verse 4", date: "2024-06-15", amount: "₹1,499", status: "Confirmed" },
        { event: "AI-Verse 3", date: "2024-04-20", amount: "₹1,299", status: "Completed" },
        { event: "AI-Verse 2", date: "2024-02-10", amount: "₹999", status: "Completed" },
    ];

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
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold">{user.name}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                                    {user.role}
                                </Badge>
                                <Badge
                                    variant={user.status === "active" ? "default" : "outline"}
                                    className={
                                        user.status === "active"
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : ""
                                    }
                                >
                                    {user.status}
                                </Badge>
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
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>Mumbai, Maharashtra, India</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Registration History */}
                    <div>
                        <h4 className="font-semibold mb-3">Registration History</h4>
                        <div className="space-y-3">
                            {mockRegistrations.map((reg, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{reg.event}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(reg.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{reg.amount}</p>
                                        <Badge
                                            variant="outline"
                                            className="bg-green-500/10 text-green-500 border-green-500/20"
                                        >
                                            {reg.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
