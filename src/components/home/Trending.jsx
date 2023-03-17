import React, { useState, useEffect } from 'react';
import '../../css/home/Trending.scss'
import TrendingItem from './TrendingItem'
import { useSpotify } from '../../contexts/SpotifyProvider'


export default function Trending() {
  const { newReleases, getNewReleases } = useSpotify()
  const [ showAllItems, setShowAllItems ] = useState(false)

  const handleShowMore = () => {
    setShowAllItems(prevState => !prevState)
  }

  useEffect(() => {
    try {
      getNewReleases()
    } catch (error) {
      console.error(error)
    }
  }, [getNewReleases])

  return (
      <>
        <div className="trending">
          <h2>Trending</h2>
          <div className="trendingReleases">
            {showAllItems ? (
              newReleases?.albums?.items?.map(item => <TrendingItem album={item} key={item?.id} />)
            ) : (
              newReleases?.albums?.items?.slice(0, 10).map(item => <TrendingItem album={item} key={item?.id} />)
            )}
          </div>
          <div className='showMoreDiv'>
              <button onClick={handleShowMore} className="showMoreButton">
              {showAllItems ? 'Show Less' : 'Show More'}
              </button>
          </div>
        </div>
      </>
    )
}