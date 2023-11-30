import axios from "axios";

// const CLIENT_ID = process.env.CLIENT_ID
// const CLIENT_SECRETE = process.env.CLIENT_SECRETE

const CLIENT_ID = "eab636e800464d89b753ce800c4f7bc3"
const CLIENT_SECRETE = "4ae849ed75f741edb09e2e351cf92455"

export const getToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRETE,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data.access_token;
}

export const getArtists = async (accessToken, query, types, limit = 4) => {
  const response = await axios.get(
    "https://api.spotify.com/v1/search",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: types.join(","),
        limit: limit,
      },
    })
  return response.data
}