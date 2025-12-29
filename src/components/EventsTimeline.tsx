import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, ArrowRight, Rocket, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCard from "@/components/animations/AnimatedCard";
import TiltCard from "@/components/animations/TiltCard";
import CountdownTimer from "@/components/CountdownTimer";
import { getFeaturedEvent, formatDateRange, Event, pastEvents } from "@/data/events";
import { eventApi, getImageUrl } from "@/lib/api";

const cardVariants = ["flip", "scale", "rotate"] as const;

const eventInsights: Record<string, string> = {
  "Data Stargaze": "Data Stargaze was a breakthrough event that merged Astronomy with modern AI. Students explored real-time celestial tracking and learned how machine learning is revolutionizing our understanding of the universe.",
  "AI Verse": "The inaugural AI Verse set the foundation for our community. It was a pioneering effort to bridge the gap between academic theory and practical Data Science, sparking a new wave of student-led innovation.",
  "AI Verse 2.0": "AI Verse 2.0 scaled our vision with advanced workshops on Neural Networks and Industry 4.0. It marked a significant milestone as we brought in global industry leaders to mentor our students.",
  "AI Verse 3.0": "3.0 was a spectacle of Generative AI. We hosted one of the region's largest LLM hackathons, where participants built real-world applications using GPT and Diffusion models."
};

const EventsTimeline = () => {
  const [events, setEvents] = useState<any[]>(pastEvents);
  const [loading, setLoading] = useState(true);
  const upcomingEvent = getFeaturedEvent();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventApi.getAll();
        // Filter for completed events and sort by date ascending (oldest to newest journey)
        const past = response.data
          .filter((e: any) => e.status === 'completed')
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (past.length > 0) {
          setEvents(past);
        }
      } catch (error) {
        console.error("Failed to fetch past events dynamicly:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getBestImage = (event: any) => {
    if (event.image) return getImageUrl(event.image);
    if (event.gallery_images && event.gallery_images.length > 0) {
      return getImageUrl(event.gallery_images[0].image);
    }
    return "/placeholder.png";
  };

  return (
    <section id="events" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Our Journey
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Past Events</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of innovation, learning, and community building through our flagship events.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {loading && events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground italic">Reliving our memories...</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={event.id}
                className={cn(
                  "relative flex items-start gap-4 md:gap-8 mb-16 last:mb-0 flex-col md:flex-row",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-bg shadow-glow z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                />

                {/* Content Card */}
                <AnimatedCard
                  variant={cardVariants[index % cardVariants.length]}
                  index={index}
                  className={cn(
                    "ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-1/2",
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  )}
                >
                  <div className="bg-card rounded-2xl shadow-elevated overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={getBestImage(event)}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <motion.span
                          className="px-3 py-1 rounded-full gradient-bg text-primary-foreground text-sm font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          {event.year}
                        </motion.span>
                        <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                          <Users className="w-4 h-4" />
                          {event.participants}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-display font-bold mb-3 gradient-text">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Highlights with staggered animation */}
                      <div className="flex flex-wrap gap-2">
                        {(typeof event.highlights === 'string' ? JSON.parse(event.highlights) : event.highlights).map((highlight: string, idx: number) => (
                          <motion.span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "hsl(var(--primary) / 0.1)",
                              color: "hsl(var(--primary))",
                            }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Description Panel for Event Insights */}
                {eventInsights[event.name] && (
                  <div className={cn(
                    "hidden md:block w-1/2 self-center",
                    index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  )}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="p-6 rounded-2xl border bg-primary/5 border-primary/20 backdrop-blur-sm shadow-glow group hover:bg-primary/10 transition-colors duration-300"
                    >
                      <h4 className="text-xl font-bold mb-2 text-primary flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        Event Insight
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {eventInsights[event.name]}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* AI Verse 4.0 - Upcoming Event (Right Side) */}

        </div>
      </div>
    </section>
  );
};

export default EventsTimeline;
