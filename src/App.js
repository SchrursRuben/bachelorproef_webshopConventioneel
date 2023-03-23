import './css/App.scss'
import React from 'react'
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ReleasePage from './pages/ReleasePage'
import CartPage from './pages/CartPage'
import { SpotifyProvider } from './contexts/SpotifyProvider'

export default function App() {
  return (
    <>
      <SpotifyProvider>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/releaseDetails/:albumId' element={<ReleasePage/>}/>
          <Route exact path='/cart' element={<CartPage/>}/>
        </Routes>
      </SpotifyProvider>
    </>
  )
}