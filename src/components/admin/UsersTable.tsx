import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MoreHorizontal,
    Search,
    UserPlus,
    Download,
    Eye,
    Edit,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserDetailsDialog from "./UserDetailsDialog";

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

export default function UsersTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storedPayments = localStorage.getItem("allPayments");
        if (storedPayments) {
            try {
                const payments = JSON.parse(storedPayments);
                // Extract unique users from payments
                const uniqueUsersMap = new Map();

                payments.forEach((p: any) => {
                    if (!uniqueUsersMap.has(p.email)) {
                        uniqueUsersMap.set(p.email, {
                            id: p.id, // Use payment ID as simplified User ID
                            name: p.user,
                            email: p.email,
                            role: "user", // Default role
                            status: "active",
                            registrations: 1,
                            joinedDate: p.date
                        });
                    } else {
                        const existing = uniqueUsersMap.get(p.email);
                        existing.registrations += 1;
                    }
                });

                setUsers(Array.from(uniqueUsersMap.values()));
            } catch (e) {
                console.error("Failed to parse payments for users", e);
            }
        }
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <CardTitle>User Management</CardTitle>
                            <div className="flex flex-wrap gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 w-[200px] sm:w-[300px]"
                                    />
                                </div>
                                <Button className="gap-2">
                                    <UserPlus className="h-4 w-4" />
                                    Add User
                                </Button>
                                <Button variant="outline" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Registrations</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id} className="group">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.avatar} />
                                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                                            {user.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={user.role === "admin" ? "default" : "secondary"}
                                                >
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.status === "active" ? "default" : "outline"
                                                    }
                                                    className={
                                                        user.status === "active"
                                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                            : ""
                                                    }
                                                >
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{user.registrations}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(user.joinedDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit User
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete User
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredUsers.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-24 text-center">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {selectedUser && (
                <UserDetailsDialog
                    user={selectedUser}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                />
            )}
        </>
    );
}
