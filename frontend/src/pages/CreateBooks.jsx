import react from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const CreateBooks = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear,
        }
        setLoading(true)
        axios
            .post('http://localhost:5555/books', data)
            .then(() => {
                setLoading(false)
                navigate('/')
            })
            .catch((err) =>{
                setLoading(false)
                alert('There is an error happening. Please check your console')
                console.log(err)
            })
    }

    return(
        <div className='min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-6'>
            <BackButton />

        </div>
    )
}

export default CreateBooks