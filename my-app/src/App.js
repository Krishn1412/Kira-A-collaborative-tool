// import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing_page'
import EMD from './components/EM_dashboad'
import Add from './components/Add_new_mem'
import PMD from './components/PM_dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MMD from './components/Mem_Dashboard'
import pmLogin from './components/Pm_login'
import memLogin from './components/Mem_login'
import emLogin from './components/EM_login'
import A from './components/A'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/EM_login" element={<emLogin />} />
        <Route path="/PM_login" element={<pmLogin />} />
        <Route path="/Mem_login" element={<memLogin />} />
      </Routes>
    </BrowserRouter>
      {/* <LandingPage/> */}
      {/* <PMD/> */}
      {/* <Login1/> */}
    </div>
  );
}

export default App;
