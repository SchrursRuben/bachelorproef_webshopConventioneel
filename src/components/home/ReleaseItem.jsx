import '../../css/home/ReleaseItem.scss'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'


export default function ReleaseItem( { albumObject } ) {
    const navigate = useNavigate()
    const [showText, setShowText] = useState(false)

    const svgStyle = {
        width: '100px', 
        height: '100px', 
        verticalAlign: 'middle', 
        overflow: 'hidden' 
    }
    let svg = document.querySelector('.svg-icon');
    svg.classList.add('animate-out');

    const handleReleaseItem = useCallback(() => {
      navigate(`/releaseDetails/${albumObject?.id}`)
    }, [navigate, albumObject])

    const handleMouseEnter = useCallback(() => {
        setShowText(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
    setShowText(false)
    }, [])

    return (
        <>
            <div className='releaseLarge' onClick={handleReleaseItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className='releaseCoverArt'>
                    <img src={albumObject?.images[1].url} alt="releaseCoverImage" />
                    <div className='iconDiv' style={{ opacity: showText ? 1 : 0 }}>
                        <svg className="svg-icon" style={svgStyle} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 376.83"><path fillRule="nonzero" d="M355.12 372.7a12.026 12.026 0 0 1-17.09 1.06c-5-4.47-5.46-12.2-1.04-17.25l136.05-155.82H12.15c-6.71 0-12.15-5.5-12.15-12.28 0-6.77 5.44-12.27 12.15-12.27h460.9L336.99 20.32c-4.42-5.05-3.96-12.78 1.04-17.25 5.01-4.47 12.66-4 17.09 1.05l153.67 176c4.17 4.55 4.33 11.64.17 16.39L355.12 372.7z"/></svg>
                    </div>
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