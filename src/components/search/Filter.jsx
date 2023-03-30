import '../../css/search/Filter.scss'

export default function Filters({ genreName, onSelect }) {
    const handleClick = () => {
        onSelect(genreName)
    }

    return (
        <>
            <div className="filter" onClick={handleClick}>
                <p>{genreName.charAt(0).toUpperCase() + genreName.slice(1)}</p>
            </div>
        </>
    )
}