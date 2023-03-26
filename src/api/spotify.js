import { axios } from '.'
import config from '../config.json'

export const authSpotify = () => {
const CLIENT_ID = config.spotify_auth_params.CLIENT_ID
const CLIENT_SECRET = config.spotify_auth_params.CLIENT_SECRET
const REDIRECT_URI = config.spotify_auth_params.REDIRECT_URI
const AUTH_ENDPOINT = config.spotify_auth_params.AUTH_ENDPOINT
const RESPONSE_TYPE = config.spotify_auth_params.RESPONSE_TYPE

const data = {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    AUTH_ENDPOINT,
    RESPONSE_TYPE
}

return data
}

export const getNewReleases = async () => {
const {
    data
} = await axios.get('spotify/new')
return data
}

export const getGenres = async () => {
const {
    data
} = await axios.get('spotify/genres')
return data
}

export const getAlbum = async (albumID) => {
    const {
      data
    } = await axios.get(`spotify/album/${albumID}`)
    return data
}

export const getAlbums = async (albumIDs) => {
    const {
      data
    } = await axios.get(`spotify/albums/${albumIDs}`)
    return data
}

export const getSearch = async (query) => {
    const {
      data
    } = await axios.get(`spotify/search/${query}`)
    return data
}