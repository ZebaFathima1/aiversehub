import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";
export const IMAGE_BASE_URL = "http://localhost:8000";

export const getImageUrl = (url: string | null | undefined) => {
    if (!url) return "/placeholder.png";
    if (url.startsWith("http")) return url;
    return `${IMAGE_BASE_URL}${url}`;
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
    getById: (id: string) => api.get(`/events/${id}/`),
    create: (data: any) => api.post("/events/", data),
    update: (id: string, data: any) => api.patch(`/events/${id}/`, data),
    delete: (id: string) => api.delete(`/events/${id}/`),
    addImage: (eventId: string, formData: FormData) =>
        api.post(`/events/${eventId}/add_image/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
};

export const paymentApi = {
    getAll: () => api.get("/payments/"),
    approve: (id: string) => api.post(`/payments/${id}/approve/`),
};

export const userApi = {
    getAll: () => api.get("/admin-users/"),
    update: (id: number, data: any) => api.patch(`/admin-users/${id}/`, data),
    delete: (id: number) => api.delete(`/admin-users/${id}/`),
    getProfile: () => api.get("/auth/profile/"),
};

export const analyticsApi = {
    getDashboard: () => api.get("/analytics/dashboard/"),
};

export default api;
