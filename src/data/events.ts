// Centralized event data for the AI-Verse Hub platform
// This data is shared between the frontend and admin dashboard

export interface Event {
    id: string;
    name: string;
    title: string;
    year: string;
    date: string;
    endDate?: string;
    venue: string;
    time?: string;
    description: string;
    tagline?: string;
    highlights: string[];
    participants: string;
    capacity: number;
    registered: number;
    revenue: number;
    price: number;
    image?: string;
    status: "upcoming" | "ongoing" | "completed";
    featured?: boolean;
}

// Past Events
export const pastEvents: Event[] = [
    {
        id: "data-stargaze-2021",
        name: "Data Stargaze",
        title: "Data Stargaze",
        year: "2021",
        date: "2021-12-21",
        venue: "Open Air Theatre",
        description: "A spectacular nocturnal workshop merging Astronomy with AI. Students practiced real-time celestial tracking and learned how neural networks are decoding the secrets of deep space.",
        highlights: ["Space Data Mining", "Live Star Tracking", "Cosmology Keynote"],
        participants: "150+",
        capacity: 200,
        registered: 180,
        revenue: 27000,
        price: 150,
        image: "/gallery/datastargaze/cover.jpg",
        status: "completed",
    },
    {
        id: "ai-verse-1",
        name: "AI Verse 1.0",
        title: "AI Verse 1.0: The Genesis",
        year: "2022",
        date: "2022-04-10",
        venue: "CSE Seminar Hall",
        description: "The pioneering event that launched the AI-Verse series. We focused on bridging academic theory with practical Data Science, featuring our first 24-hour Python coding marathon.",
        highlights: ["ML Fundamentals", "Python Workshops", "Tech Quiz Bowl"],
        participants: "200+",
        capacity: 250,
        registered: 245,
        revenue: 49000,
        price: 200,
        image: "/gallery/aiverse1/cover.jpg",
        status: "completed",
    },
    {
        id: "ai-verse-2-2023",
        name: "AI Verse 2.0",
        title: "AI Verse 2.0: Deep Vision",
        year: "2023",
        date: "2023-03-20",
        venue: "College Auditorium",
        description: "Expanding horizons with a deep focus on Computer Vision. Industry experts demonstrated real-time object detection and mentored students on building autonomous robotic systems.",
        highlights: ["Computer Vision Lab", "Neural Net Workshop", "Expert Panel"],
        participants: "350+",
        capacity: 400,
        registered: 380,
        revenue: 114000,
        price: 300,
        image: "/gallery/aiverse2/cover.jpg",
        status: "completed",
    },
    {
        id: "ai-verse-3-2024",
        name: "AI Verse 3.0",
        title: "AI Verse 3.0: The GenAI Era",
        year: "2024",
        date: "2024-02-15",
        venue: "Main Campus Grounds",
        description: "A massive celebration of the Generative AI revolution. We hosted one of the region's largest LLM hackathons, exploring the intersection of creative arts and AI technology.",
        highlights: ["LLM Hackathon", "Stable Diffusion Demo", "Future of Work Talk"],
        participants: "450+",
        capacity: 500,
        registered: 485,
        revenue: 242000,
        price: 499,
        image: "/gallery/aiverse3/cover.jpg",
        status: "completed",
    },
];

// Upcoming/Current Events
export const upcomingEvents: Event[] = [
    {
        id: "ai-verse-4-2025",
        name: "AI Verse 4.0",
        title: "AI Verse 4.0",
        year: "2026",
        date: "2026-01-21",
        endDate: "2026-01-23",
        venue: "CSE Department Auditorium",
        time: "3:00 PM - 6:00 PM",
        description: "The next frontier of Artificial Intelligence! Join us for AI Verse 4.0 featuring cutting-edge workshops on LLMs, Agentic AI, and the latest breakthroughs in machine learning.",
        tagline: "The Next Frontier of Artificial Intelligence",
        highlights: ["LLM Workshop", "Agentic AI Lab", "Industry Experts", "Networking Sessions"],
        participants: "500+",
        capacity: 500,
        registered: 1, // Only Test User
        revenue: 499, // 1 * 499
        price: 1499,
        image: "/gallery/aiverse4/cover.jpg",
        status: "upcoming",
        featured: true,
    },
];

// All events combined
export const allEvents: Event[] = [...upcomingEvents, ...pastEvents];

// Get event by ID
export const getEventById = (id: string): Event | undefined => {
    return allEvents.find(event => event.id === id);
};

// Get featured event (AI Verse 4.0)
export const getFeaturedEvent = (): Event | undefined => {
    return allEvents.find(event => event.featured);
};

// Get events by status
export const getEventsByStatus = (status: Event["status"]): Event[] => {
    return allEvents.filter(event => event.status === status);
};

// Calculate total statistics
export const getEventStatistics = () => {
    const totalEvents = allEvents.length;
    const totalRegistrations = allEvents.reduce((sum, event) => sum + event.registered, 0);
    const totalRevenue = allEvents.reduce((sum, event) => sum + event.revenue, 0);
    const activeEvents = allEvents.filter(e => e.status === "upcoming" || e.status === "ongoing").length;

    return {
        totalEvents,
        totalRegistrations,
        totalRevenue,
        activeEvents,
    };
};

// Format currency
export const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
};

// Format date
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Format date range
export const formatDateRange = (startDate: string, endDate?: string): string => {
    if (!endDate) return formatDate(startDate);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const startMonth = start.toLocaleDateString('en-IN', { month: 'long' });
    const endMonth = end.toLocaleDateString('en-IN', { month: 'long' });
    const year = start.getFullYear();

    if (startMonth === endMonth) {
        return `${startMonth} ${start.getDate()}-${end.getDate()}, ${year}`;
    }

    return `${start.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}, ${year}`;
};
