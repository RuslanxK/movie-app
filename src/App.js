import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Movies from "./components/Movies";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import Members from "./components/Members";
import EditMember from "./components/EditMember";
import AddMember from "./components/AddMember";
import SpecificMovie from "./components/SpecificMovie";
import Register from "./components/Register";
import Header from "./components/Header";
import "./index.scss";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";



function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" || location.pathname === "/register" ? null : (
        <Header />
      )}


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="movies" element={<Movies />} />
        <Route path="addmovie" element={<AddMovie />} />
        <Route path="editmovie/:id" element={<EditMovie />} />
        <Route path="members" element={<Members />} />
        <Route path="member/:name" element={<Members/>} />
        <Route path="editmember/:id" element={<EditMember />} />
        <Route path="addmember" element={<AddMember />} />
        <Route path="movie/:id" element={<SpecificMovie />} />
        
      </Routes>

      {location.pathname === "/" || location.pathname === "/register" ? null : (
        <Footer />
      )}
    </div>
  );
}

export default App;
