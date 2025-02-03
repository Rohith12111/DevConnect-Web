import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="min-h-screen flex justify-center my-20">
        <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Something Went Wrong</h1>
            <Link to="/login" className="text-xl link link-primary mx-auto mt-5">Go Home</Link>
        </div>
        
    </div>
  )
}

export default Error
