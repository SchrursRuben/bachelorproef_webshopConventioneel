import React, { useEffect, useCallback, useState } from 'react'
import CartItem from './CartItem'
import '../../css/cart/Cart.scss'
import { useSpotify } from '../../contexts/SpotifyProvider'

export default function Cart() {
  const { cartItems, setCartItems, getAlbums, totalAmountOfItemsInCart, calculateAmountOfItems } = useSpotify()
  // const [amountOfItems, setAmountOfItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartItemsCount, setCartItemsCount] = useState(0)

  // Load cartItems
  useEffect(() => {
    try {
      // Calculate the total number of items in the cart
      calculateAmountOfItems()
      // Calculate the total price of the cart
      calculateTotalPrice()
      // Reload cartItems
      const itemsFromStorage = JSON.parse(localStorage.getItem('selectedItems')) || []
      // Check if itemsFromStorage is not empty
      if (itemsFromStorage && itemsFromStorage.length > 0) {
        setCartItems(itemsFromStorage)
        getAlbums(itemsFromStorage.map(item => item.id))
      }
      // Update cartItemsCount
      setCartItemsCount(itemsFromStorage.length)
    } catch (error) {
      console.error(error)
    }
  }, [cartItemsCount])

  useEffect(() => {
    calculateAmountOfItems()
    calculateTotalPrice()
  }, [cartItems])

  // Calculate the total price of the cart
  const calculateTotalPrice = useCallback(() => {
    if (!cartItems) {
      return
    }
    let totalPrice = 0
    cartItems.forEach((cartItem) => {
      totalPrice += parseFloat(cartItem.price.replace(",", ".")) * parseFloat(cartItem.quantity)
    })
    setTotalPrice(totalPrice.toFixed(2).replace(".", ","))
  }, [cartItems])


  const handleRemoveItem = useCallback((itemId) => {
    if (!cartItems) {
      return
    }
    const updatedItems = cartItems.filter(item => item.id !== itemId)

    // Store updated items back into local storage
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems))

    // Update cartItems state
    setCartItems(updatedItems)
    // Update cartItemsCount
    setCartItemsCount(JSON.parse(localStorage.getItem('selectedItems')))

  }, [cartItems, setCartItems])

  return (
    <>
      {
        cartItems.length > 0 ?
          <div className='cartPageWrapper'>
            <div className='cart'>
              <h2>Cart</h2>
              <div className='cartDetails'>
                <div className='cartItems'>
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} onRemove={handleRemoveItem} calculateAmountOfItems={calculateAmountOfItems} />
                  ))}
                </div>
                <div className='cartOverview'>
                  <h3>Overview</h3>
                  <p>Number of items - {totalAmountOfItemsInCart}</p>
                  <p>Total Amount - € {totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
          :
          <div className='cartPageWrapper'>
            <div className='cart'>
              <h2>Cart</h2>
              <div className='cartDetails'>
                <div className='noItems'>
                  <h3>No Items In Cart</h3>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}