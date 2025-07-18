import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({ destinations = '/' }) => {
    return(
        <div className='flex'>
            <Link to={destination} 
            className="bg-blue-200 hover:bg-blue-400 text-blue-800 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200">
                <BsArrowLeft className="text-2x1"/>
            </Link>
        </div>
    )
}

export default BackButton