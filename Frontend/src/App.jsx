import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx'
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import Profile from './pages/Profile.jsx';
import CreatePost from './pages/CreatePost.jsx'


const App = () =>{
    return(
        <div>
            <Routes>
                <Route path="/home" element = {<Home />} />
                <Route path="/login" element = {<UserLogin />} />
                <Route path="/signup" element = {<UserSignup />} />
                <Route path="/profile" element = {<Profile />} />
                <Route path="/create-post" element = {<CreatePost />} />

            </Routes>
        </div>
    )
}

export default App;

