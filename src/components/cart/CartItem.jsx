import '../../css/cart/CartItem.scss'
import React, { useCallback, useState, useEffect } from 'react'
import { useSpotify } from '../../contexts/SpotifyProvider'

export default function CartItem({ item, onRemove, calculateAmountOfItems }) {
    const [selectedItems, setSelectedItems] = useState([])
    const {albums} = useSpotify()
    const [release, setRelease] = useState({})
    const [quantity, setQuantity] = useState(item.quantity)

    const getRelease = useCallback(() => {
        try {
            // Get release
            const mappedAlbum = albums?.albums?.filter(album => album.id === item.id)
            setRelease(mappedAlbum?.at(0))

        } catch (error) {
            console.error(error)
        }
    }, [setRelease, albums, item.id])

    useEffect(() => {
        try {
            // Get CartItems
            const itemsFromStorage = JSON.parse(localStorage.getItem('selectedItems')) || []
            setSelectedItems(itemsFromStorage)

            // Get release
            getRelease()

        } catch (error) {
            console.error(error)
        }
    }, [setSelectedItems, item.id, setRelease, getRelease])

    const handleRemoveButton = useCallback(() => {
        // Remove item from array
        const updatedItems = selectedItems.filter(selectedItem => selectedItem !== item.id)
        // Store updated items back into local storage
        localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
        // Update state in the Cart component to remove the item from the displayed cart items
        onRemove(item.id)
        // Recalculate the amount of items
        calculateAmountOfItems()
    }, [selectedItems, item, onRemove, calculateAmountOfItems])
    
    const handleQuantityChange = useCallback((event) => {
        const value = event.target.value

        if (value === 'custom') {
          const customQuantity = window.prompt('Enter custom quantity:')
          if (customQuantity) {
            setQuantity(parseInt(customQuantity))
            const updatedItems = JSON.parse(localStorage.getItem('selectedItems')).map((i) => {
              if (i.id === item.id) {
                i.quantity = parseInt(customQuantity)
              }
              return i
            })
            localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
          }
        } else {
          const newQuantity = Number(value)
          setQuantity(newQuantity)
          const updatedItems = JSON.parse(localStorage.getItem('selectedItems')).map((i) => {
            if (i.id === item.id) {
              i.quantity = newQuantity
            }
            return i
          })
          localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
        }
        // Recalculate the amount of items
        calculateAmountOfItems()
    }, [item.id, calculateAmountOfItems])
      
    const handleCustomQuantity = useCallback(() => {
        if (quantity) {
            if (quantity <= 5) {
                return 'Custom'
            } else {
                return quantity.toString()
            }
        }
    }, [quantity])
    
    return (
        <div className='cartItem'>
            <div className='itemDetails'>
                <div className='itemNameAndOther'>
                    <div className='itemNameAndPrice'>
                        <h4>{release?.name}</h4>
                        <h4 className='releasePrice'>€ 15,00</h4>
                    </div>
                    <div className='itemCoverAndOtherDetails'>
                        <div className='releaseCoverArt'>
                            <img src={release?.images?.at(1).url} alt="releaseCoverImage" />
                        </div>
                        <div className='itemOtherDetails'>
                            <select className='quantity' id="quantity" label="Quantity" value={quantity} onChange={handleQuantityChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="custom">{handleCustomQuantity()}</option>
                            </select>
                            <button className='removeButton' onClick={handleRemoveButton}>
                                <p>REMOVE</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}