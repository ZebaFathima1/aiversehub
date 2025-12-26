import { useState } from "react";
import { motion } from "framer-motion";
import {
    MoreHorizontal,
    Search,
    Plus,
    Download,
    Edit,
    Trash2,
    Eye,
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allEvents, formatCurrency, formatDate, type Event } from "@/data/events";
import EventDetailsDialog from "./EventDetailsDialog";
import EditEventDialog from "./EditEventDialog";
import { toast } from "sonner";

export default function EventsManagementTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const filteredEvents = allEvents.filter((event) => {
        const matchesSearch = event.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || event.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const getStatusColor = (status: Event["status"]) => {
        switch (status) {
            case "upcoming":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "ongoing":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "completed":
                return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    const handleViewDetails = (event: Event) => {
        setSelectedEvent(event);
        setDetailsDialogOpen(true);
    };

    const handleEdit = (event: Event) => {
        setSelectedEvent(event);
        setEditDialogOpen(true);
    };

    const handleDelete = (event: Event) => {
        // In a real app, this would call an API
        toast.success(`Event "${event.name}" would be deleted (demo mode)`);
    };

    const handleSaveEvent = (updatedEvent: Event) => {
        // In a real app, this would update the backend
        toast.success("Event updated successfully!");
    };

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <CardTitle>Event Management</CardTitle>
                            <div className="flex flex-wrap gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 w-[200px] sm:w-[300px]"
                                    />
                                </div>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Create Event
                                </Button>
                                <Button variant="outline" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                            <TabsList>
                                <TabsTrigger value="all">All Events</TabsTrigger>
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event Name</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Venue</TableHead>
                                        <TableHead>Capacity</TableHead>
                                        <TableHead>Registered</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEvents.map((event) => (
                                        <TableRow key={event.id} className="group">
                                            <TableCell className="font-medium">{event.name}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(event.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {event.venue}
                                            </TableCell>
                                            <TableCell>{event.capacity}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span>{event.registered}</span>
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                                            style={{
                                                                width: `${(event.registered / event.capacity) * 100}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {formatCurrency(event.revenue)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getStatusColor(event.status)}>
                                                    {event.status}
                                                </Badge>
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
                                                        <DropdownMenuItem onClick={() => handleViewDetails(event)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEdit(event)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit Event
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => handleDelete(event)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete Event
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Event Details Dialog */}
            <EventDetailsDialog
                event={selectedEvent}
                open={detailsDialogOpen}
                onOpenChange={setDetailsDialogOpen}
            />

            {/* Edit Event Dialog */}
            <EditEventDialog
                event={selectedEvent}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onSave={handleSaveEvent}
            />
        </>
    );
}
