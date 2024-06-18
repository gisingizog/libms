import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full gap-y-6'>
        <p className="text-xl">Page Not Found</p>
        <h2 className="font-bold text-4xl ">404</h2>
        <Link to={'/'} className="text-blue-500 border text-lg border-blue-500 px-5 py-2 rounded-md">
            Go Home
        </Link>
    </div>
  )
}
