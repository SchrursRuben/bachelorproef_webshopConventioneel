import { useContext, useMemo, useState, createContext, useCallback, useEffect } from 'react'
import * as spotifyAPI from '../api/spotify'

export const SpotifyContext = createContext()
export const useSpotify = () => useContext(SpotifyContext)

export const SpotifyProvider = ({ children }) => {
  const [authVariables, setAuthVariables] = useState(null)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [newReleases, setNewReleases] = useState({})
  const [genres, setGenres] = useState({})
  const [currentAlbum, setCurrentAlbum] = useState({})

  const refreshSpotify = useCallback(async () => {
    try {
      const data = await spotifyAPI.authSpotify()
      setAuthVariables(data)
      setError('')
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getNewReleases = useCallback(async () => {
    try {
      const data = await spotifyAPI.getNewReleases()
      setNewReleases(data)
      setError('')
    } catch (error) {
      setError(error)
    } finally{
      setLoading(false)
    }
  }, [])

  const getGenres = useCallback(async (link) => {
      try {
        const data = await spotifyAPI.getGenres(link)
        setGenres(data)
        setError('')
      } catch (error) {
        setError(error)
      } finally{
        setLoading(false)
      }
  }, [])

  const getCurrentAlbum = useCallback(async (albumId) => {
    try {
      const data = await spotifyAPI.getAlbum(albumId)
      setCurrentAlbum(data)
      setError('')
    } catch (error) {
      setError(error)
    } finally{
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authVariables?.length === 0) {
      refreshSpotify()
    }
  }, [authVariables, refreshSpotify])

  const value = useMemo(() => ({
    authVariables,
    refreshSpotify,
    newReleases,
    getNewReleases,
    genres,
    getGenres,
    currentAlbum,
    getCurrentAlbum,
    error,
    loading,
  }), [
    authVariables,
    refreshSpotify,
    newReleases,
    getNewReleases,
    genres,
    getGenres,
    currentAlbum,
    getCurrentAlbum,
    error,
    loading,
  ]
  )

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  )
}