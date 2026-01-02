import axios from "axios";

const API_BASE_URL = "/api";
export const IMAGE_BASE_URL = "/media/";

export const getImageUrl = (url: string | null | undefined) => {
    if (!url) return "/placeholder.png";
    if (
        url.startsWith("http") ||
        url.startsWith("/gallery/") ||
        url.startsWith("/logo.png") ||
        url.startsWith("/placeholder") ||
        url.startsWith("/media/") ||
        url.startsWith("data:")
    ) return url;

    // If it's a relative path without a leading slash, prepend IMAGE_BASE_URL
    const cleanUrl = url.startsWith("/") ? url.substring(1) : url;
    return `${IMAGE_BASE_URL}${cleanUrl}`;
};

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
            const { access } = JSON.parse(userData);
            if (access) {
                config.headers.Authorization = `Bearer ${access}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const eventApi = {
    getAll: () => api.get("/events/"),
    getPast: () => api.get("/events/past/"),
    getUpcoming: () => api.get("/events/upcoming/"),
    getCurrent: () => api.get("/events/current/"),
    getById: (id: string) => api.get(`/events/${id}/`),
    create: (data: any) => api.post("/events/", data),
    update: (id: string, data: any) => api.patch(`/events/${id}/`, data),
    delete: (id: string) => api.delete(`/events/${id}/`),
    addImage: (eventId: string, formData: FormData) =>
        api.post(`/events/${eventId}/add_image/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
};

export const registrationApi = {
    getAll: () => api.get("/registrations/"),
    getByUser: (userId: number) => api.get(`/registrations/?user=${userId}`),
    getByEvent: (eventSlug: string) => api.get(`/registrations/?event=${eventSlug}`),
    create: (data: any) => api.post("/registrations/", data),
};

export const paymentApi = {
    getAll: () => api.get("/payments/"),
    create: (data: any) => api.post("/payments/", data, {
        headers: { "Content-Type": "multipart/form-data" },
    }),
    approve: (id: string) => api.post(`/payments/${id}/approve/`),
};

export const userApi = {
    getAll: () => api.get("/users/"),
    update: (id: number, data: any) => api.patch(`/users/${id}/`, data),
    delete: (id: number) => api.delete(`/users/${id}/`),
    create: (data: any) => api.post("/users/", data), // Add create endpoint
    getProfile: () => api.get("/auth/profile/"),
};

export const analyticsApi = {
    getDashboard: () => api.get("/admin/dashboard/"),
};

export default api;
