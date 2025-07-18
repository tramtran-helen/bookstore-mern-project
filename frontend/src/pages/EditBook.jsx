import react, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'





const EditBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()



    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5555/books/${id}`)
            .then((res) => {
                setAuthor(res.data.author)
                setPublishYear(res.data.publishYear)
                setTitle(res.data.title)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                alert('There is an error happening. Please check the console')
            })
    }, [])



    const handleUpdateBook = () => {
        const data = {
            title,
            author,
            publishYear,
        }
        setLoading(true)
        axios
            .put(`http://localhost:5555/books/${id}`, data)
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
            <h1 className='text-4xl font-semibold text-center text-gray-800 my-8'>Edit Tram's Book!</h1>

            {loading ? (
        <div className='flex justify-center items-center min-h-[200px]'>
          <Spinner />
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6'>
            <div>
              <label className='block text-blue-500 font-semibold mb-1'>Title:</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
              />
            </div>
            <div>
              <label className='block text-blue-500 font-semibold mb-1'>Author:</label>
              <input
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
              />
            </div>
            <div>
              <label className='block text-blue-500 font-semibold mb-1'>Publish Year:</label>
              <input
                type='text'
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200'
              />
            </div>
            <button
              onClick={handleUpdateBook}
              className='w-full bg-blue-300 hover:bg-blue-500 text-white font-semibold py-2 rounded-md shadow transition duration-200'
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditBook