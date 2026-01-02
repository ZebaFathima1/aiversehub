import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, RefreshCw, Camera } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { eventApi, getImageUrl } from "@/lib/api";
import { eventGalleries } from "@/data/galleryData";

const EventGalleryPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) return;
            try {
                const response = await eventApi.getById(eventId);
                setEvent(response.data);
            } catch (err) {
                console.error("Failed to fetch event gallery from API, trying static data:", err);
                const staticEvent = eventGalleries.find(g => g.id === eventId || g.id.replace('-', '') === eventId?.replace('-', ''));
                if (staticEvent) {
                    setEvent({
                        id: staticEvent.id,
                        title: staticEvent.name,
                        description: staticEvent.description,
                        date: staticEvent.date,
                        gallery_images: staticEvent.images.map(img => ({ id: img.id, image: img.src, title: img.title }))
                    });
                } else {
                    setError("Event not found");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <RefreshCw className="w-10 h-10 animate-spin text-primary mb-4" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Event not found</h1>
                    <button
                        onClick={() => navigate("/#gallery")}
                        className="text-primary hover:underline"
                    >
                        Back to Gallery
                    </button>
                </div>
            </div>
        );
    }

    const images = event.images || event.gallery_images || [];
    const title = event.title || event.name;
    const description = event.description || event.short_description;
    const date = event.date || new Date().toISOString();

    const openLightbox = (image: any, index: number) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => setSelectedImage(null);

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    return (
        <>
            <Helmet>
                <title>{title} Gallery - AI-Verse Hub</title>
            </Helmet>

            <div className="min-h-screen bg-background pt-20 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <button
                            onClick={() => navigate("/#gallery")}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Gallery
                        </button>

                        <div className="text-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                {new Date(date).toLocaleDateString()}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                                <span className="gradient-text">{title}</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                {description}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                {images.length} photos
                            </p>
                        </div>
                    </motion.div>

                    {/* Gallery Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {images.map((image: any, index: number) => (
                            <motion.div
                                key={image.id}
                                className="cursor-pointer"
                                onClick={() => openLightbox(image, index)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-video rounded-2xl overflow-hidden group shadow-lg">
                                    <motion.div
                                        className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10"
                                    />
                                    <img
                                        src={getImageUrl(image.image || image.image_url)}
                                        alt={image.caption || image.title || title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "/gallery/datastargaze/cover.jpg";
                                        }}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center">
                                                <Camera className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-xs font-bold text-primary-foreground tracking-wider uppercase">Shot {index + 1}</span>
                                        </div>
                                        <p className="text-white font-display font-bold text-lg leading-tight">{image.caption || image.title || "Capture"}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-foreground/95 backdrop-blur-md"
                            onClick={closeLightbox}
                        />

                        {/* Close Button */}
                        <motion.button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-background/20 transition-colors z-10"
                            onClick={closeLightbox}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Navigation */}
                        <motion.button
                            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-background/20 transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                            whileHover={{ scale: 1.1, x: -5 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-background/20 transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            whileHover={{ scale: 1.1, x: 5 }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>

                        {/* Image */}
                        <motion.div
                            className="relative max-w-5xl max-h-[80vh] mx-4 z-10"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={getImageUrl(selectedImage.image || selectedImage.image_url)}
                                alt={selectedImage.caption || selectedImage.title}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/gallery/datastargaze/cover.jpg";
                                }}
                            />

                            {/* Caption */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent rounded-b-2xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-xl font-display font-bold text-background">{selectedImage.caption || selectedImage.title}</h3>
                            </motion.div>
                        </motion.div>

                        {/* Counter */}
                        <motion.div
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-background text-sm font-medium z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="gradient-text font-bold">{currentIndex + 1}</span>
                            <span className="text-background/50"> / {images.length}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EventGalleryPage;
