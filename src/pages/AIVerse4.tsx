import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingPoster3D from "@/components/FloatingPoster3D";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AIVerse4() {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>AI Verse 4.0 - Where AI Meets Power of Quantum Reality</title>
                <meta
                    name="description"
                    content="Join us for AI Verse 4.0, a three-day workshop exploring the frontiers of Artificial Intelligence and Machine Learning. January 21-23, 2026."
                />
            </Helmet>

            <div className="min-h-screen">
                <Navbar />

                <main>
                    {/* Hero Section with Floating Poster */}
                    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background pt-32">
                        {/* Animated Background Grid */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 217, 255, 0.1) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(0, 217, 255, 0.1) 1px, transparent 1px)`,
                                backgroundSize: '50px 50px'
                            }} />
                        </div>

                        {/* Glowing Orbs */}
                        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                        <div className="container mx-auto px-4 relative z-10">
                            <motion.div
                                className="text-center mb-12"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
                                    AI Verse 4.0
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                                    Where AI Meets Power of Quantum Reality
                                </p>
                            </motion.div>

                            {/* 3D Floating Poster */}
                            <FloatingPoster3D />

                            {/* Event Details */}
                            <motion.div
                                className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
                                    <Calendar className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Date</p>
                                        <p className="font-semibold">Jan 21-23, 2026</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
                                    <Clock className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Duration</p>
                                        <p className="font-semibold">3 Days Workshop</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Venue</p>
                                        <p className="font-semibold">CSE Auditorium</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
                                    <Users className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Participants</p>
                                        <p className="font-semibold">500+ Expected</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="py-20 bg-muted/30">
                        <div className="container mx-auto px-4">
                            <motion.div
                                className="max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-4xl font-bold gradient-text mb-8 text-center">
                                    About the Event
                                </h2>
                                <div className="prose prose-lg dark:prose-invert mx-auto">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        AI Verse 4.0 is a groundbreaking three-day workshop that brings together students,
                                        researchers, and industry experts to explore the cutting-edge developments in
                                        Artificial Intelligence and Machine Learning. This year's theme, "Where AI Meets
                                        Power of Quantum Reality," delves into the intersection of quantum computing and AI.
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                                        Organized by the Department of CSE (Artificial Intelligence and Machine Learning)
                                        at Vaagdevi College of Engineering, this event features hands-on workshops,
                                        expert talks, and networking opportunities with leading professionals in the field.
                                    </p>
                                </div>

                                <div className="mt-12 text-center">
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/50"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register for AI Verse 4.0
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Coordinators Section */}
                    <section className="py-20">
                        <div className="container mx-auto px-4">
                            <motion.div
                                className="max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-4xl font-bold gradient-text mb-12 text-center">
                                    Event Coordinators
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Principal */}
                                    <div className="text-center p-6 rounded-lg bg-card border border-primary/20">
                                        <h3 className="text-sm font-semibold text-primary mb-2">PRINCIPAL</h3>
                                        <p className="text-xl font-bold">Dr. K. Prakash</p>
                                    </div>

                                    {/* Convenor */}
                                    <div className="text-center p-6 rounded-lg bg-card border border-primary/20">
                                        <h3 className="text-sm font-semibold text-primary mb-2">CONVENOR</h3>
                                        <p className="text-xl font-bold">Dr. Thanveer Jahan</p>
                                        <p className="text-sm text-muted-foreground">HOD CSE(AI&ML)</p>
                                    </div>

                                    {/* Coordinators */}
                                    <div className="text-center p-6 rounded-lg bg-card border border-primary/20">
                                        <h3 className="text-sm font-semibold text-primary mb-2">CO-ORDINATOR</h3>
                                        <p className="text-xl font-bold">Dr. A. Swetha</p>
                                        <p className="text-sm text-muted-foreground">Assistant Professor CSE(AI&ML)</p>
                                    </div>

                                    <div className="text-center p-6 rounded-lg bg-card border border-primary/20">
                                        <h3 className="text-sm font-semibold text-primary mb-2">CO-ORDINATOR</h3>
                                        <p className="text-xl font-bold">Mr. Salim Jiwani</p>
                                        <p className="text-sm text-muted-foreground">Assistant Professor CSE(AI&ML)</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
