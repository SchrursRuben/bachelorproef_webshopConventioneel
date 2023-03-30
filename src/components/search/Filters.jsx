import '../../css/search/Filters.scss'
import React, { useEffect, useState } from 'react';
import { useSpotify } from '../../contexts/SpotifyProvider'
import Filter from './Filter'

export default function Filters( {onSelected} ) {
    const { genres, getGenres } = useSpotify()
    const [showAllGenres, setShowAllGenres] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState(null)

    useEffect(() => {
      try {
        getGenres()

        // Pass selected filter to parent
        if (selectedFilter) {
          onSelected(selectedFilter)
        }
      } catch (error) {
        console.error(error)
      }
    }, [getGenres, selectedFilter, onSelected])
    
    const handleShowMore = () => {
      setShowAllGenres(prevState => !prevState) // toggle the state of showAllGenres
    }

    const handleFilterSelect = (filter) => {
      setSelectedFilter(filter)
    }

    return (
      <>
        <div className="filterWrapper">
          <div className='filters'>
            {showAllGenres
              ? genres?.genres?.map(genre => <Filter genreName={genre} key={genre} onSelect={handleFilterSelect}/>)
              : genres?.genres?.slice(0, 9).map(genre => <Filter genreName={genre} key={genre} onSelect={handleFilterSelect}/>)}
          </div>
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