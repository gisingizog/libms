/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useData from "../../hooks/useData";


export default function Books() {
    const { books, fetchingBooks } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        if (!searchTerm.length) {
            setFilteredBooks(books);
        } else {
            setFilteredBooks(books.filter(book => book.book_name.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }, [searchTerm, books]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredBooks.length / itemsPerPage));
        console.log("total pages : ", Math.ceil(filteredBooks.length / itemsPerPage))
        setPageData(filteredBooks.slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage))
    }, [filteredBooks, currentPage]);

    return (
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row justify-between w-full">
                <h2 className="text-3xl font-semibold text-gray-800">Books in library</h2>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="min-w-56 border border-gray-400 focus:border-blue-500 px-4 py-2 rounded-md"
                    placeholder="search by name ..."

                />
            </div>
            {
                fetchingBooks ?
                    <div className="w-full min-h-[40vh] bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-y-5">
                        <p>Loading data ...</p>
                    </div>
                    : books.length === 0 ?
                        <div className="w-full min-h-[40vh] bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-y-5">
                            <p>No books found!</p>
                        </div>
                        :
                        <div className="w-full flex flex-col items-center gap-y-6">
                            <div className="mt-8 flow-root w-full min-h-[30rem]">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Author
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Publisher
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Publication Year
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Subject
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {pageData.map((book) => (
                                                    <tr key={book.book_id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                            {book.book_id}
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                            {book.book_name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{book.author}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{book.publisher}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{book.publication_Year}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{book.subject}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="bg-gray-100 p-2 rounded-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                {currentPage !== 1 &&
                                    Array(currentPage - 1).fill().map((_, index) => (
                                        <button key={index} className="text-lg"
                                            onClick={() => setCurrentPage(index + 1)}
                                        >{index + 1}</button>
                                    ))
                                }
                                <p className="border rounded-md p-2 w-12 flex items-center justify-center text-xl">{currentPage}</p>
                                {
                                    (totalPages > 0 && totalPages !== currentPage) &&
                                    Array(totalPages - currentPage).fill().map((_, index) => (
                                        <button key={index} className="text-lg"
                                            onClick={() => setCurrentPage(index + currentPage + 1)}
                                        >{currentPage + index + 1}</button>
                                    ))
                                }
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="bg-gray-100 p-2 rounded-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </button>
                            </div>
                        </div>
            }
        </div>
    )
}
