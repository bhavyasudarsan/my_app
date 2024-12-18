import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Location from './Location';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">

      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home Page */}
            <Route path="/location/:id" element={<Location />} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
