import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"
import Badge from "./Badge"
import UserPreview from "./UserPreview"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../store/userSlice"
import { Plus } from "lucide-react"
import validator from 'validator'



const EditProfile = () => {
 
  const user=useSelector(store=>store.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [firstName,setFirstName]=useState(user?.firstName || "")
  const [lastName,setLastName]=useState(user?.lastName|| "")
  const [age,setAge]=useState(user?.age)
  const [gender,setGender]=useState(user?.gender)
  const [about,setAbout]=useState(user?.about || "")
  const [skill,setSkill]=useState("")
  const [skills,setSkills]=useState(user?.skills || [])
  const [photoUrl,setPhotoUrl]=useState(user?.photoUrl|| "")
  const [toast,setToast]=useState(false)
  const [errors,setErrors]=useState({})
  const modalRef = useRef(null);
  
  useEffect(()=>{
    if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAge(user.age);
        setGender(user.gender);
        setAbout(user.about);
        setSkills(user.skills);
        setPhotoUrl(user.photoUrl)
        setErrors({})
      }
  },[user])

  function handleCancel()
  {
     setErrors({})
     navigate("/profile")
  }

  function validateForm()
  {
     const error={
        firstName:"",
        lastName:"",
        age:"",
        skills:"",
        photoUrl:""
    }
    if(!firstName) error.firstName="First name cant be empty";
    else if(firstName.length<4) error.firstName="First name must be atleast 4 characters"
    else if(firstName>50) error.firstName="First name is too long"

    if(!lastName) error.lastName="Last name cant be empty";

    if(!age || age==="") error.age="Please enter a valid age"
    else if(age<18) error.age="You are too young for this ^_^"
    if(skills.length>5) error.skills="You can only add 5 skills"
    if(!validator.isURL(photoUrl)) error.photoUrl="Please enter a valid URL"

    if(error.firstName==="" && error.lastName==="" && error.age==="" && error.skills==="" && error.photoUrl==="") {return true;}
    else{
        setErrors(error)
        return false;
    }
    

  }

  const handleSave=async()=>
  {
     if(!validateForm()) return;
     try {
        const res=await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,skills,photoUrl},{withCredentials:true})
        dispatch(addUser(res.data.result))
        setToast(true)
        setTimeout(()=>{
            setToast(false)
            navigate("/profile")
        } ,1000)
        setErrors({})
     } catch (error) {
        navigate("/error")
     }
  }
  function deleteSkill(key)
  {
    setErrors({...errors,skills:""})
    setSkills(skills.filter(skill=>skill!=key))
  }

  function addSkill()
  {
    if(!skill) {
        setSkill("")
        return
    }
    if(skills.length===5){
        setErrors({...errors,skills:"You can only add 5 skills"})
        return
    }
    setSkills([skill,...skills])
    setSkill("")
  }

  return ( user ?
    <div className="flex justify-center p-4">
        
        { toast && <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile saved successfully</span>
            </div>
        </div>}
        

        <div className="card bg-base-100 w-96 max-w-xs md:max-w-md lg:max-w-lg shadow-2xl ring-2 mt-5">
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">Edit Profile</h2>
                <form action="">
                    <div className="form-control mt-2">
                        <label htmlFor="" className="label">
                            <span className="label-text text-sm font-bold">First Name</span>
                        </label>
                        <input type="text" className="input input-bordered input-sm" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                        {errors?.firstName && <label className="label-text-alt text-error py-1">{errors.firstName}</label>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="" className="label">
                            <span className="label-text font-bold text-sm">Last Name</span>
                        </label>
                        <input type="text" className="input input-bordered input-sm" onChange={(e)=>setLastName(e.target.value)} value={lastName} />
                        {errors?.lastName && <label className="label-text-alt py-1 text-error">{errors.lastName}</label>}
                    </div>
                    <div className="form-control ">
                        <label htmlFor="" className="label">
                            <span className="label-text font-bold text-sm">Age</span>
                        </label>
                        <input type="number" className="input input-bordered input-sm" onChange={(e)=>setAge(e.target.value)} value={age}/>
                        {errors?.age && <label className="label-text-alt py-1 text-error">{errors.age}</label>}
                    </div>
                    <div className="form-control ">
                        <label htmlFor="" className="label">
                            <span className="label-text font-bold text-sm">Gender</span>
                        </label>
                        <select  className="select select-bordered w-full select-sm"  value={gender}onChange={(e) => setGender(e.target.value)}>
                            <option disabled value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="" className="label">
                            <span className="label-text font-bold text-sm">PhotoUrl</span>
                        </label>
                        <input type="url" className="input input-bordered input-sm" onChange={(e)=>setPhotoUrl(e.target.value)} value={photoUrl}/>
                        {errors?.photoUrl && <label className="label-text-alt py-1 text-error">{errors.photoUrl}</label>}
                    </div>
                    <div className="form-control">
                        <label htmlFor="" className="label">
                            <span className="label-text font-bold text-sm">About</span>
                        </label>
                        <textarea type="text" className="textarea textarea-md textarea-bordered overflow-hidden" onChange={(e)=>setAbout(e.target.value)} value={about}/>
                    </div>
                   
                    <div className="form-control">
                        <label htmlFor="" className="label">
                            <span className="label-text font-bold text-sm">Skills</span>
                        </label>
                        <div>
                            <input type="text" className="input input-bordered input-sm mb-4" onChange={(e)=>setSkill(e.target.value)} value={skill}/>
                            <button type="button" className="btn btn-xs btn-outline sm:ml-3" onClick={addSkill}>Add  
                                <span> <Plus className="w-6 h-4"/></span>
                            </button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {skills?.map((skill, key) => (
                            <button type="button" onClick={()=>deleteSkill(skill)} key={key} className="badge badge-outline badge-info font-mono uppercase">
                                <Badge skill={skill}/> 
                            </button>
                            ))}
                            {errors?.skills && <label className="label-text-alt px-2 text-error">{errors.skills}</label>}
                        </div>
                    </div>
                
                </form>
                <div className="card-actions justify-end ">
                    <button className="btn btn-sm btn-error" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-sm btn-info" onClick={() => modalRef.current?.showModal()}>Preview</button>
                    <button className="btn btn-sm btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>   
        <dialog ref={modalRef} className="modal">
       <div className="modal-box w-72 sm:w-80 md:w-96 flex flex-col justify-center items-center shadow-2xl">
         <UserPreview user={{firstName,lastName,age,gender,photoUrl,skills,about}} />
         <div className="modal-action">
           <button className="btn btn-outline btn-sm hover:btn-error" onClick={() => modalRef.current?.close()}>Close</button>
         </div>
       </div>
       <form method="dialog" className="modal-backdrop backdrop-blur-sm">
         <button>close</button>
       </form>
     </dialog>     
    </div> : <LoadingSpinner/>
  )
}

export default EditProfile
