import React, { useEffect, useCallback, useState } from 'react'
import CartItem from './CartItem'
import '../../css/cart/Cart.scss'
import { useSpotify } from '../../contexts/SpotifyProvider'

export default function Cart() {
  const { cartItems, setCartItems, getAlbums } = useSpotify()
  const [amountOfItems, setAmountOfItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Load cartItems
  useEffect(() => {
    try {
      // Get cartItems
      const itemsFromStorage = JSON.parse(localStorage.getItem('selectedItems'))
      if (itemsFromStorage?.length !== 0) {
        setCartItems(itemsFromStorage)

        getAlbums((itemsFromStorage?.map(item => {
          return item.id
        })))
      }
      // Get Prices
      const pricesFromStorage = JSON.parse(localStorage.getItem('albumPrices'))
      // if (pricesFromStorage?.length !== 0) {
      //   setCartItems(itemsFromStorage?.map(item => {
      //     const priceCurrentAlbum = pricesFromStorage.find(album => album.id === item.id) || {}
      //     if (priceCurrentAlbum) {
      //       item.price = priceCurrentAlbum.price
      //     }
      //     return item
      //   }))
      // }
      console.log(pricesFromStorage)
    } catch (error) {
      console.error(error)
    }
  }, [getAlbums])

  // Calculate the total price of the cart
  const calculateTotalPrice = useCallback(() => {
    if (!cartItems) {
      return
    }
    let totalPrice = 0
    cartItems.forEach(cartItem => {
      totalPrice += cartItem.price * cartItem.quantity
      console.log(cartItem.price)
    })
    setTotalPrice(totalPrice)
    return totalPrice
  }, [cartItems])

  // Calculate the total number of items in the cart
  const calculateAmountOfItems = useCallback(() => {
    if (!cartItems) {
      return
    }
    let totalAmount = 0
    cartItems.forEach(cartItem => {
      totalAmount += cartItem.quantity
    })
    setAmountOfItems(totalAmount)
    calculateTotalPrice()
    return totalAmount
  }, [cartItems])

  useEffect(() => {
    if (!cartItems) {
      return
    }
    calculateAmountOfItems()
  }, [])

  const handleRemoveItem = useCallback((itemId) => {
    if (!cartItems) {
      return
    }
    const updatedItems = cartItems.filter(item => item.id !== itemId)

    // Store updated items back into local storage
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems))

    // Update cartItems state
    setCartItems(updatedItems)
  }, [cartItems, setCartItems])

  return (
    <>
      {
        cartItems ?
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
                  <p>Number of items : {amountOfItems}</p>
                  <p>Total Amount: {totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
          :
          <div className='cartPageWrapper'>
            <div className='cart'>
              <h2>Cart</h2>
              <div className='cartDetails'>
                <h3>No Items</h3>
                <div className='cartOverview'>
                  <h3>Overview</h3>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}