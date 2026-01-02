// Gallery data organized by event
export interface GalleryImage {
    id: number;
    src: string;
    title: string;
}

export interface EventGalleryData {
    id: string;
    name: string;
    date: string;
    description: string;
    coverImage: string;
    images: GalleryImage[];
}

export const eventGalleries: EventGalleryData[] = [
    {
        id: "data-stargaze",
        name: "Data Stargaze",
        date: "December 2021",
        description: "A Two Days Workshop on Data Science and Analytics",
        coverImage: "/gallery/datastargaze/cover.jpg",
        images: [
            { id: 1, src: "/gallery/datastargaze/cover.jpg", title: "Event Cover" },
            { id: 2, src: "/gallery/datastargaze/banner.png", title: "Event Banner" },
            { id: 3, src: "/gallery/datastargaze/speaker.png", title: "Expert Session" },
            { id: 4, src: "/gallery/datastargaze/award.png", title: "Memento Presentation" },
            { id: 5, src: "/gallery/datastargaze/session.png", title: "Workshop Session" },
        ],
    },
    {
        id: "ai-verse",
        name: "AI Verse",
        date: "November 2022",
        description: "A Two Day Workshop on AI & Machine Learning",
        coverImage: "/gallery/aiverse1/cover.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse1/cover.jpg", title: "AI Verse The Genesis" },
        ],
    },
    {
        id: "ai-verse-2",
        name: "AI Verse 2.0",
        date: "2023",
        description: "A Three Days National-Level Workshop on Prompt Engineering & NLP",
        coverImage: "/gallery/aiverse2/cover.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse2/cover.jpg", title: "AI Verse 2.0 Cover" },
            { id: 2, src: "/gallery/aiverse2/keynote.png", title: "Keynote Session" },
            { id: 3, src: "/gallery/aiverse2/tech_session.png", title: "Emerging Technology Session" },
        ],
    },
    {
        id: "ai-verse-3",
        name: "AI Verse 3.0",
        date: "2024",
        description: "A Three Days National-Level Workshop on AI & ML",
        coverImage: "/gallery/aiverse3/cover.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse3/cover.jpg", title: "AI Verse 3.0 Cover" },
            { id: 2, src: "/gallery/aiverse3/venue.jpg", title: "Event Venue & Decorations" },
            { id: 3, src: "/gallery/aiverse3/team.jpg", title: "Organizing Team" },
            { id: 4, src: "/gallery/aiverse3/faculty.jpg", title: "Faculty Members" },
            { id: 5, src: "/gallery/aiverse3/keynote.png", title: "Keynote Session" },
            { id: 6, src: "/gallery/aiverse3/inauguration.png", title: "Inauguration Ceremony" },
            { id: 7, src: "/gallery/aiverse3/group_robot.jpg", title: "Group Photo with AI Robot" },
            { id: 8, src: "/gallery/aiverse3/guests.jpg", title: "Chief Guests" },
        ],
    },
    {
        id: "ai-verse-4",
        name: "AI Verse 4.0",
        date: "2026",
        description: "The Next Frontier of Artificial Intelligence",
        coverImage: "/gallery/aiverse4/cover.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse4/cover.jpg", title: "AI Verse 4.0 Preview" },
        ],
    },
];

export const getEventById = (id: string): EventGalleryData | undefined => {
    return eventGalleries.find((event) => event.id === id);
};
