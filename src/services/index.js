import axios from 'axios'

const API_BASE_URL = '/api' // Replace with your actual API base URL

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
