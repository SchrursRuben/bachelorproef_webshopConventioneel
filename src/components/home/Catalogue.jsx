import React, { useState } from 'react';
import '../../css/home/Catalogue.scss'
import CatalogueItem from './CatalogueItem'

export default function Catalogue() {
    const [showAllItems, setShowAllItems] = useState(false)

    const handleShowMore = () => {
      setShowAllItems(prevState => !prevState)
    }

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