import '../../css/cart/CartItem.scss'
import React, { useCallback, useState, useEffect } from 'react'
import { useSpotify } from '../../contexts/SpotifyProvider'

export default function CartItem({ item, onRemove, calculateAmountOfItems }) {
    const [selectedItems, setSelectedItems] = useState([])
    const { albums, setCartItems } = useSpotify()
    const [release, setRelease] = useState({})
    const [quantity, setQuantity] = useState(item.quantity)
    const [price, setPrice] = useState(item.price)
    const [customSelected, setCustomSelected] = useState(false)

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

            // Get Price
            const pricesFromStorage = JSON.parse(localStorage.getItem('albumPrices')) || []
            if (item.id) {
                const priceCurrentAlbum = pricesFromStorage.find(album => album.id === item.id) || {}
                if (priceCurrentAlbum) {
                    setPrice(priceCurrentAlbum.price)
                }
            }

            // Get customSelected
            const customSelectedFromStorage = JSON.parse(localStorage.getItem('customSelected')) || false
            setCustomSelected(customSelectedFromStorage)

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
        let value = event.target.value
        let customQuantity = null
        if (value === 'custom') {
            customQuantity = parseInt(window.prompt('Enter custom quantity:'))
            if (customQuantity) {
                setQuantity(customQuantity)
                const updatedItems = JSON.parse(localStorage.getItem('selectedItems')).map((i) => {
                    if (i.id === item.id) {
                        i.quantity = customQuantity
                    }
                    return i
                })
                localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
                // Set customSelected to true
                localStorage.setItem('customSelected', JSON.stringify(true))
                setCustomSelected(true)
            } else {
                return
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
            // Set customSelected to false
            localStorage.setItem('customSelected', JSON.stringify(false))
            setCustomSelected(false)
        }
        setCartItems((prev) => {
            const updatedPrev = prev.map((i) => {
                if (i.id === item.id) {
                    return {
                        ...i,
                        quantity: customQuantity || Number(value)
                    }
                }
                return i
            })
            return updatedPrev
        })
        // Recalculate the amount of items
        calculateAmountOfItems()
    }, [setCartItems, item, calculateAmountOfItems])

    return (
        <div className='cartItem'>
            <div className='itemDetails'>
                <div className='itemNameAndOther'>
                    <div className='itemNameAndPrice'>
                        <h4>{release?.name}</h4>
                        <h4 className='releasePrice'>€ {price}</h4>
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
                                {
                                    customSelected ? <option value={quantity}>{quantity}</option> : null
                                }
                                <option value="custom">Custom</option>
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