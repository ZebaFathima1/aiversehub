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
  "AI Verse 1.0": "The inaugural AI Verse set the foundation for our community. It was a pioneering effort to bridge the gap between academic theory and practical Data Science, sparking a new wave of student-led innovation.",
  "AI Verse: The Genesis": "The inaugural AI Verse set the foundation for our community. It was a pioneering effort to bridge the gap between academic theory and practical Data Science, sparking a new wave of student-led innovation.",
  "AI Verse 1.0: The Genesis": "The inaugural AI Verse set the foundation for our community. It was a pioneering effort to bridge the gap between academic theory and practical Data Science, sparking a new wave of student-led innovation.",
  "AI Verse 2.0": "AI Verse 2.0 scaled our vision with advanced workshops on Neural Networks and Industry 4.0. It marked a significant milestone as we brought in global industry leaders to mentor our students.",
  "AI Verse 2.0: Deep Vision": "AI Verse 2.0 scaled our vision with advanced workshops on Neural Networks and Industry 4.0. It marked a significant milestone as we brought in global industry leaders to mentor our students.",
  "AI Verse 3.0": "3.0 was a spectacle of Generative AI. We hosted one of the region's largest LLM hackathons, where participants built real-world applications using GPT and Diffusion models.",
  "AI Verse 3.0: The GenAI Era": "3.0 was a spectacle of Generative AI. We hosted one of the region's largest LLM hackathons, where participants built real-world applications using GPT and Diffusion models."
};

const EventsTimeline = () => {
  const [events, setEvents] = useState<any[]>(pastEvents);
  const [loading, setLoading] = useState(true);
  const upcomingEvent = getFeaturedEvent();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch from the specific past events endpoint
        const response = await fetch('/api/events/past/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Sort by date ascending (oldest to newest journey)
        const past = data
          .filter((e: any) => e.status === 'completed' || e.status === 'Completed')
          .sort((a: any, b: any) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateA - dateB;
          });

        if (past.length > 0) {
          setEvents(past);
        }
      } catch (error) {
        console.error("Failed to fetch past events dinamically:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getBestImage = (event: any) => {
    // Map slugs to gallery covers for reliability
    const galleryMap: Record<string, string> = {
      "data-stargaze": "/gallery/datastargaze/cover.jpg",
      "data-stargaze-2021": "/gallery/datastargaze/cover.jpg",
      "ai-verse": "/gallery/aiverse1/cover.jpg",
      "ai-verse-1": "/gallery/aiverse1/cover.jpg",
      "ai-verse-2022": "/gallery/aiverse1/cover.jpg",
      "ai-verse-2": "/gallery/aiverse2/cover.jpg",
      "ai-verse-2-2023": "/gallery/aiverse2/cover.jpg",
      "ai-verse-3": "/gallery/aiverse3/cover.jpg",
      "ai-verse-3-2024": "/gallery/aiverse3/cover.jpg",
      "ai-verse-4": "/gallery/aiverse4/cover.jpg",
      "ai-verse-4-2025": "/gallery/aiverse4/cover.jpg"
    };

    const slug = event.slug || event.id;
    if (galleryMap[slug]) return galleryMap[slug];

    // Fallbacks
    if (event.cover_image_url) return event.cover_image_url;
    if (event.image) return getImageUrl(event.image);
    if (event.images && event.images.length > 0) {
      return getImageUrl(event.images[0].image_url);
    }
    return "/gallery/datastargaze/cover.jpg"; // High quality fallback
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
                {/* Timeline Dot with pulse */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-4 h-4">
                  <motion.div
                    className="absolute inset-0 rounded-full gradient-bg shadow-glow"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

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
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/gallery/datastargaze/cover.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <motion.span
                          className="px-3 py-1 rounded-full gradient-bg text-primary-foreground text-sm font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          {event.year || (event.date ? new Date(event.date).getFullYear() : "2024")}
                        </motion.span>
                        <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                          <Users className="w-4 h-4" />
                          {event.participants || event.total_registrations || "0"}
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
                        {(event.highlights ? (typeof event.highlights === 'string' ? JSON.parse(event.highlights) : event.highlights) : []).map((highlight: string, idx: number) => (
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
                {(eventInsights[event.title] || eventInsights[event.name]) && (
                  <div className={cn(
                    "w-full md:w-1/2 self-center",
                    index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                  )}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      whileHover={{ scale: 1.02, translateY: -5 }}
                      className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-blue-100/50 bg-white/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(59,130,246,0.15)] group hover:border-primary/40 transition-all duration-500 relative overflow-hidden ml-12 md:ml-0"
                    >
                      {/* Decorative background glow */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

                      <h4 className="text-2xl font-display font-bold mb-4 text-blue-600 flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
                        Event Insight
                      </h4>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {eventInsights[event.title] || eventInsights[event.name]}
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
