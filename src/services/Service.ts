import axio from 'axios'; 

export const api = axio.create({
    baseURL: import.meta.env.VITE_API_URL
})