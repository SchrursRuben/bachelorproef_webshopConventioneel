import Trending from './home/Trending'
import Filters from './home/Filters'

import '../css/Home.scss'

export default function Home () {
  return (
    <>
        <div className='homeWrapper'>
            <Filters/>
            <Trending/>
        </div>
    </>
  )
}