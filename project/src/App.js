import logo from './logo.svg';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Route, Routes, Navigate} from "react-router";
import Profile from './profile';
import Header from './header';



function App() {
  return (
    <HashRouter>
    <div>
      <Header />
      <Routes>
        <Route path="/*" element={<Profile />}></Route>
      </Routes>
    </div>
    </HashRouter>
  );
}

export default App;
