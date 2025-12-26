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
    image: string;
    status: "upcoming" | "ongoing" | "completed";
    featured?: boolean;
}

// Past Events
export const pastEvents: Event[] = [
    {
        id: "stargaze-2021",
        name: "Stargaze",
        title: "Stargaze: Cosmic Tech",
        year: "2021",
        date: "2021-11-10",
        venue: "Open Air Theatre",
        description: "An evening exploring the intersection of Astronomy and AI. Keynote on 'AI in Space Exploration'.",
        highlights: ["Space Tech", "Telescope Session", "AI in Astronomy"],
        participants: "150+",
        capacity: 200,
        registered: 180,
        revenue: 27000,
        price: 150,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
        status: "completed",
    },
    {
        id: "ai-verse-1-2022",
        name: "AI Verse 1.0",
        title: "AI Verse 1.0",
        year: "2022",
        date: "2022-04-10",
        venue: "CSE Seminar Hall",
        description: "The beginning of the AI Verse series. Focused on introduction to Machine Learning and Data Science basics.",
        highlights: ["Intro to ML", "Python for Data Science", "Tech Quiz"],
        participants: "200+",
        capacity: 250,
        registered: 245,
        revenue: 49000,
        price: 200,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
        status: "completed",
    },
    {
        id: "ai-verse-2-2023",
        name: "AI Verse 2.0",
        title: "AI Verse 2.0",
        year: "2023",
        date: "2023-03-20",
        venue: "College Auditorium",
        description: "Focusing on Deep Learning and Computer Vision. Featuring industry experts from top tech companies.",
        highlights: ["Neural Networks", "Image Recognition", "Expert Talks"],
        participants: "350+",
        capacity: 400,
        registered: 380,
        revenue: 114000,
        price: 300,
        image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=600&h=400&fit=crop",
        status: "completed",
    },
    {
        id: "ai-verse-3-2024",
        name: "AI Verse 3.0",
        title: "AI Verse 3.0",
        year: "2024",
        date: "2024-02-15",
        venue: "Main Campus Grounds",
        description: "The biggest tech fest yet. Introduction to Generative AI and Large Language Models.",
        highlights: ["Generative AI", "LLM Workshop", "Hackathon"],
        participants: "450+",
        capacity: 500,
        registered: 485,
        revenue: 242000,
        price: 499,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        status: "completed",
    },
];

// Upcoming/Current Events
export const upcomingEvents: Event[] = [
    {
        id: "ai-verse-4-2025",
        name: "AI Verse 4.0",
        title: "AI Verse 4.0",
        year: "2025",
        date: "2025-03-15",
        endDate: "2025-03-16",
        venue: "CSE Department Auditorium",
        time: "9:00 AM - 6:00 PM",
        description: "The next frontier of Artificial Intelligence! Join us for AI Verse 4.0 featuring cutting-edge workshops on LLMs, Agentic AI, and the latest breakthroughs in machine learning.",
        tagline: "The Next Frontier of Artificial Intelligence",
        highlights: ["LLM Workshop", "Agentic AI Lab", "Industry Experts", "Networking Sessions"],
        participants: "500+",
        capacity: 500,
        registered: 1, // Only Test User
        revenue: 499, // 1 * 499
        price: 1499,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
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
