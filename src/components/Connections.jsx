import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../store/connectionSlice"
import { useNavigate } from "react-router-dom"
import NoConnections from "../assets/lonely.png"

const Connections = () => {

    const connections=useSelector(store=>store.connection)||[]
    const [progress,setProgress]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const getConnections=async()=>{
        
        try {
            setIsLoading(true)
            const myConnections=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
            dispatch(addConnection(myConnections.data.connections))
        } catch (error) {
            navigate("/error")
        }finally{
            setIsLoading(false)
        }  

    }
    useEffect(()=>{
        getConnections()
    },[])

    useEffect(() => {
        if (!isLoading && connections.length === 0) {
          const timer = setInterval(() => setProgress(p => Math.min(p + 2, 100)), 100);
          const redirect = setTimeout(() => navigate('/'), 5000);
          
          return () => {
            clearInterval(timer);
            clearTimeout(redirect);
          };
        }
      }, [connections.length, navigate,isLoading]);

    if (!isLoading && connections.length===0) {
        
       return ( 
        
        <div>
                <div className="toast toast-top toast-center mt-20 w-1/4 ">
                    <div className="alert  flex flex-col items-center w-full ring-1 shadow-md shadow-success">
                    <span className="text-lg font-bold">Taking you to feed page</span>
                    <progress className="progress progress-success w-full" value={progress} max="100"></progress>
                    </div>
                </div>

                <div className="flex justify-center ">
                    <div role="alert" className="alert shadow-lg h-40 mt-36 w-1/4 flex flex-col items-center ring-2 ">
                       
                         <img src={NoConnections} className="object-contain h-20 w-30" alt="No Connections" />
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="font-semibold">You have no connections</span>
                        </div>
                    </div>
                    
                </div>
        </div>
         )}
     
        return ( connections &&
          <div className="p-4">
            <h2 className="text-2xl font-extrabold flex justify-center mb-10">Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connections.map(connection => (
                <div key={connection._id} className="card bg-base-100 shadow-xl hover:shadow-2xl hover:shadow-primary-content transition-shadow ring-2">
                  <figure className="h-48 mt-5">
                    <img 
                      src={connection.photoUrl} 
                      alt="Profile" 
                      className="object-scale-down h-full rounded-full"
                      loading="lazy"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{connection.firstName} {connection.lastName}</h2>
                    <p className="text-sm text-gray-600">{connection.about}</p>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {connection.skills.map(skill => (
                        <span className="badge badge-outline badge-info uppercase badge-sm font-mono" key={skill}>{skill}</span>
                      ))}
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-sm btn-outline btn-accent">Message</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
}

export default Connections
