import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { type Event } from "@/data/events";
import { toast } from "sonner";

const eventSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    year: z.string().min(4, "Year is required"),
    date: z.string().min(1, "Date is required"),
    endDate: z.string().optional(),
    venue: z.string().min(3, "Venue is required"),
    time: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    tagline: z.string().optional(),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    price: z.number().min(0, "Price must be 0 or greater"),
    status: z.enum(["upcoming", "ongoing", "completed"]),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EditEventDialogProps {
    event: Event | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (event: Event) => void;
}

export default function EditEventDialog({
    event,
    open,
    onOpenChange,
    onSave,
}: EditEventDialogProps) {
    const [highlights, setHighlights] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [newHighlight, setNewHighlight] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
    });

    useEffect(() => {
        if (open) {
            if (event) {
                reset({
                    name: event.name,
                    title: event.title,
                    year: event.year,
                    date: event.date,
                    endDate: event.endDate || "",
                    venue: event.venue,
                    time: event.time || "",
                    description: event.description,
                    tagline: event.tagline || "",
                    capacity: event.capacity,
                    price: event.price,
                    status: event.status,
                });
                setHighlights(event.highlights || []);
                setImagePreview(event.image || "");
            } else {
                reset({
                    name: "",
                    title: "",
                    year: new Date().getFullYear().toString(),
                    date: "",
                    endDate: "",
                    venue: "",
                    time: "",
                    description: "",
                    tagline: "",
                    capacity: 100,
                    price: 0,
                    status: "upcoming",
                });
                setHighlights([]);
                setImagePreview("");
            }
            setImageFile(null);
        }
    }, [event, open, reset]);

    const status = watch("status");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addHighlight = () => {
        if (newHighlight.trim() && !highlights.includes(newHighlight.trim())) {
            setHighlights([...highlights, newHighlight.trim()]);
            setNewHighlight("");
        }
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index));
    };

    const onSubmit = (data: EventFormData) => {
        // We handle the Save operation in the parent component via onSave
        if (onSave) {
            const finalData = {
                ...data,
                highlights,
                // If we have an image file, we might need special handling in onSave
                // but for now we pass the preview or existing URL
                image: imageFile || imagePreview
            };
            onSave(finalData as any);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label>Event Image</Label>
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <div className="relative h-48 rounded-lg overflow-hidden bg-muted border-2 border-dashed border-border hover:border-primary transition-colors">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                            <ImageIcon className="h-12 w-12 mb-2" />
                                            <p className="text-sm">No image selected</p>
                                        </div>
                                    )}
                                </div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-2"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Upload a new image or paste an image URL below
                                </p>
                            </div>
                        </div>
                        <Input
                            placeholder="Or paste image URL here"
                            value={imagePreview}
                            onChange={(e) => setImagePreview(e.target.value)}
                        />
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Event Name *</Label>
                            <Input id="name" {...register("name")} />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Display Title *</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && (
                                <p className="text-sm text-destructive">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            rows={4}
                            placeholder="Describe the event..."
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                        <Label htmlFor="tagline">Tagline (Optional)</Label>
                        <Input
                            id="tagline"
                            {...register("tagline")}
                            placeholder="A catchy tagline for the event"
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Start Date *</Label>
                            <Input id="date" type="date" {...register("date")} />
                            {errors.date && (
                                <p className="text-sm text-destructive">{errors.date.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date (Optional)</Label>
                            <Input id="endDate" type="date" {...register("endDate")} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time (Optional)</Label>
                            <Input
                                id="time"
                                {...register("time")}
                                placeholder="3:00 PM - 6:00 PM"
                            />
                        </div>
                    </div>

                    {/* Venue & Year */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="venue">Venue *</Label>
                            <Input id="venue" {...register("venue")} />
                            {errors.venue && (
                                <p className="text-sm text-destructive">{errors.venue.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Year *</Label>
                            <Input id="year" {...register("year")} placeholder="2025" />
                            {errors.year && (
                                <p className="text-sm text-destructive">{errors.year.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Capacity & Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity *</Label>
                            <Input
                                id="capacity"
                                type="number"
                                {...register("capacity", { valueAsNumber: true })}
                            />
                            {errors.capacity && (
                                <p className="text-sm text-destructive">{errors.capacity.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹) *</Label>
                            <Input
                                id="price"
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                            />
                            {errors.price && (
                                <p className="text-sm text-destructive">{errors.price.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="status">Status *</Label>
                        <Select
                            value={status}
                            onValueChange={(value) =>
                                setValue("status", value as "upcoming" | "ongoing" | "completed")
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                        <Label>Event Highlights</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a highlight..."
                                value={newHighlight}
                                onChange={(e) => setNewHighlight(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                            />
                            <Button type="button" onClick={addHighlight} variant="outline">
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {highlights.map((highlight, index) => (
                                <Badge key={index} variant="secondary" className="gap-1">
                                    {highlight}
                                    <button
                                        type="button"
                                        onClick={() => removeHighlight(index)}
                                        className="ml-1 hover:text-destructive"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
