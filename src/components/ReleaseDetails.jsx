import '../css/ReleaseDetails.scss'
import { useParams } from 'react-router'
import { useSpotify } from '../contexts/SpotifyProvider'
import React, { useCallback, useState, useEffect } from 'react'
import Swal from 'sweetalert2'


export default function ReleaseDetails () {
    const { albumId } = useParams()
    const { currentAlbum, getCurrentAlbum } = useSpotify()
    const [ selectedItems, setSelectedItems ] = useState([])

    // CartIcon
    const svgStyle = {
        width: "32px",
        height: "32px",
        verticalAlign: "middle",
        overflow: "hidden"
    }

    useEffect(() => {
        try {
            getCurrentAlbum(albumId)

            // Get CartItems
            const itemsFromStorage = JSON.parse(localStorage.getItem('selectedItems')) || []
            setSelectedItems(itemsFromStorage)

        } catch (error) {
            console.error(error)
        }
    }, [albumId, getCurrentAlbum])
    
    const handleBuyButton = useCallback(() => {
        // Add new item to array
        const newItem = {id: currentAlbum.id, quantity: 1}
        // Check if ID already exists and increase the quantity if it does
        let updatedItems = []
        let found = false
        for (const item of selectedItems) {
            if (item.id === newItem.id) {
                updatedItems.push({ ...item, quantity: item.quantity + 1 })
                found = true
            } else {
                updatedItems.push(item)
            }
        }
        if (!found) {
            updatedItems.push(newItem)
        }

        // Store updated items back into local storage
        localStorage.setItem('selectedItems', JSON.stringify(updatedItems))

        // Update selectedItems state
        setSelectedItems(updatedItems)

        // Show succes message
        Swal.fire({
            title: 'Item added to cart!',
            showConfirmButton: true,
            customClass: {
                container: 'sweetContainer',
                title: 'sweetTitle',
                confirmButton: 'sweetButton'
            }
        })
    }, [currentAlbum, selectedItems])

    return (
        <>
            <div className='releaseDetailsWrapper'>
                <div className='releaseDetails'>
                    <div className='releaseTitle'>
                        <h2>{currentAlbum?.name}</h2>
                        {currentAlbum?.artists?.map((artist, index, artists) => {
                            const artistName = artist.name
                            const isLastArtist = index === artists.length - 1
                            const separator = artists.length > 1 && !isLastArtist ? ', ' : ''

                            return (
                                <h4 className='artistName' key={artist.id}>{artistName + separator}</h4>
                            )
                        })}
                    </div>
                    <div className='releaseCoverArtInfoBuyButtonAndDescription'>
                        <div className='releaseCoverArt'>
                            <img src={currentAlbum?.images?.at(0).url} alt="releaseCoverImage" />
                        </div>
                        <div className='releaseInfoBuyButtonAndDescription'>
                            <div className='releaseInfo'>
                                <div className='releasePriceAndType'>
                                    <h4 className='releasePrice'>€ 15,00</h4>
                                    <p className='releaseType'>LP</p>
                                </div>
                                <div className='releaseLabelInfo'>
                                    <h4 className='labelText'>LABEL</h4>
                                    <h4 className='labelName'>{currentAlbum?.label}</h4>
                                </div>
                            </div>
                            <div className='releaseBuyButtonAndDescription'>
                                <div className='buyButton' onClick={handleBuyButton}>
                                    <h2>ADD TO CART</h2>
                                    <svg className="svg-icon" style={svgStyle} viewBox="0 0 1109 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M1012.920568 469.559268c-15.332419 43.758169-43.523597 85.298574-85.298574 85.298574L294.493327 554.857842 309.207331 661.48106c3.326644 23.542406 19.085556 42.649287 42.649287 42.649287l618.414663 0 0 42.649287L330.531975 746.779634c-35.334934 0-57.960381-27.956608-63.973931-63.973931L181.25947 43.066397 10.662322 43.066397 10.662322 0.41711c0 0 131.317155-0.938284 170.597148 0 27.977932 0.661064 42.649287 42.649287 42.649287 42.649287l11.771203 85.298574L1012.920568 128.364971c59.090587 0 86.620702 24.864534 85.298574 85.298574L1012.920568 469.559268zM1012.920568 171.014258 351.856618 171.014258l-85.298574 0-24.992482 0 47.042164 341.194297L309.207331 512.208555l0 0 597.090019 0c36.550439 0 51.904182-10.79027 63.973931-42.649287l85.298574-234.571079C1063.438649 190.270411 1043.308185 171.014258 1012.920568 171.014258zM426.492871 789.428921c64.784267 0 117.285539 52.501272 117.285539 117.285539S491.277138 1024 426.492871 1024 309.207331 971.498728 309.207331 906.714461 361.708604 789.428921 426.492871 789.428921zM426.492871 981.350713c41.220536 0 74.636252-33.394392 74.636252-74.636252S467.713407 832.078208 426.492871 832.078208 351.856618 865.4726 351.856618 906.714461 385.272335 981.350713 426.492871 981.350713zM874.310385 789.428921c64.784267 0 117.285539 52.501272 117.285539 117.285539S939.094652 1024 874.310385 1024 757.024846 971.498728 757.024846 906.714461 809.526118 789.428921 874.310385 789.428921zM874.310385 981.350713c41.241861 0 74.636252-33.394392 74.636252-74.636252S915.552246 832.078208 874.310385 832.078208 799.674133 865.4726 799.674133 906.714461 833.068525 981.350713 874.310385 981.350713z"  /></svg>
                                </div>
                                <div className='releaseDescription'>
                                    <h2>Description</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}