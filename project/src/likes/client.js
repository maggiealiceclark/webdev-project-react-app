import axios from "axios";

const request = axios.create({
  withCredentials: true,
});


export const BASE_API = "http://localhost:4000/api";

export const findAllLikes = async () => {
  const response = await request.get(`${BASE_API}/likes`);
  return response.data;
};
export const createUserLikesAlbum = async (userId, albumId) => {
  const response = await request.post(
    `${BASE_API}/users/${userId}/likes/${albumId}`);
    return response.data;
};
export const findAlbumsUserLikes = async (userId) => {
  const response = await request.get(`${BASE_API}/users/${userId}/likes`);
  return response.data;
};
export const findUsersWhoLikeAlbum = async (albumId) => {
  const response = await request.get(`${BASE_API}/albums/${albumId}/likes`);
  return response.data;
};