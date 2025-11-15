import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CreateContest from './pages/CreateContext';
import AdminContestDetails from './pages/ContestDetails';
import UpdateContest from './pages/UpdateContest';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        {/* ✅ Navbar is always visible */}
        <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/create-contest' element={<CreateContest/>}/>
        <Route path='/admin/contest/:id' element={<AdminContestDetails/>}/>
        <Route path='/admin/update-contest/:id' element={<UpdateContest/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
