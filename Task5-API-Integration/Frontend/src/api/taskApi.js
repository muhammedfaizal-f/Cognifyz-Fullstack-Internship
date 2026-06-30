import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 8000,
})

// Response interceptor — unwrap data
api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err.response?.data || { message: 'Network error' })
)

export const taskApi = {
  getAll: (params) => api.get('/tasks', { params }),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  remove: (id) => api.delete(`/tasks/${id}`),
  health: () => api.get('/health'),
}