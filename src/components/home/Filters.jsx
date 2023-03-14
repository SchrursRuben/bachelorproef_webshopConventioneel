import '../../css/home/Filters.scss'
import React, { useEffect, useState } from 'react';
import { useReleases } from '../../contexts/ReleaseProvider'
import Filter from './Filter'

export default function Filters() {
    const { genres, getAllGenres } = useReleases()
    const [showAllGenres, setShowAllGenres] = useState(false)

    // Adding dependency causes infinite loop
    useEffect(() => {
        try {
          getAllGenres()
        } catch (error) {
          console.error(error)
        }
    }, [])
    
    const handleShowMore = () => {
      setShowAllGenres(prevState => !prevState); // toggle the state of showAllGenres
    }

    return (
      <>
        <div className="filterWrapper">
          <div className='filters'>
            {showAllGenres
              ? genres?.map(genre => <Filter genreName={genre} key={genre} />)
              : genres?.slice(0, 6).map(genre => <Filter genreName={genre} key={genre} />)}
          </div>
          <div className='showMoreDiv'>
            {genres && genres.length > 5 && (
              <button onClick={handleShowMore} className="showMoreButton">
                {showAllGenres ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      </>
    )
}