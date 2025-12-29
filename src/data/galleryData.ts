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
        coverImage: "/gallery/datastargaze/banner.png",
        images: [
            { id: 1, src: "/gallery/datastargaze/banner.png", title: "Event Banner" },
            { id: 2, src: "/gallery/datastargaze/speaker.png", title: "Expert Session" },
            { id: 3, src: "/gallery/datastargaze/award.png", title: "Memento Presentation" },
            { id: 4, src: "/gallery/datastargaze/session.png", title: "Workshop Session" },
        ],
    },
    {
        id: "ai-verse",
        name: "AI Verse",
        date: "November 2022",
        description: "A Two Day Workshop on AI & Machine Learning",
        coverImage: "/gallery/aiverse1/day1.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse1/day1.jpg", title: "Day 1 - Opening & Cultural" },
            { id: 2, src: "/gallery/aiverse1/speakers.png", title: "Guest Speakers & Faculty" },
            { id: 3, src: "/gallery/aiverse1/awards.png", title: "Student Presentations & Awards" },
            { id: 4, src: "/gallery/aiverse1/day2.png", title: "Day 2 - Workshop Sessions" },
        ],
    },
    {
        id: "ai-verse-2",
        name: "AI Verse 2.0",
        date: "2023",
        description: "A Three Days National-Level Workshop on Prompt Engineering & NLP",
        coverImage: "/gallery/aiverse2/flashmob.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse2/flashmob.jpg", title: "Flashmob & Poster Launch" },
            { id: 2, src: "/gallery/aiverse2/group_photo.jpg", title: "Participants Group Photo" },
            { id: 3, src: "/gallery/aiverse2/felicitation.jpg", title: "Guest Felicitation" },
            { id: 4, src: "/gallery/aiverse2/keynote.png", title: "Keynote Session" },
            { id: 5, src: "/gallery/aiverse2/tech_session.png", title: "Emerging Technology Session" },
            { id: 6, src: "/gallery/aiverse2/inauguration.jpg", title: "Inauguration Ceremony" },
            { id: 7, src: "/gallery/aiverse2/day1_audience.jpg", title: "Day 1 - Audience" },
        ],
    },
    {
        id: "ai-verse-3",
        name: "AI Verse 3.0",
        date: "2024",
        description: "A Three Days National-Level Workshop on AI & ML",
        coverImage: "/gallery/aiverse3/venue.jpg",
        images: [
            { id: 1, src: "/gallery/aiverse3/venue.jpg", title: "Event Venue & Decorations" },
            { id: 2, src: "/gallery/aiverse3/team.jpg", title: "Organizing Team" },
            { id: 3, src: "/gallery/aiverse3/faculty.jpg", title: "Faculty Members" },
            { id: 4, src: "/gallery/aiverse3/keynote.png", title: "Keynote Session" },
            { id: 5, src: "/gallery/aiverse3/inauguration.png", title: "Inauguration Ceremony" },
            { id: 6, src: "/gallery/aiverse3/group_robot.jpg", title: "Group Photo with AI Robot" },
            { id: 7, src: "/gallery/aiverse3/guests.jpg", title: "Chief Guests" },
        ],
    },
];

export const getEventById = (id: string): EventGalleryData | undefined => {
    return eventGalleries.find((event) => event.id === id);
};
