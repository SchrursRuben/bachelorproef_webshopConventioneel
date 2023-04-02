import { useContext, useMemo, useState, createContext, useCallback, useEffect } from 'react'
import * as spotifyAPI from '../api/spotify'

export const SpotifyContext = createContext()
export const useSpotify = () => useContext(SpotifyContext)

const useAlbumPrices = (albumItems) => {
  const [albumPrices, setAlbumPrices] = useState([])

  useEffect(() => {
    // Check if albumItems is empty
    if (albumItems.length === 0) return

    const storedPrices = JSON.parse(localStorage.getItem('albumPrices') || '[]')
    const albumIdsInLocalStorage = new Set(storedPrices.map(p => p.id))

    // Filter out albumItems that already have a price in localStorage
    const albumsToPrice = albumItems.filter(album => !albumIdsInLocalStorage.has(album.id))
    // Generate random prices for albums that don't have a price in localStorage
    const albumItemsWithPrice = albumsToPrice.map((album) => {
      const basePrice = 15
      const rarityMultiplier = Math.random() * (3 - 1) + 1
      const conditionMultiplier = Math.random() * (2 - 0.5) + 0.5
      const price = Math.floor(basePrice * rarityMultiplier * conditionMultiplier)
      return { id: album.id, price: `${price},95` }
    })

    localStorage.setItem('albumPrices', JSON.stringify([...storedPrices, ...albumItemsWithPrice]))
    setAlbumPrices([...storedPrices, ...albumItemsWithPrice])
  }, [albumItems])

  return albumPrices
}


export const SpotifyProvider = ({ children }) => {
  const [authVariables, setAuthVariables] = useState(null)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [newReleases, setNewReleases] = useState({})
  const [genres, setGenres] = useState({})
  const [currentAlbum, setCurrentAlbum] = useState({})
  const [albums, setAlbums] = useState({})
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('selectedItems')) || [])
  const [search, setSearch] = useState({})
  const [totalAmountOfItemsInCart, setTotalAmountOfItemsInCart] = useState(0)

  // Generate random prices
  const albumItems = useMemo(() => search.albums?.items || newReleases.albums?.items || [], [search, newReleases])
  const generatedAlbumPrices = useAlbumPrices(albumItems)

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
    } finally {
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
    } finally {
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
    } finally {
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
    } finally {
      setLoading(false)
    }
  }, [])

  const getSearch = useCallback(async (query) => {
    try {
      const data = await spotifyAPI.getSearch(encodeURIComponent(query))
      setSearch(data)
      setError('')
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh Spotify auth variables if they are empty
  useEffect(() => {
    if (authVariables?.length === 0) {
      refreshSpotify()
    }
  }, [authVariables, refreshSpotify])

  useEffect(() => {
    // Get cartItems from localStorage
    const itemsFromStorage = JSON.parse(localStorage.getItem('selectedItems'))

    // Check if itemsFromStorage is not empty
    if (itemsFromStorage && itemsFromStorage.length > 0) {
      setCartItems(itemsFromStorage)
      getAlbums(itemsFromStorage.map(item => item.id))
    }
  }, [newReleases])

  // Calculate the total number of items in the cart
  const calculateAmountOfItems = useCallback(() => {
    if (!cartItems) {
      return
    }
    let totalAmount = 0
    cartItems.forEach(cartItem => {
      totalAmount += cartItem.quantity
    })
    setTotalAmountOfItemsInCart(totalAmount)
  }, [cartItems, setTotalAmountOfItemsInCart])

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
    generatedAlbumPrices,
    calculateAmountOfItems,
    totalAmountOfItemsInCart,
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
    generatedAlbumPrices,
    calculateAmountOfItems,
    totalAmountOfItemsInCart,
    error,
    loading,
  ]
  )

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  )
}