import { motion, animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
    from: number;
    to: number;
    duration?: number;
    className?: string;
}

const Counter = ({ from, to, duration = 2, className = "" }: CounterProps) => {
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true });
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, { duration });
            return controls.stop;
        }
    }, [count, isInView, to, duration]);

    return <motion.span ref={nodeRef} className={className}>{rounded}</motion.span>;
}

export default Counter;
