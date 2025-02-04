const UserPreview = ({user}) => {
  return (
    
    <div className="card bg-base-100 w-full shadow-2xl ring-4">
        <figure className="md:h-96 h-72">
          <img className="object-cover xl:object-fill"
            src={user?.photoUrl}
            alt="Profile Image" />
        </figure>
        <div className="card-body">
          <h1 className="card-title">{user?.firstName} {user?.lastName}</h1>
          <p className="font-medium">{user?.age} {user?.gender} </p>
          <p className="font-thin">{user?.about}  </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge badge-outline badge-md font-semibold font-mono">My Skills:</span>
                {user?.skills?.map((skill, key) => (
                <span key={key} className="badge badge-info badge-outline badge-md uppercase font-mono">{skill}</span>
                ))}
          </div>
        </div>
      </div>
  )
}

export default UserPreview
