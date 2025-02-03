import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'


const Body = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData=useSelector(store=>store.user)

    const fetchUser = async () => {
      
      if(userData) return;
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err?.status === 401) {
          navigate("/login");
        }
      }
    };

    useEffect(() => {
      fetchUser();
    }, []);


  return (
    <>
        <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <main className="flex-1"> 
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  ) 
}


export default Body
