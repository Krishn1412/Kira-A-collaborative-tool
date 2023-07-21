// import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing_page'
import EMD from './components/EM_dashboad'
import Add_mem from './components/Add_new_mem'
import PMD from './components/PM_dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MMD from './components/Mem_Dashboard'
import PmLogin from './components/Pm_login'
import MemLogin from './components/Mem_login'
import EmLogin from './components/EM_login'
import A from './components/A'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/EM_login" element={<EmLogin />} />
        <Route path="/PM_login" element={<PmLogin />} />
        <Route path="/Mem_login" element={<MemLogin />} />
        <Route path="/EM_Dashboard" element={<EMD />} />
        <Route path="/PM_Dashboard" element={<PMD />} />
        <Route path="/Mem_Dashboard" element={<MMD />} />
        <Route path="/add_mem" element={<Add_mem />} />
      </Routes>
    </BrowserRouter>
      {/* <LandingPage/> */}
      {/* <PMD/> */}
      {/* <Login1/> */}
    </div>
  );
}

export default App;
