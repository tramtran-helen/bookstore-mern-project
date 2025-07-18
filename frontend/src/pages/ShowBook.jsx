import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import Spinner from '../components/Spinner.jsx'


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
        <div className='p-6 min-h-screen bg-gradient-to-b from-sky-50 via-teal-50 to-sky-50'>

        </div>
    )
}

export default ShowBook