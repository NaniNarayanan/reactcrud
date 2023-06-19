import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import User from '../src/user/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './user/AddUser';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/user' element={<User/>}></Route>
        <Route path='/user/adduser' element={<AddUser/>}></Route>
        <Route path='/user/adduser/update/:id' element={<AddUser/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
