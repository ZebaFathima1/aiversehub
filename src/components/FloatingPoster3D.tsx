import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FloatingPoster3D() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const posterRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Track mouse position for tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!posterRef.current || isExpanded) return;

        const rect = posterRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        setMousePosition({ x: x * 20, y: y * -20 });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    // Particle generation
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
    }));

    return (
        <>
            {/* Main Floating Poster */}
            <section className="relative py-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />

                {/* Circuit Lines Background */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M0 50 L50 50 L50 0" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary" />
                                <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#circuit)" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        ref={posterRef}
                        className="relative max-w-2xl mx-auto cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setIsExpanded(true)}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* Floating Particles */}
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute w-1 h-1 bg-primary rounded-full pointer-events-none"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                }}
                                animate={{
                                    y: [-20, -60],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* Glow Effect */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl blur-3xl opacity-50"
                            style={{
                                background: "radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)",
                            }}
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                                opacity: isHovered ? 0.7 : 0.5,
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Poster Card */}
                        <motion.div
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                            }}
                            animate={{
                                rotateX: mousePosition.y,
                                rotateY: mousePosition.x,
                                scale: isHovered ? 1.05 : 1,
                                y: [0, -10, 0],
                            }}
                            transition={{
                                rotateX: { duration: 0.3 },
                                rotateY: { duration: 0.3 },
                                scale: { duration: 0.3 },
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            }}
                        >
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 backdrop-blur-sm z-10 pointer-events-none" />

                            {/* Neon Border */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                                style={{
                                    boxShadow: isHovered
                                        ? "0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(0, 217, 255, 0.4), inset 0 0 20px rgba(0, 217, 255, 0.2)"
                                        : "0 0 10px rgba(0, 217, 255, 0.3), inset 0 0 10px rgba(0, 217, 255, 0.1)",
                                }}
                                animate={{
                                    opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Poster Image */}
                            <img
                                src="/ai-verse-poster.png"
                                alt="AI Verse 4.0 Event Poster"
                                className="w-full h-auto relative z-0"
                                style={{ display: "block" }}
                            />

                            {/* Hover Overlay with CTA */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.div
                                            className="text-center"
                                            initial={{ scale: 0.8, y: 20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            exit={{ scale: 0.8, y: 20 }}
                                        >
                                            <p className="text-white text-xl font-bold mb-4">Click to Explore</p>
                                            <div className="w-12 h-12 mx-auto border-2 border-primary rounded-full flex items-center justify-center">
                                                <ArrowRight className="text-primary" />
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Reflection Shadow */}
                            <div
                                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl rounded-full pointer-events-none"
                                style={{ transform: "translateX(-50%) scaleY(0.3)" }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Expanded Modal View */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop with Blur */}
                        <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            initial={{ backdropFilter: "blur(0px)" }}
                            animate={{ backdropFilter: "blur(20px)" }}
                            exit={{ backdropFilter: "blur(0px)" }}
                            onClick={() => setIsExpanded(false)}
                        />

                        {/* Light Streaks */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 bg-gradient-to-b from-transparent via-primary to-transparent"
                                style={{
                                    left: `${20 + i * 20}%`,
                                    height: "100%",
                                }}
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: [0, 0.5, 0], scaleY: [0, 1, 0] }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.1,
                                    ease: "easeOut",
                                }}
                            />
                        ))}

                        {/* Expanded Poster */}
                        <motion.div
                            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-3xl"
                            initial={{ scale: 0.5, rotateY: -90 }}
                            animate={{ scale: 1, rotateY: 0 }}
                            exit={{ scale: 0.5, rotateY: 90 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {/* Particle Burst */}
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-primary rounded-full"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                    }}
                                    initial={{ opacity: 1, scale: 0 }}
                                    animate={{
                                        opacity: 0,
                                        scale: 1,
                                        x: Math.cos((i / 30) * Math.PI * 2) * 300,
                                        y: Math.sin((i / 30) * Math.PI * 2) * 300,
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            ))}

                            {/* Poster with Glow */}
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 rounded-3xl"
                                    animate={{
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />


                                <img
                                    src="/ai-verse-poster.png"
                                    alt="AI Verse 4.0 Event Poster"
                                    className="w-full h-auto rounded-3xl relative z-10"
                                    style={{
                                        boxShadow: "0 0 60px rgba(0, 217, 255, 0.5), 0 0 120px rgba(0, 217, 255, 0.3)",
                                    }}
                                />
                                {/* Floating CTA Buttons */}
                                <motion.div
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/50"
                                        onClick={() => {
                                            setIsExpanded(false);
                                            navigate("/register");
                                        }}
                                    >
                                        Register Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary/10"
                                        onClick={() => {
                                            setIsExpanded(false);
                                            navigate("/ai-verse-4");
                                        }}
                                    >
                                        View Event Details
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Close Button */}
                            <motion.button
                                className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                                onClick={() => setIsExpanded(false)}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="text-white h-6 w-6" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
