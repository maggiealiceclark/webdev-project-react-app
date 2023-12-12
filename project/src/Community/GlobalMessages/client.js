import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = "http://localhost:4000/api";
export const MESSAGES_API = `${BASE_API}/messages`;

export const findAllMessages = async () => {
    const response = await request.get(`${MESSAGES_API}`);
    return response.data;
}

export const createMessage = async (message) => { 
    console.log(message);
    const response = await request.post(`${MESSAGES_API}`, message);
    return response.data;
}

export const deleteMessage = async (message) => {
    const response = await request.delete(`${MESSAGES_API}/${message._id}`);
    return response.data;
}

export const updateMessage = async (message) => {
    const response = await request.put(`${MESSAGES_API}/${message._id}`, message);
    return response.data;
}
export const account = async () => {
	const response = await request.post(`${BASE_API}/users/account`);
	return response.data;
};