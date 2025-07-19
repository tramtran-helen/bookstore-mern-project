import react, { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'





/*React function component*/
const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()



  const HandleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        alert('There is an error happening. Please check your console')
        console.error(err)
      })
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 p-6'>
      <BackButton />
      <h1 className='text-4xl font-semibold text-center text-gray-800 my-8'>Delete My Book</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6'>
        <h3 className='text-lg text-center mb-4 block text-blue-500 font-semibold mb-1'>Are you sure you want to delete this book?</h3>
        <button
          className='mx-auto p-4 bg-blue-600 hover:bg-red-700 text-white font-semibold rounded-lg m-4 w-full transition duration-200'
          onClick={HandleDeleteBook}>
          Yes! Delete this book!
        </button>
      </div>
      </div>
    </div>
  )
}

export default DeleteBook
