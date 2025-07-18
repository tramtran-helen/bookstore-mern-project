import react, { useEffect, useState } from 'react' //store & update data; run code when the first component loads
import axios from 'axios' //fetch data from backend to frontend
import { Link } from 'react-router-dom' //navigate between pages without full reload
import Spinner from '../components/Spinner.jsx'

import { AiOutlineEdit } from 'react-icons/ai' //edit icon
import { BsInfoCircle } from 'react-icons/bs' //view icon
import { MdOutlineAddBox, MdOutlineDelete, MdOutlineHourglassEmpty } from 'react-icons/md' //add & delete icons





/*React function component*/
const Home = () => {
    const [books, setBooks] = useState([]) //books from backend to get all books back
    const [loading, setLoading] = useState(false)
    


    useEffect(() => {
        setLoading(true)
        axios
          .get('http://localhost:5555/books') //fetch data (also links to the 'books' variable before)
          .then((res) => {
            setBooks(res.data.data)
            setLoading(false) //finish getting data, so loading stops
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })
    }, []) //function inside useEffect will run only when Home exits, not reloading the full page every time



    return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-sky-50 via-teal-50 to-sky-50">
        <div className="flex justify-center items-center gap-x-4 mt-10">
            <h1 className="text-4xl my-6 font-semibold text-gray-800">Tram's Book List</h1>
            <Link to="/books/create">
                <MdOutlineAddBox className="text-sky-800 text-4xl hover:text-sky-600" />
            </Link>
        </div>



        {loading ? (
            <Spinner />
        ) : ( //table headers with blue background, th: things in the header cells
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-blue-400 rounded-md overflow-hidden">
                <thead className="bg-blue-100"> 
                    <tr>
                        <th className="text-left px-4 py-3 border border-blue-300">Number</th>
                        <th className="text-left px-4 py-3 border border-blue-300">Title</th>
                        <th className="text-left px-4 py-3 border border-blue-300">Author</th>
                        <th className="text-left px-4 py-3 border border-blue-300">Publish Year</th>
                        <th className="text-left px-4 py-3 border border-blue-300">Actions</th>
                    </tr>
                </thead>


                
                <tbody> 
                    {books.map((book, index) => (//loop through books array & for each book create 1 <tr>
                        <tr key={book._id} className="hover:bg-blue-50">
                            <td className="px-4 py-2 border border-blue-200">{index + 1}</td>
                            <td className="px-4 py-2 border border-blue-200">{book.title}</td>
                            <td className="px-4 py-2 border border-blue-200">{book.author}</td>
                            <td className="px-4 py-2 border border-blue-200">{book.publishYear}</td>
                            <td className="px-4 py-2 border border-blue-200">
                                <div className="flex justify-start items-center gap-x-4">
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className="text-xl text-purple-800 hover:text-purple-600" />
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className="text-xl text-blue-800 hover:text-blue-600" />
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}>
                                        <MdOutlineDelete className="text-xl text-red-800 hover:text-red-600" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)}
    </div>
)}

export default Home