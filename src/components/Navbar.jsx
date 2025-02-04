import axios from "axios";
import { useState } from "react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import { removeFeed } from "../store/feedSlice";
import { removeConnection } from "../store/connectionSlice";

export default function Navbar(){

    const [theme,setTheme]=useState(localStorage.getItem('theme')||'light')
    const user=useSelector((store)=>store.user)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function changeTheme(){
        const currentTheme=theme=='light'?'dark':'light'
        setTheme(currentTheme);
        localStorage.setItem("theme",currentTheme);
    }

    const onLogout=async()=>{
      try{

        await axios.post(BASE_URL+'/logout',{},{withCredentials:true});
        
        dispatch(removeUser());
        dispatch(removeFeed());
        dispatch(removeConnection());
        navigate('/login')
        
      }catch(error){
          navigate("/error")
      }
       
    }

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
    },[theme])

   
    return(
        <div className="navbar bg-primary text-base-content">
          <div className="flex-1">
            <Link to="/" onClick={(e)=>{
               if(!user) e.preventDefault();
            }} className="btn btn-ghost md:text-base sm:text-sm text-base-300">🧑‍💻 DevConnect</Link >
          </div>
          { user!=null && (<div className="flex-none gap-2">
           <div><p className=" md:text-base sm:text-sm text-base-300">Welcome, {user.firstName}</p></div>
            <div className="dropdown dropdown-end mx-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                 
                  <div className="w-10 rounded-full">
                  <img
                    alt="No image found"
                    src={user.photoUrl} />
                </div>
                
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><a onClick={changeTheme}> Theme</a></li>
                <li><a onClick={onLogout}>Logout</a></li>
              </ul>
            </div>
          </div>)}
        </div>    
    )
}

