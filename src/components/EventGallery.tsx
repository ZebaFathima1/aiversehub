import { motion } from "framer-motion";
import { Images, Calendar, ArrowRight, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { eventGalleries } from "@/data/galleryData";

const EventGallery = () => {
  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventGalleries.map((event, index) => (
            <ScrollReveal key={event.id} delay={index * 0.1}>
              <motion.div
                className="group cursor-pointer"
                onClick={() => navigate(`/gallery/${event.id}`)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a3a3a] via-[#1e4040] to-[#1a3535] border border-emerald-900/30 hover:border-emerald-500/50 transition-colors shadow-xl">
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a3a]/95 via-[#1e4040]/60 to-transparent" />

                    {/* Photo Count Badge */}
                    <motion.div
                      className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/20 backdrop-blur-sm text-primary-foreground text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Camera className="w-4 h-4" />
                      {event.images.length} Photos
                    </motion.div>

                    {/* Event Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">
                        {event.name}
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
      </div>
    </section>
  );
};

export default EventGallery;
