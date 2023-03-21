import '../../css/home/TrendingItem.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { useSpotify } from '../../contexts/SpotifyProvider'


export default function TrendingItem( { albumObject } ) {
    const navigate = useNavigate()

    const handleTrendingItem = useCallback(() => {
      navigate(`/releaseDetails/${albumObject?.id}`)
    }, [navigate, albumObject])

    return (
        <>
            <div className='releaseLarge' onClick={handleTrendingItem}>
                <div className='releaseCoverArt'>
                    <img src={albumObject?.images[1].url} alt="releaseCoverImage" />
                </div>
                <div className='releaseDescription'>
                    <div className='releaseInfo'>
                        <div className='releaseTitle'>
                            <h5>{albumObject?.name}</h5>
                        </div>
                        <div className='releaseNameAndPrice'>
                            <h6 className='releaseName'>{albumObject?.artists[0].name}</h6>
                            <h5 className='releasePrice'>€ 15,00</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}