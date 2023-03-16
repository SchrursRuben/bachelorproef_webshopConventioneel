import React, { useState, useEffect } from 'react';
import '../../css/home/Catalogue.scss'
import CatalogueItem from './CatalogueItem'
import { useSpotify } from '../../contexts/SpotifyProvider'


export default function Catalogue() {
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
        <div className="catalogue">
          <h2>Catalogue</h2>
          <div className="catalogueReleases">
            {showAllItems ? (
              <>
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
              </>
            ) : (
              <>
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
                <CatalogueItem />
              </>
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