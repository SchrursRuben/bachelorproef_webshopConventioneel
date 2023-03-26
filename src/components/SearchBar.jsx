import { useState, useRef, useEffect } from 'react';
import '../css/SearchBar.scss'
import { useSpotify } from '../contexts/SpotifyProvider';
import ReleaseItem from '../components/home/ReleaseItem'

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("")
    const searchBarRef = useRef(null)
    const [focused, setFocused] = useState(false)
    const {search, getSearch} = useSpotify()
    const [showAllItems, setShowAllItems] = useState(false)

    const svgStyle = {
        width: '20px', 
        height: '20px', 
        verticalAlign: 'middle', 
        overflow: 'hidden' 
    }

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
        getSearch(e.target.value)
    }
    // Clicking anywhere in the searchbar will let you search immediately, clicking again will exit the focus state
    const handleClick = (e) => {
        e.preventDefault()
        if (e.detail === 2) return // ignore double-click
        if (focused) {
            searchBarRef.current.blur()
            setFocused(false)
        } else {
        searchBarRef.current.focus()
        setFocused(true)
        }
    }
    useEffect(() => {
        if (search) {
            setFocused(true)
        }
        const handleClickOutside = (e) => {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
                setFocused(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [search])

    const handleShowMore = () => {
        setShowAllItems(prevState => !prevState)
    }

    return (
        <>
            <div className="searchBar" onClick={handleClick}>
                <div className="searchField">
                    <input
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchInput}
                    ref={searchBarRef}
                    onDoubleClick={(e) => e.preventDefault()} />
                </div>
                <div className="icon">
                    <svg className="svg-icon" style={svgStyle} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M467.921455 929.629091c-253.998545 0-460.637091-206.638545-460.637091-460.613818 0-254.021818 206.638545-460.660364 460.637091-460.660364s460.637091 206.638545 460.637091 460.660364C928.558545 722.990545 721.943273 929.629091 467.921455 929.629091zM467.921455 54.900364c-228.328727 0-414.091636 185.762909-414.091636 414.114909 0 228.328727 185.762909 414.068364 414.091636 414.068364 228.352 0 414.091636-185.739636 414.091636-414.068364C882.013091 240.663273 696.273455 54.900364 467.921455 54.900364z"  /><path d="M994.629818 1015.645091c-5.701818 0-11.426909-2.094545-15.941818-6.306909l-220.066909-206.592c-9.355636-8.797091-9.844364-23.552-1.047273-32.907636 8.820364-9.355636 23.552-9.797818 32.907636-1.047273l220.066909 206.592c9.355636 8.797091 9.844364 23.552 1.047273 32.907636C1007.034182 1013.178182 1000.843636 1015.645091 994.629818 1015.645091z"  /></svg>                
                </div>
            </div>
            {search?.albums?.items && searchInput.trim() !== "" ? 
                <div className="searchResults">
                    <h2>Results</h2>
                    {showAllItems ? (
                        search?.albums?.items?.slice(0, 8).map(item => <ReleaseItem albumObject={item} key={item?.id} />)
                        ) : (
                            search?.albums?.items?.slice(0, 4).map(item => <ReleaseItem albumObject={item} key={item?.id} />)
                    )}
                    <div className='showMoreDiv'>
                        <button onClick={handleShowMore} className="showMoreButton">
                        {showAllItems ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
                : null
            }
        </>
    )
}