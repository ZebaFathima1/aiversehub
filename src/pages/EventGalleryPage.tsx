import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getEventById, GalleryImage } from "@/data/galleryData";

const EventGalleryPage = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const event = getEventById(eventId || "");

    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!event) {
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

    const openLightbox = (image: GalleryImage, index: number) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => setSelectedImage(null);

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? event.images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(event.images[newIndex]);
    };

    const goToNext = () => {
        const newIndex = currentIndex === event.images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(event.images[newIndex]);
    };

    return (
        <>
            <Helmet>
                <title>{event.name} Gallery - AI-Verse Hub</title>
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
                                {event.date}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                                <span className="gradient-text">{event.name}</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                {event.description}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                {event.images.length} photos
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
                        {event.images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                className="cursor-pointer"
                                onClick={() => openLightbox(image, index)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex justify-end">
                                            <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                                                <ZoomIn className="w-5 h-5 text-primary-foreground" />
                                            </div>
                                        </div>
                                        <p className="text-primary-foreground font-semibold">{image.title}</p>
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
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />

                            {/* Caption */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent rounded-b-2xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3 className="text-xl font-display font-bold text-background">{selectedImage.title}</h3>
                            </motion.div>
                        </motion.div>

                        {/* Counter */}
                        <motion.div
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-background text-sm font-medium z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="gradient-text font-bold">{currentIndex + 1}</span>
                            <span className="text-background/50"> / {event.images.length}</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EventGalleryPage;
