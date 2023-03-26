import '../../css/home/Filters.scss'
import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../contexts/SpotifyProvider'
import Filter from './Filter'

export default function Filters() {
    const { genres, getGenres } = useSpotify()
    const [showAllGenres, setShowAllGenres] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState([])

    useEffect(() => {
      try {
        getGenres()
      } catch (error) {
        console.error(error)
      }
    }, [getGenres])
    
    
    const handleShowMore = () => {
      setShowAllGenres(prevState => !prevState) // toggle the state of showAllGenres
    }

    const selectRandomFilters = () => {
      const randomFilters = genres?.genres?.sort(() => 0.5 - Math.random()).slice(0, 20)
      setSelectedFilters(randomFilters)
    }

    return (
      <>
        <div className="filterWrapper">
          <div className='filters'>
            {showAllGenres
              ? genres?.genres?.map(genre => <Filter genreName={genre} key={genre} />)
              : genres?.genres?.slice(0, 9).map(genre => <Filter genreName={genre} key={genre} />)}
          </div>
          {/* {selectRandomFilters()} */}
          <div className='showMoreDiv'>
            {genres.genres && genres.genres.length > 5 && (
              <div onClick={handleShowMore} className="showMoreButton">
                {showAllGenres ? 'Show Less' : 'Show More'}
              </div>
            )}
          </div>
        </div>
      </>
    )
    
}