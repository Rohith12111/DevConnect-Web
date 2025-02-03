import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [ isValidCredentials,setIsValidCredentials]=useState(true);
  const [showModal, setShowModal] = useState(false);

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleFormSubmit= async(e)=>
  { 
      e.preventDefault();

      try {
        const res=await axios.post( BASE_URL + '/login',{
          email:userName,
          password:password
        },{withCredentials:true})
        setIsValidCredentials(true)
        dispatch(addUser(res.data))
        navigate("/")
      } catch (error) {
        setShowModal(true)
        setTimeout(()=>setShowModal(false),2000)
        setIsValidCredentials(false)
      }
  }

  return (
    <div className="flex justify-center py-40">
      <div className="card bg-base-100 shadow-xl min-w-full lg:w-1/5 md:min-w-96 sm:min-w-80 ring-2 ">
        <div className="card-body">
          <h1 className="card-title font-bold uppercase mb-5">Login</h1>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="form-control w-full">
                <label className="block mb-2 font-bold">Username</label>
                <input type="text" placeholder="Email" value={userName} onChange={(e)=>setUserName(e.target.value)} className="input input-bordered w-full focus:ring-black focus:ring-2" />
              </div>
              
              <div className="form-control w-full">
                <label className="block mb-2 font-bold">Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full focus:ring-black focus:ring-2" />
              </div>

              { !isValidCredentials && 
                <dialog className={`modal ${showModal ? 'modal-open' : ''} modal-top`}>
                <div className="modal-box bg-error text-error-content mt-20 w-96 mx-auto rounded-lg">
                  <h3 className="font-bold text-lg text-center">Invalid Credentials</h3>
                  <p className="text-center mt-2">Please check your email and password</p>
                </div>
                </dialog>
              }
            <div className="card-actions flex-col items-center justify-center">
              <button type="submit" className="btn btn-primary">Login</button>
              <Link to="/signup" className="label-text cursor-pointer font-semibold link link-primary" >New User? SignUp Here</Link>
            </div>
          </form>
          
        </div>
      </div>
      
    </div>
  );
}

export default Login
