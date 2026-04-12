import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});


let currentAccessToken: any = null;


export const setAccessToken = (token: any) => {
    currentAccessToken = token;
};

export const clearAccessToken = () => {
    currentAccessToken = null;
};

api.interceptors.request.use(
    (config) => {
        if (currentAccessToken) {
            config.headers.Authorization = `Bearer ${currentAccessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = refreshResponse.data.accessToken;

                setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                console.error("Session expired. Logging out...", refreshError);

                clearAccessToken();
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;