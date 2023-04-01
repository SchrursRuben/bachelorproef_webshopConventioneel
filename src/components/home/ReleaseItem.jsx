import '../../css/home/ReleaseItem.scss'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSpotify } from '../../contexts/SpotifyProvider'

export default function ReleaseItem( { albumObject } ) {
    const navigate = useNavigate()
    const [ price, setPrice ] = useState(0)
    const { generatedAlbumPrices } = useSpotify()

    const handleReleaseItem = useCallback(() => {
      navigate(`/releaseDetails/${albumObject?.id}`)
    }, [navigate, albumObject])

    useEffect(() => {
        // Get Price
        const priceCurrentAlbum = generatedAlbumPrices.find(item => item.id === albumObject?.id) || {}
        setPrice(priceCurrentAlbum.price)
    },[generatedAlbumPrices])

    return (
        <>
            <div className='releaseLarge' onClick={handleReleaseItem}>
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
                            <h5 className='releasePrice'>€ {price}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}