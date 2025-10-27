// frontend/src/api.js
import axios from 'axios'

// Tworzymy jedno globalne API klienta z ciasteczkami i pełnym URL-em backendu
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
})

export default api