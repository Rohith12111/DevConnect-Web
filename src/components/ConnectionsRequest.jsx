import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../store/requestSlice";
import { useEffect, useState } from "react";
import NoConnections from "../assets/loneliness.png"
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";


const ConnectionsRequest = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate()
  const requests=useSelector(store=>store.request)
  const [toastMessage,setToastMessage]=useState("");
  const [showToast,setShowToast]=useState(false);
  const [isLoading,setIsLoading]=useState(false)

  const getConnectionRequests=async()=>{
    try {
      setIsLoading(true)
      const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
      dispatch(addRequests(res.data.requests))
    } catch (error) {
       navigate("/error")
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    getConnectionRequests();
  },[])

  const handleAccept=async(id)=>
  {
    
    try {
      await axios.post(BASE_URL+`/request/review/accepted/${id}`,{},{withCredentials:true})
      dispatch(removeRequest(id));
      setToastMessage("Request Accepted")
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false);
        setToastMessage("");
      },2000)
    } catch (error) {
      navigate("/error")
    }
  }

  const handleDeny=async (id)=>
  {
      try {
        await axios.post(BASE_URL+`/request/review/rejected/${id}`,{},{withCredentials:true})
        dispatch(removeRequest(id));
        setToastMessage("Request Rejected")
        setShowToast(true)
        setTimeout(()=>{
          setShowToast(false);
          setToastMessage("");
        },2000)
      } catch (error) {
        navigate("/error")
      }
  }

  if(isLoading) return <LoadingSpinner/>

  return (
    <div className="flex flex-col justify-center items-center my-20">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              toastMessage === "Request Accepted"
                ? "alert-success"
                : "alert-error"
            }`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="card bg-primary-content bg-opacity-10 w-full max-w-96 md:max-w-lg  shadow-xl shadow-primary-content ring-2">
        <div className="card-body">
          <h2 className="card-title flex justify-center font-bold mb-10">
            Requests
          </h2>
          {requests && requests.length!=0 ? (
            requests.map((request, index) => (
              <div key={request._id} className="collapse mb-2 ring-2">
                <input
                  type="radio"
                  name="my-accordion-1"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-lg font-bold flex justify-between">
                  <img
                    src={request?.fromUserId?.photoUrl}
                    className="img h-20 w-20 rounded-full"
                    alt=""
                  />
                  <span className="my-5 px-4">
                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                  </span>
                  <span className="my-5 font-medium mb-1">
                    {request.fromUserId.age} {request.fromUserId.gender}
                  </span>
                </div>
                <div className="collapse-content">
                  <div className="flex flex-col items-start mt-2">
                    <p className="font-medium mb-2">
                      {request.fromUserId.about}
                    </p>
                    <span className="flex justify-between gap-2 flex-wrap">
                      {request.fromUserId.skills.map((skill, id) => (
                        <span
                          key={id}
                          className="badge badge-outline badge-info uppercase font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      className="btn btn-sm btn-error btn-outline mx-2"
                      onClick={() => handleDeny(request._id)}
                    >
                      Deny
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAccept(request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (<div className="flex justify-center ">
            <div className="bg-transparent h-40 flex flex-col justify-center items-center max-w-sm md:max-w-md lg:max-w-lg"> 
              <img
                src={NoConnections}
                className="object-contain h-40 w-30"
                alt="No Connections"
              />
              <div className="flex items-center gap-2 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-semibold">You have no connection requests</span>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectionsRequest
