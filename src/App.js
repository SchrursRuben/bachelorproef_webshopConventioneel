import './css/App.scss'
import React from 'react'
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ReleasePage from './pages/ReleasePage'
import { ReleaseProvider } from './contexts/ReleaseProvider'
import { SpotifyProvider } from './contexts/SpotifyProvider'



export default function App() {
  return (
    <>
      <SpotifyProvider>
        <ReleaseProvider>
          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route exact path='/details' element={<ReleasePage/>}/>
          </Routes>
        </ReleaseProvider>
      </SpotifyProvider>
    </>
  )
}