import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  variant?: "slide" | "flip" | "scale" | "rotate" | "bounce" | "blur";
}

const AnimatedCard = ({
  children,
  className = "",
  index = 0,
  variant = "slide",
}: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const variants = {
    slide: {
      hidden: { 
        opacity: 0, 
        x: index % 2 === 0 ? -100 : 100,
        y: 50,
      },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          type: "spring" as const,
          stiffness: 80,
          damping: 15,
          delay: index * 0.15,
        },
      },
    },
    flip: {
      hidden: { 
        opacity: 0, 
        rotateY: 90,
        scale: 0.8,
      },
      visible: { 
        opacity: 1, 
        rotateY: 0,
        scale: 1,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 12,
          delay: index * 0.2,
        },
      },
    },
    scale: {
      hidden: { 
        opacity: 0, 
        scale: 0,
        rotate: -10,
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring" as const,
          stiffness: 150,
          damping: 15,
          delay: index * 0.12,
        },
      },
    },
    rotate: {
      hidden: { 
        opacity: 0, 
        rotate: index % 2 === 0 ? -45 : 45,
        y: 100,
      },
      visible: { 
        opacity: 1, 
        rotate: 0,
        y: 0,
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 12,
          delay: index * 0.18,
        },
      },
    },
    bounce: {
      hidden: { 
        opacity: 0, 
        y: 150,
        scale: 0.5,
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          type: "spring" as const,
          stiffness: 300,
          damping: 20,
          delay: index * 0.1,
        },
      },
    },
    blur: {
      hidden: { 
        opacity: 0, 
        filter: "blur(20px)",
        y: 30,
      },
      visible: { 
        opacity: 1, 
        filter: "blur(0px)",
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
