import React, { useState, useEffect } from 'react';
import '../../css/home/Trending.scss'
import ReleaseItem from './ReleaseItem'
import { useSpotify } from '../../contexts/SpotifyProvider'


export default function Trending() {
  const { newReleases, getNewReleases, setGoBack } = useSpotify()
  const [ showAllItems, setShowAllItems ] = useState(false)

  const handleShowMore = () => {
    setShowAllItems(prevState => !prevState)
  }

  useEffect(() => {
    try {
      getNewReleases()

      setGoBack(false)
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
              newReleases?.albums?.items?.map(item => <ReleaseItem albumObject={item} key={item?.id} />)
            ) : (
              newReleases?.albums?.items?.slice(0, 8).map(item => <ReleaseItem albumObject={item} key={item?.id} />)
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