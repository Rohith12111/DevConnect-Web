
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {

  return (
    <>
      <Provider store={appStore}>
        <div className="flex flex-col text-base-content min-h-screen ">
          <BrowserRouter basename="/">
              <Routes>
                <Route path="/error" element={<Error/>}/>
                <Route path="/" element={<Body/>}>
                  <Route path="/" element={<Feed/>}></Route>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/profile/edit" element={<EditProfile/>}/>
                  <Route path="/connections" element={<Connections/>}/>
                  <Route path="/requests" element={<ConnectionsRequest/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
                </Route>
              </Routes>
           
          </BrowserRouter>
        </div>
     </Provider>
    </>
  );
}

export default App
