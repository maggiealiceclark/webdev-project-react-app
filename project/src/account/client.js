import axios from "axios";

const request = axios.create({
	withCredentials: true,
});

export const BASE_API = "http://localhost:4000/api";
export const USERS_API = `${BASE_API}/users`;

export const signup = async (credentials) => {
	const response = await request.post(`${USERS_API}/signup`, credentials);
	return response.data;
};
export const signin = async (credentials) => {
	const response = await request.post(`${USERS_API}/signin`, credentials);
	return response.data;
};
export const signout = async () => {
	const response = await request.post(`${USERS_API}/signout`);
	return response.data;
};
export const account = async () => {
	const response = await request.post(`${USERS_API}/account`);
	return response.data;
};
export const createUser = async (user) => {
	const response = await request.post(`${USERS_API}`, user);
	return response.data;
};
export const deleteUser = async (user) => {
	const response = await request.delete(`${USERS_API}/${user._id}`);
	return response.data;
};
export const updateUser = async (user) => {
	const response = await request.put(`${USERS_API}/${user._id}`, user);
	return response.data;
};
export const findAllUsers = async () => {
	const response = await request.get(`${USERS_API}`);
	return response.data;
};
export const findUserById = async (id) => {
	const response = await request.get(`${USERS_API}/${id}`);
	return response.data;
};

export const changeEmail = async (email, id) => {
	try {
	  const response = await request.post(`${USERS_API}/changeEmail/${id}`, { email });
	  return response.data; 
	} catch (error) {
	  console.error("Error changing email:", error);
	  throw error; 
	}
  };
export const findUserByUsername = async (username) => {
	const response = await request.get(`${USERS_API}/username/${username}`);
	return response.data;
};

export const findUserByFavoriteArtist = async (favoriteArtist) => {
	const response = await request.get('${USERS_API}/favoriteArtist/${favoriteArtist}');
	return response.data;
};
// client.js

// Import any necessary libraries or configurations for making API calls

// Function to save the favorite artist for a user
export const saveFavoriteArtist = async (user, favoriteArtist) => {
	try {
	  // Make an API call to update the user's favorite artist
	  const response = await fetch(`/api/users/${user}/favorite-artist`, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ favoriteArtist }),
	  });
  
	  // Check if the API call was successful
	  if (!response.ok) {
		throw new Error('Failed to update favorite artist');
	  }
  
	  // Return any relevant data from the response
	  const data = await response.json();
	  return data;
	} catch (error) {
	  // Handle errors
	  console.error('Error saving favorite artist:', error);
	  throw error; // Optionally, rethrow the error to allow the calling code to handle it
	}
  };
  
