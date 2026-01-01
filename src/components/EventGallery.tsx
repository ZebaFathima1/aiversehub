import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Images, Calendar, ArrowRight, Camera, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { eventApi, getImageUrl } from "@/lib/api";
import { eventGalleries } from "@/data/galleryData";
import { formatDateRange } from "@/data/events";

const EventGallery = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>(eventGalleries.map(g => ({
    id: g.id,
    title: g.name,
    name: g.name,
    date: g.date,
    description: g.description,
    image: g.coverImage,
    gallery_images: g.images.map(img => ({ id: img.id, image: img.src, title: img.title }))
  })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        if (response.data && response.data.results) {
          const data = response.data.results;
          const targetSlugs = ['data-stargaze', 'ai-verse-1', 'ai-verse-2', 'ai-verse-3'];

          const galleryEvents = data
            .filter((e: any) => targetSlugs.includes(e.slug))
            .sort((a: any, b: any) => targetSlugs.indexOf(a.slug) - targetSlugs.indexOf(b.slug));

          if (galleryEvents.length > 0) {
            setEvents(galleryEvents);
          }
        }
      } catch (error) {
        console.error("Failed to fetch gallery events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getCoverImage = (event: any) => {
    // Priority: Computed cover image URL from backend -> original image field -> first gallery image
    if (event.cover_image_url) return event.cover_image_url;
    if (event.featured_image_url) return event.featured_image_url;
    if (event.image) return getImageUrl(event.image);
    if (event.images && event.images.length > 0) {
      return event.images[0].image_url;
    }
    return "/placeholder.png";
  };

  return (
    <section id="gallery" className="py-24 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Images className="w-4 h-4" />
              </motion.div>
              Memories
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Event Gallery</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the memorable moments from our past events. Click on any event to view the complete photo gallery.
            </p>
          </div>
        </ScrollReveal>

        {/* Event Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground italic">Loading galleries...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border-2 border-dashed border-muted">
            <Images className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground italic">No memories found yet. Add images to past events in the admin panel!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <ScrollReveal key={event.id} delay={index * 0.1}>
                <motion.div
                  className="group cursor-pointer perspective-1000"
                  onClick={() => navigate(`/gallery/${event.slug || event.id}`)}
                  whileHover={{
                    y: -10,
                    rotateX: 5,
                    rotateY: -5,
                    z: 20
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a3a3a] via-[#1e4040] to-[#1a3535] border border-emerald-900/30 group-hover:border-primary/50 transition-all duration-500 shadow-2xl group-hover:shadow-primary/20">
                    {/* Glowing highlight */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur opacity-0 group-hover:opacity-100 transition duration-500"
                    />

                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={getCoverImage(event)}
                        alt={event.name || event.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a]/95 via-[#1e4040]/60 to-transparent" />

                      {/* Photo Count Badge */}
                      <motion.div
                        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Camera className="w-4 h-4" />
                        {event.images?.length || 0} Photos
                      </motion.div>

                      {/* Event Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-primary-foreground/80 text-sm line-clamp-2 mb-4">
                          {event.description}
                        </p>

                        {/* View Gallery Button */}
                        <motion.div
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground text-foreground text-sm font-semibold group-hover:shadow-lg transition-shadow"
                          whileHover={{ scale: 1.05 }}
                        >
                          View Gallery
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventGallery;
