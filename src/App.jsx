
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import ConnectionsRequest from "./components/ConnectionsRequest";
import SignUp from "./components/SignUp";
import Error from "./components/Error";
import Chat from "./components/Chat";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <div className="flex flex-col text-base-content min-h-screen ">
          <BrowserRouter basename="/">
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/error" element={<Error />} />
                  <Route path="/" element={ <PrivateRoute> <Body /> </PrivateRoute>}>
                  <Route index element={<Feed/>}></Route>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/profile/edit" element={<EditProfile/>}/>
                  <Route path="/connections" element={<Connections/>}/>
                  <Route path="/requests" element={<ConnectionsRequest/>}/>
                  <Route path="/chat/:targetUserId" element={<Chat/>}/>
                </Route>
                <Route path="*" element={<Error />} />
              </Routes>
          </BrowserRouter>
        </div>
     </Provider>
    </>
  );
}

export default App
