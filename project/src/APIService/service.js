import axios from "axios";

// const CLIENT_ID = process.env.CLIENT_ID
// const CLIENT_SECRETE = process.env.CLIENT_SECRETE

const CLIENT_ID = "eab636e800464d89b753ce800c4f7bc3"
const CLIENT_SECRETE = "4ae849ed75f741edb09e2e351cf92455"
const SPOTIFY_URL = 'https://api.spotify.com/v1'

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

export const getSearchResult = async (accessToken, query, types, limit = 4) => {
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

export const getTopTrack = async (accessToken, artist_Id, market = "US") => {
  const response = await axios.get(
    `${SPOTIFY_URL}/artists/${artist_Id}/top-tracks?market=${market}`,
    {
      headers: {'Authorization': `Bearer ${accessToken}`}
    }
  );
  return response.data.tracks;
}

export const getAlbumDetails = async (accessToken, album_Id) => {
  const response = await axios.get(
    `${SPOTIFY_URL}/albums/${album_Id}`,
    {
      headers: {'Authorization': `Bearer ${accessToken}`}
    }
  );
  return response.data
}

export const getArtistDetail = async (accessToken, artist_Id) => {
  const response = await axios.get(
    `${SPOTIFY_URL}/artists/${artist_Id}`,
    {
      headers: {'Authorization': `Bearer ${accessToken}`}
    }
  );
  return response.data
}



export const getArtistImage = async (accessToken, artistName) => {
    const response = await axios.get(
      `${SPOTIFY_URL}/search`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: artistName,
          type: 'artist',
        }
      }
    );
    const artists = response.data.artists.items;
    if (artists.length > 0 && artists[0].images.length > 0) {
      // Use the first image from Spotify
      return artists[0].images[0].url;
    }
    else {
      return 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'
    }
}

export const getTrackImage = async (accessToken, trackName) => {
  const response = await axios.get(
    `${SPOTIFY_URL}/search`, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: trackName,
        type: 'track',
      }
    }
  );
  const tracks = response.data.tracks.items;
    if (tracks.length > 0 && tracks[0].album.images.length > 0) {
      // Use the first image from the track's album
      return tracks[0].album.images[0].url;
    } else {
      return 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
    }
}