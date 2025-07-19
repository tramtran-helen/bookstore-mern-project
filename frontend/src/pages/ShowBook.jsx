import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'





/*React function component*/
const ShowBook = () => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false)
    const {id} = useParams() 


    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((res) => {
                setBook(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return(
        <div className='min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-6'>
            <BackButton />
            <h1 className='text-4xl font-semibold text-center text-gray-800 my-8'>Show Tram's Book Details</h1>
            {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
            <Spinner />
        </div>
      ) : (
        <div className="flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-5">
                <div>
                    <span className="font-semibold text-blue-500">ID:</span>
                    <p className="text-gray-700 break-all">{book._id}</p>
                </div>
                <div>
                    <span className="font-semibold text-blue-500">Title:</span>
                    <p className="text-gray-700">{book.title}</p>
                </div>
                <div>
                    <span className="font-semibold text-blue-500">Author:</span>
                    <p className="text-gray-700">{book.author}</p>
                </div>
                <div>
                    <span className="font-semibold text-blue-500">Publish Year:</span>
                    <p className="text-gray-700">{book.publishYear}</p>
                </div>
                <div>
                    <span className="font-semibold text-blue-500">Created At:</span>
                    <p className="text-gray-700">{book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}</p>
                </div>
                <div>
                    <span className="font-semibold text-blue-500">Last Updated:</span>
                    <p className="text-gray-700">{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : 'N/A'}</p>
                </div>
                </div>
            </div>)}
        </div>)}

export default ShowBook