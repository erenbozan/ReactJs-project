import './App.css';
import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
import NavBar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';

function App() {
  // The App component is the main component of the application. It is the parent component of all other components.
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route
            path="/auth"
            element={
              localStorage.getItem('currentUsersId') != null ? (
                <Navigate to="/" />
              ) : (
                <Auth />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
