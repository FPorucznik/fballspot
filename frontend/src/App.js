import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/Login';
import Entry from './views/Entry';
import Register from './views/Register';
import Account from './views/Account';
import MainDashboard from './views/MainDashboard';
import FriendsDashboard from './views/FriendsDashboard';
import Chats from './views/Chats';
import Watchrooms from './views/Watchrooms';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Entry />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/main_dashboard" element={<MainDashboard />} />
            <Route path="/friends_dashboard" element={<FriendsDashboard />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/watchrooms" element={<Watchrooms />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
