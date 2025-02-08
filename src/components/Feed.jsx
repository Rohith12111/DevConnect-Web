import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../store/feedSlice"
import UserCard from "./UserCard"
import NoConnections from "../assets/connection.png"
import { Handshake } from "lucide-react"
import LoadingSpinner from "./LoadingSpinner"
import { useNavigate } from "react-router-dom"

const Feed= ()=> {
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const feedData=useSelector(store=>store.feed)
  const [isLoading,setIsLoading]=useState(false)
  
  const getFeed = async ()=>{
      
      try {
        setIsLoading(true)
        const feed=await axios.get(BASE_URL+"/user/feed",{withCredentials:true})
        dispatch(addFeed(feed.data.feed))
      } catch (error) {
        navigate("/error")
      }finally{
        setIsLoading(false)
      }
    
  }
  
  useEffect(()=>{
    getFeed();
  },[])
    
  if(isLoading) return <LoadingSpinner/>

  if(!feedData ||!Array.isArray(feedData) || feedData.length==0) 
  return (
    <div className="flex justify-center my-40"> 
      <div className="card card-compact bg-base-100 shadow-2xl ring-2 w-full max-w-sm md:max-w-md lg:max-w-lg">
          <figure>
            <img
              src={NoConnections}
              className="object-contain h-60  mt-10"
              alt="Fully connected"
            />
          </figure>
          <div className="card-body mb-10">
            <div className="flex justify-center">
              <div className="bg-transparent flex flex-col justify-center items-center">
                <div className="flex items-center gap-2">
                  <div className="flex justify-center gap-1">
                    <Handshake className="h-8 w-6" />
                    <span className="font-bold text-xl">You are connected!!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="flex justify-center my-20">
      <UserCard key={feedData[0]._id} user={feedData[0]}/>
    </div>
  )
}

export default Feed;
