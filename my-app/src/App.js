// import logo from './logo.svg';
import './App.css';
import LandingPage from './components/Landing_page'
import Login1 from './components/Login1'
import EMD from './components/EM_dashboad'
import Add from './components/Add_new_mem'
import PMD from './components/PM_dashboard'
import A from './components/A'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <LandingPage/> */}
      <PMD/>
    </div>
  );
}

export default App;
