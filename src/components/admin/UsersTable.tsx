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
    RefreshCw
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
import { userApi } from "@/lib/api";
import { toast } from "sonner";

interface User {
    id: number;
    username: string;
    email: string;
    full_name: string;
    college?: string;
    department?: string;
    year_of_study?: string;
    profile_image_url?: string;
    is_admin: boolean;
    is_active: boolean;
    avatar?: string;
    total_registrations?: number;
    joinedDate?: string;
}

export default function UsersTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await userApi.getAll();
            const data = Array.isArray(response.data) ? response.data : (response.data?.results || []);

            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error("Expected array for users, got:", response.data);
                setUsers([]);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error("Failed to load users from server");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = Array.isArray(users) ? users.filter(
        (user) =>
            (user?.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user?.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user?.full_name || "").toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleDeleteUser = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await userApi.delete(id);
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
            toast.error("Failed to delete user");
        }
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
                                <Button variant="outline" size="icon" onClick={fetchUsers} disabled={loading}>
                                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                </Button>
                                <Button className="gap-2" onClick={() => {
                                    setSelectedUser(null); // Clear selection for creating new
                                    setDialogOpen(true);
                                }}>
                                    <UserPlus className="h-4 w-4" />
                                    Add User
                                </Button>
                                <Button variant="outline" className="gap-2" onClick={() => {
                                    const headers = ["ID", "Username", "Email", "Full Name", "Role", "Department", "Joined Date"];
                                    const csvContent = [
                                        headers.join(","),
                                        ...users.map(u => [
                                            u.id,
                                            u.username,
                                            u.email,
                                            `"${u.full_name}"`,
                                            u.is_admin ? "Admin" : "User",
                                            `"${u.college || "N/A"}"`,
                                            new Date(u.joinedDate || "").toLocaleDateString()
                                        ].join(","))
                                    ].join("\n");

                                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.setAttribute("href", url);
                                    link.setAttribute("download", "users_export.csv");
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}>
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
                                        <TableHead>Department</TableHead>
                                        <TableHead>Registrations</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                                                Loading users...
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id} className="group">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={user.profile_image_url || user.avatar} />
                                                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                                                {user.full_name ? user.full_name[0] : (user.username ? user.username[0] : "?")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{user.full_name}</span>
                                                            <span className="text-xs text-muted-foreground">@{user.username}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={user.is_admin ? "default" : "secondary"}
                                                    >
                                                        {user.is_admin ? "Admin" : "User"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {user.department || user.college || "N/A"}
                                                </TableCell>
                                                <TableCell>{user.total_registrations || 0}</TableCell>
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
                                                            <DropdownMenuItem
                                                                className="text-destructive"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {selectedUser !== undefined && ( // Allow null for create mode
                <UserDetailsDialog
                    user={selectedUser as any}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    onUserAdded={fetchUsers}
                />
            )}
        </>
    );
}
