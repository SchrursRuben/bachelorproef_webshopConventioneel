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
  const [albums, setAlbums] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [search, setSearch] = useState({})

  // Generate random prices, adding albumItems to dependency array will cause infinite loop warning
  const albumItems = newReleases.albums?.items || search.albums?.items || []
  const useAlbumPrices = (albumItems) => {
    const [albumPrices, setAlbumPrices] = useState([])
  
    useEffect(() => {
      const storedPrices = JSON.parse(localStorage.getItem('albumPrices') || '[]')
  
      if (storedPrices.length > 0) {
        setAlbumPrices(storedPrices)
      } else {
        const prices = []
  
        albumItems.forEach((album) => {
          const basePrice = 10
          const rarityMultiplier = Math.random() * (5 - 1) + 1
          const conditionMultiplier = Math.random() * (2 - 0.5) + 0.5
          const price = Math.floor(basePrice * rarityMultiplier * conditionMultiplier)
          prices.push({ id: album.id, price: `${price},95` })
        })
  
        setAlbumPrices(prices)
        localStorage.setItem('albumPrices', JSON.stringify(prices))
      }
    }, [])
  
    return albumPrices
  }
  const albumPrices = useAlbumPrices(albumItems)


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

  const getAlbums = useCallback(async (albumIDs) => {
    try {
      const data = await spotifyAPI.getAlbums(albumIDs.map(String).join('%2C'))
      setAlbums(data)
      setError('')
    } catch (error) {
      setError(error)
    } finally{
      setLoading(false)
    }
  }, [])

  const getSearch = useCallback(async (query, genre) => {
    try {
      const data = await spotifyAPI.getSearch(encodeURIComponent(query), encodeURIComponent(genre))
      setSearch(data)
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
    albums,
    getAlbums,
    cartItems,
    setCartItems,
    getSearch,
    search,
    albumPrices,
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
    albums,
    getAlbums,
    cartItems,
    setCartItems,
    getSearch,
    search,
    albumPrices,
    error,
    loading,
  ]
  )

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  )
}