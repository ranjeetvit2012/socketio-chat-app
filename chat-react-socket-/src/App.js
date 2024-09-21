
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './component/Dashboard';
import Login from './component/user/Login';
import Register from './component/user/Register';
import SideDahbar from './component/layout/SideDahbar';
import  { Toaster } from 'react-hot-toast';
import UserList from './component/user/UserList';
import Message from './component/user/Message';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route  element={<SideDahbar />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/chat" element={<Message />} />
        
        
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </div>
  );
}

export default App;
