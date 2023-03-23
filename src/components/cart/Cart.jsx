import React, { useEffect, useCallback, useState } from 'react'
import CartItem from './CartItem'
import '../../css/cart/Cart.scss'
import { useSpotify } from '../../contexts/SpotifyProvider'

export default function Cart() {
  const { cartItems, setCartItems, getAlbums } = useSpotify()

  // Load cartItems
  useEffect(() => {
    try {
      // Get cartItems
      const itemsFromStorage = JSON.parse(localStorage.getItem('selectedItems'))
  
      if (itemsFromStorage.length !== 0) {
        setCartItems(itemsFromStorage)
  
        getAlbums((itemsFromStorage.map(item => {
          return item.id
        })))
      }  
    } catch (error) {
        console.error(error)
    }
  }, [setCartItems, getAlbums])

  // Calculate the total number of items in the cart
  const calculateAmountOfItems = useCallback(() => {
    let totalAmount = 0
    cartItems.forEach(cartItem => {
      totalAmount += cartItem.quantity
    })
    return totalAmount
  },[cartItems])

  const [amountOfItems, setAmountOfItems] = useState(calculateAmountOfItems())

  useEffect(() => {
    setAmountOfItems(calculateAmountOfItems())
  }, [calculateAmountOfItems, setAmountOfItems])

  const handleRemoveItem = useCallback((itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId)

    // Store updated items back into local storage
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems))

    // Update cartItems state
    setCartItems(updatedItems)
  }, [cartItems, setCartItems])

  return (
    <>
      <div className='cartPageWrapper'>
        <div className='cart'>
          <h2>Cart</h2>
          <div className='cartDetails'>
            <div className='cartItems'>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} calculateAmountOfItems={calculateAmountOfItems()}/>
              ))}
            </div>
            <div className='cartOverview'>
              <h3>Overview</h3>
              <p>Number of items : {amountOfItems}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}