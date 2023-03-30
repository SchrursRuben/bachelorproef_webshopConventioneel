import '../../css/home/ReleaseItem.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'


export default function ReleaseItem( { albumObject } ) {
    const navigate = useNavigate()

    const handleReleaseItem = useCallback(() => {
      navigate(`/releaseDetails/${albumObject?.id}`)
    }, [navigate, albumObject])


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
                            <h5 className='releasePrice'>€ 15,00</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}