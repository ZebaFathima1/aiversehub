import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PosterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PosterModal({ isOpen, onClose }: PosterModalProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const posterRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Track mouse position for tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!posterRef.current || isExpanded) return;

        const rect = posterRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        setMousePosition({ x: x * 15, y: y * -15 });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Particle generation
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
    }));

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/ai-verse-poster.png";
        link.download = "AI-Verse-4.0-Poster.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop with Blur */}
                    <motion.div
                        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                        initial={{ backdropFilter: "blur(0px)" }}
                        animate={{ backdropFilter: "blur(20px)" }}
                        exit={{ backdropFilter: "blur(0px)" }}
                        onClick={onClose}
                    />

                    {/* Circuit Lines Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="circuit-modal" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <motion.path
                                        d="M0 50 L50 50 L50 0"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        fill="none"
                                        className="text-primary"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#circuit-modal)" />
                        </svg>
                    </div>

                    {/* Floating Particles */}
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute bg-primary rounded-full pointer-events-none"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: particle.size,
                                height: particle.size,
                            }}
                            animate={{
                                y: [-20, -80, -20],
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

                    {/* Modal Container */}
                    <motion.div
                        className="relative max-w-4xl w-full"
                        initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        {/* Glassmorphism Container */}
                        <div className="relative rounded-3xl bg-card/10 backdrop-blur-xl border border-primary/20 p-8 shadow-2xl">
                            {/* Close Button */}
                            <motion.button
                                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                                onClick={onClose}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="text-white h-6 w-6" />
                            </motion.button>

                            {/* 3D Floating Poster */}
                            <motion.div
                                ref={posterRef}
                                className="relative cursor-pointer"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setIsExpanded(!isExpanded)}
                                style={{
                                    transformStyle: "preserve-3d",
                                    perspective: "1000px",
                                }}
                            >
                                {/* Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl blur-3xl"
                                    style={{
                                        background: "radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)",
                                    }}
                                    animate={{
                                        scale: isHovered ? 1.15 : 1,
                                        opacity: isHovered ? 0.8 : 0.5,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Poster Card */}
                                <motion.div
                                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                                    animate={{
                                        rotateX: mousePosition.y,
                                        rotateY: mousePosition.x,
                                        scale: isExpanded ? 1.05 : isHovered ? 1.02 : 1,
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        rotateX: { duration: 0.3 },
                                        rotateY: { duration: 0.3 },
                                        scale: { duration: 0.3 },
                                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                >
                                    {/* Neon Border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                                        style={{
                                            boxShadow: isHovered
                                                ? "0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 217, 255, 0.5), inset 0 0 30px rgba(0, 217, 255, 0.3)"
                                                : "0 0 15px rgba(0, 217, 255, 0.4), inset 0 0 15px rgba(0, 217, 255, 0.2)",
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
                                        className="w-full h-auto relative z-10"
                                        style={{ display: "block" }}
                                    />

                                    {/* Glassmorphism Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 backdrop-blur-[1px] z-15 pointer-events-none" />
                                </motion.div>

                                {/* Reflection Shadow */}
                                <div
                                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-primary/30 blur-3xl rounded-full pointer-events-none"
                                    style={{ transform: "translateX(-50%) scaleY(0.3)" }}
                                />
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                className="mt-8 flex flex-wrap gap-4 justify-center"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose();
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload();
                                    }}
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Poster
                                </Button>
                            </motion.div>

                            {/* Hint Text */}
                            <motion.p
                                className="text-center text-sm text-muted-foreground mt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Click poster to focus • Press ESC to close
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
