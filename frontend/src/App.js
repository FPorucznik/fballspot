import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './views/Login';
import Entry from './views/Entry';
import Register from './views/Register';
import Account from './views/Account';
import MainDashboard from './views/MainDashboard';
import FriendsDashboard from './views/FriendsDashboard';
import Chats from './views/Chats';
import Watchrooms from './views/Watchrooms';
import MainLayout from './components/MainLayout';
import AuthService from './services/AuthService';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserBrowse from './views/UserBrowse';
import Notifications from './views/Notifications';
import CreatePost from './views/CreatePost';
import Chat from './views/Chat';
import Watchroom from './views/Watchroom';

function App() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={AuthService.isLoggedIn() ? <Navigate to="/main" /> : <Entry />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/main" element={<MainLayout />}>
              <Route index element={<MainDashboard />} />
              <Route path="friends_dashboard" element={<FriendsDashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="chats" element={<Chats />} />
              <Route path="watchrooms" element={<Watchrooms />} />
              <Route path="users/:username" element={<UserBrowse />} />
              <Route path="notifications/:username" element={<Notifications />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="chat/:id" element={<Chat />} />
              <Route path="watchroom/:id" element={<Watchroom />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
