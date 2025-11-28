import { apiClient } from '@/api/client.js'

export const apiGet = (path, params) => {
  return apiClient.get(path, params)
}

export const apiPost = (path, request) => {
  return apiClient.post(path, request, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const apiPatch = (path, request) => {
  return apiClient.patch(path, request, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const apiDelete = (path) => {
  return apiClient.delete(path)
}

export const apiFormData = (path, method, request) => {
  const formData = new FormData()

  Object.entries(request).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return apiClient({
    url: path,
    method,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const HTTP_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
})
