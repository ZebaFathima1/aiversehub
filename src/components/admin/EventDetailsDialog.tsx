import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, DollarSign, Image as ImageIcon } from "lucide-react";
import { formatCurrency, formatDate, type Event } from "@/data/events";

interface EventDetailsDialogProps {
    event: Event | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EventDetailsDialog({
    event,
    open,
    onOpenChange,
}: EventDetailsDialogProps) {
    if (!event) return null;

    const registrationPercentage = (event.registered / event.capacity) * 100;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Event Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Event Image */}
                    <div className="relative h-64 rounded-lg overflow-hidden bg-muted">
                        <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                            <Badge
                                variant="outline"
                                className={
                                    event.status === "upcoming"
                                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                        : event.status === "ongoing"
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                }
                            >
                                {event.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Event Header */}
                    <div>
                        <h2 className="text-3xl font-bold gradient-text mb-2">{event.name}</h2>
                        <p className="text-muted-foreground">{event.description}</p>
                    </div>

                    <Separator />

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Date:</span>
                                <span>{formatDate(event.date)}</span>
                            </div>
                            {event.endDate && (
                                <div className="flex items-center gap-2 text-sm ml-6">
                                    <span className="text-muted-foreground">to</span>
                                    <span>{formatDate(event.endDate)}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Venue:</span>
                                <span>{event.venue}</span>
                            </div>
                        </div>

                        {event.time && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Time:</span>
                                    <span>{event.time}</span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Price:</span>
                                <span>{formatCurrency(event.price)}</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Registration Stats */}
                    <div>
                        <h3 className="font-semibold mb-3">Registration Statistics</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Capacity:</span>
                                </div>
                                <span className="font-semibold">{event.capacity}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm">Registered:</span>
                                <span className="font-semibold">{event.registered}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Progress:</span>
                                    <span>{registrationPercentage.toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                        style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t">
                                <span className="text-sm font-medium">Total Revenue:</span>
                                <span className="font-bold text-lg gradient-text">
                                    {formatCurrency(event.revenue)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Highlights */}
                    <div>
                        <h3 className="font-semibold mb-3">Event Highlights</h3>
                        <div className="flex flex-wrap gap-2">
                            {event.highlights.map((highlight, index) => (
                                <Badge key={index} variant="secondary">
                                    {highlight}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    {event.tagline && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-2">Tagline</h3>
                                <p className="text-muted-foreground italic">{event.tagline}</p>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
