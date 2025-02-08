import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import validator from 'validator'

const SignUp = () => {
  
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState({})
    
    function validateForm()
    {   
        const error={
            firstName:"",
            email:"",
            password:"",
        }

        if(!firstName) error.firstName="First name cant be empty";
        else if(firstName.length<4) error.firstName="First name must be atleast 4 characters"
        else if(firstName>50) error.firstName="First name is too long"

        if(!validator.isStrongPassword(password)) error.password="Weak password"
        if(!validator.isEmail(email)) error.email="Not a valid email"

        if(error.firstName==="" && error.email==="" && error.password==="") return true;
        setErrors(error);
        return false;

    }

    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        setErrors({})
        if(!validateForm()) return;
        try {
            const data=await axios.post(BASE_URL+"/signup",{firstName,lastName,email,password},{withCredentials:true})
            dispatch(addUser(data.data.result))
            setErrors({})
            navigate("/profile")

        } catch (error) {
            if(error?.response?.data.includes('dup key') || error?.response?.data.includes(email))
            {
                setErrors({email:`Account already exists for ${email}. Please try logging in instead.`})
            }
            else {
                setErrors("An unexpected error occurred. Please try again.")
                navigate("/error")
            }
            
        }
    }

    function handleCancel(){
        setErrors({})
        navigate("/login")
    }
    


    return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-100 shadow-xl lg:w-1/5 min-w-full md:min-w-80 sm:min-w-80  ring-2">
        <div className="card-body">
          <h1 className="card-title font-bold uppercase mb-5">SignUp</h1>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="form-control w-full">
                <label className="block mb-2 font-bold">First Name</label>
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input input-bordered w-full" />
                {errors?.firstName && <label className="label-text-alt text-error">{errors.firstName}</label>}
              </div>

              <div className="form-control w-full">
                <label className="block mb-2 font-bold">Last Name</label>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input input-bordered w-full" />
              </div>

            <div className="form-control w-full">
                <label className="block mb-2 font-bold">Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="input input-bordered w-full" />
                {errors?.email && <label className="label-text-alt text-error">{errors.email}</label>}
              </div>
              
              <div className="form-control w-full">
                <label className="block mb-2 font-bold">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full" />
                {errors?.password && <label className="label-text-alt text-error">{errors.password}</label>}
              </div>

              
            <div className="card-actions justify-center mt-8">
              <button type="button" className="btn btn-outline btn-error" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="btn btn-primary">SignUp</button>
            </div>
          </form>
          
        </div>
      </div>
      
    </div>
  )
}

export default SignUp
