import { motion } from "framer-motion";
import { Users, Sparkles, ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCard from "@/components/animations/AnimatedCard";
import TiltCard from "@/components/animations/TiltCard";
import CountdownTimer from "@/components/CountdownTimer";
import { pastEvents, getFeaturedEvent, formatDateRange } from "@/data/events";

const cardVariants = ["flip", "scale", "rotate"] as const;

const EventsTimeline = () => {
  const upcomingEvent = getFeaturedEvent();

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

          {pastEvents.map((event, index) => (
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
                      src={event.image}
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
                      {event.highlights.map((highlight, idx) => (
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
            </div>
          ))}

          {/* AI Verse 4.0 - Upcoming Event (Right Side) */}

        </div>
      </div>
    </section>
  );
};

export default EventsTimeline;
