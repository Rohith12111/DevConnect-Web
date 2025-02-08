
import { SendHorizontal, SmilePlus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { createSocketConnection } from "../utils/socket"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { addTargetUser } from "../store/chatSlice"


const Chat = () => {

   const [userMessage,setUserMessage]=useState("");
   const [chat,setChat]=useState([]);
   const user=useSelector(store=>store.user)
   const {targetUserId}=useParams();
   const userId=user?._id
   const chatContainerRef = useRef(null);
   const dispatch=useDispatch()
   const connection=useSelector(store=>store.connection)
   const targetUser=useSelector(store=>store.chat)


    useEffect(() => {
      getTargetUserProfile()
      getMessages();
    },[]);

    useEffect(() => {
        const scrollToBottom = () => {
            chatContainerRef.current?.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        };
        scrollToBottom();
    }, [chat]);
   
    useEffect(() => {
      if (!userId) return;
      const socket = createSocketConnection();

      socket.emit("joinChat", { userId, targetUserId});

      socket.on("messageReceived", ({ firstName, lastName, text, url }) => {
        setChat((chat) => [...chat, { firstName, lastName, text, url }]);
      });

      return () => {
        socket.disconnect();
      };
    }, [userId, targetUserId, user]);

    
    const getTargetUserProfile=async()=>{
        const targetUserProfile=connection.find((conn)=>conn._id===targetUserId);
        dispatch(addTargetUser(targetUserProfile)) 
    }
    

    
    const getMessages=async()=>{

        try {
            const usersChat=await axios.get(BASE_URL+`/chat/${targetUserId}`,{withCredentials:true})
            const chatMessages=usersChat.data?.textMessages.messages.map((userChat)=>{
                const {senderId,text}=userChat; 
                return{
                    id:senderId._id,
                    firstName:senderId?.firstName,
                    lastName:senderId?.lastName,
                    text,
                }
            })
            setChat(chatMessages)
        } catch (error) {
            console.log(error)
        }

    }

    function handleSend()
    {
        const socket=createSocketConnection();
        socket.emit("sendMessage",{
            firstName:user.firstName,
            lastName:user.lastName,
            userId,
            targetUserId,
            text:userMessage
        })
        setUserMessage("");
    }
    
   
    function handleEmoji() {
       
        
    }

    return (
        <div className="flex flex-col px-2 max-w-md  sm:max-w-md md:max-w-lg lg:max-w-xl items-center mx-auto justify-center flex-wrap ">

            <div className="container justify-center outline-double outline-4 rounded-xl mt-10">
            { targetUser && <div className="flex items-center gap-3 p-3 border-b">
                <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-success ring-offset-2">
                        <img 
                            src={targetUser.photoUrl} 
                            alt={targetUser.firstName}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold font-mono">{targetUser?.firstName} {targetUser?.lastName}</h2>
                    <p className="text-xs opacity-70 text-success font-semibold">Active Now</p>
                </div>
            </div>}
                <div ref={chatContainerRef} className="px-4 h-[65vh] overflow-y-auto scrollbar-none">
                    {chat &&  chat.map((message,index)=>(<div key={index}>
                        {  <div className={`chat mt-2  ${message.firstName===user.firstName ? "chat-end" :"chat-start"}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                    <img
                                        alt="Profile Img"
                                        src={message.firstName===user.firstName ? user.photoUrl: targetUser.photoUrl} />
                                    </div>
                                </div>
                                <div className="chat-bubble chat-bubble-info">{message.text}</div>
                            </div>
                        } 
                    </div>))}
                </div>
                <div className="flex gap-2 p-3">
                    <button onClick={handleEmoji} className="btn btn-sm btn-warning"> <SmilePlus strokeWidth={2.5} className="h-6 w-6"/> </button>
                    <input onChange={(e)=>setUserMessage(e.target.value)} value={userMessage} 
                     onKeyDown={(e) => e.key === 'Enter' && handleSend()} type="text" className="ring-2  focus:outline-primary  border-none text-right font-semibold input flex-1 input-sm "/> 
                    <button onClick={handleSend} className="btn btn-sm btn-success"><SendHorizontal className="h-6 w-6" /></button>
                </div>
            </div>
        
        </div>
    )
}

export default Chat
