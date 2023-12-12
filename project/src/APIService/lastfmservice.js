import axios from "axios";


const api_key = "0cc46032fa1821d2f9bc6043564b0917"
const fm_url = 'http://ws.audioscrobbler.com/2.0/'

export const getTopArtists = async () => {
    const response = await axios.get(`${fm_url}?method=chart.gettopartists&api_key=${api_key}&format=json`)
    return response.data
}

export const getTopTracks = async () => {
    const response = await axios.get(`${fm_url}?method=chart.gettoptracks&api_key=${api_key}&format=json`)
    return response.data
}
