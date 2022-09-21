import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/Login';
import Entry from './views/Entry';
import Register from './views/Register';
import Account from './views/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
