import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { swipeIgnore, swipeInterest } from "../store/feedSlice";
import { useNavigate } from "react-router-dom";

function UserCard({user}) {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleUserRequest=async(status,id)=>{

      try {
        await axios.post(BASE_URL+ "/request/"+status+"/"+id,{},{withCredentials:true})
        if(status==="interested") dispatch(swipeInterest(id))
        else dispatch(swipeIgnore(id))
      } catch (error) {
        navigate("/error")
      }

  }
   
  return (
    <div className="card bg-base-100 w-96 max-w-xs md:max-w-md lg:max-w-lg shadow-2xl ring-2">
        <figure className="h-96">
          <img className="object-cover md:object-fill"
            src={user?.photoUrl}
            alt="Profile Image" />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{user?.firstName} {user?.lastName}</h1>
          <p className="font-medium">{user?.age} {user?.gender} </p>
          <p className="font-thin">{user?.about}  </p>
          {user.skills.length!==0 && <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge  badge-outline badge-md font-semibold font-mono">My Skills:</span>
                {user?.skills?.map((skill, key) => (
                <span key={key} className="badge badge-info badge-outline badge-md uppercase font-mono">{skill}</span>
                ))}
          </div>}
          <div className="card-actions justify-center my-5">
            <button className="btn btn-error" onClick={()=>handleUserRequest("ignored",user._id)}>Ignore</button>
            <button className="btn btn-primary" onClick={()=>handleUserRequest("interested",user._id)}>Connect</button>
          </div>
        </div>
      </div>
  )
}

export default UserCard
