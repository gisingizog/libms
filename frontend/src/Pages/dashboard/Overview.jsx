import { Link } from "react-router-dom";
import useData from "../../hooks/useData";

export default function Overview() {
    const {books}=useData();
    return (
        <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-gray-800">Summary</h2>
            <div className="flex flex-col items-center py-6 sm:px-12 md:px-24 w-full sm:w-fit justify-center gap-y-3 shadow-sm rounded-md border">
                <p className="text-gray-700 text-xl font-semibold">Total Books</p>
                <p className="text-4xl font-semibold  pb-3">{books.length}</p>
                <Link to={'/dashboard/books'} className="border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:text-white hover:bg-blue-600 transition-colors duration-200">
                    Go to books
                </Link>
            </div>
        </div>
    )
}
