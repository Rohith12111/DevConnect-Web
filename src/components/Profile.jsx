import { Pencil } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Profile = () => {

  const user=useSelector(state=>state.user)
  const navigate=useNavigate();

  function handleEdit()
  {
     navigate("/profile/edit")
  }

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-100 w-96 max-w-xs md:max-w-md lg:max-w-lg shadow-2xl ring-2"> 
      <div className="card-body">
      <figure className="h-48 mt-5">
          <img className="object-cover h-full rounded-full"
            src={user?.photoUrl}
            alt="Profile Image" />
        </figure>
        <h2 className="card-title">{user?.firstName} {user?.lastName}</h2>
          <p className="font-medium">{user?.age} {user?.gender} </p>
          <p className="font-thin">{user?.about}  </p>
          <p className="">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge  badge-outline badge-md font-semibold font-mono">Your Skills:</span>
                {user?.skills?.map((skill, key) => (
                <span key={key} className="badge badge-info badge-outline badge-md uppercase font-mono">{skill}</span>
                ))}
          </div>
          <div className="card-actions justify-end my-5">
            <button onClick={handleEdit} className="btn btn-sm btn-outline btn-neutral text-base gap-0.5"><Pencil className="h-4 w-4"/> Edit</button>
          </div>

      </div>
    </div>

    </div>
  )
}

export default Profile
