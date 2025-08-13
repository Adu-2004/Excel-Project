import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route,Routes} from 'react-router-dom';
 import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import DataTable from "./components/DataTable";
import ChartHistory from './components/ChartHistory';
//import History from './pages/History';
//import AnalyzeData from './pages/AnalyzeData';
import RefrshHandler from './RefrshHandler';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [count, setCount] = useState(0)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
   return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
      <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
   
   <Routes>
    
   <Route path='/' element={<Navigate to="/Login" />} />
   <Route path="/data-table" element={<DataTable />} />
    <Route path="/history" element={<ChartHistory />} />
     <Route path='/adminlogin' element={<AdminLogin/>} />
     <Route path='/admin/dashboard' element={<AdminDashboard/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
   <Route path='/home' element={<PrivateRoute element={<Home/>}/> } />
   

 
   </Routes>
</div>

    </>
  )
}

export default App
