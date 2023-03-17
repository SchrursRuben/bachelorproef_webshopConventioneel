import '../../css/home/TrendingItem.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'


export default function TrendingItem( {album} ) {
    const navigate = useNavigate()

    const handleTrendingItem = useCallback(() => {
      navigate(`/details`)
    }, [navigate])

    return (
        <>
            <button className='releaseLarge' onClick={handleTrendingItem}>
                <div className='releaseCoverArt'>
                    <img src={album?.images[1].url} alt="releaseCoverImage" />
                </div>
                <div className='releaseDescription'>
                    <div className='releaseInfo'>
                        <div className='releaseTitle'>
                            <h5>{album?.name}</h5>
                        </div>
                        <div className='releaseNameAndPrice'>
                            <h6 className='releaseName'>{album?.artists[0].name}</h6>
                            <h5 className='releasePrice'>€ 15,00</h5>
                        </div>
                    </div>
                </div>
            </button>
        </>
    )
}