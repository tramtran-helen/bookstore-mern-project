import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'


/*Create BackButton that navigates users to different routes
If nothing is passed, it uses the default '/'
The actual destination value will be passed later*/
const BackButton = ({ destinations = '/' }) => {
    return(
        <div className="flex">
            <Link to={destinations} 
            className="bg-blue-200 hover:bg-blue-400 text-blue-800 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200">
                <BsArrowLeft className="text-2xl"/>
            </Link>
        </div>
    )
}

export default BackButton