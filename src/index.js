import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import ReactGA from 'react-ga'; 
import ScoreCard from "./components/ScoreCard";
import RedirectRoute from "./pages/Redirect";
import AppRedirect from "./pages/AppRedirect";



ReactGA.initialize('UA-230635201-2')

ReactDOM.render(
  <div style={{backgroundColor:'black'}}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/appredirect" element={<AppRedirect />} />
      <Route path="/redirect" element={<RedirectRoute />} />
      <Route path="/bored-birdy" element={<App />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/score" element={<ScoreCard />} />
    </Routes>
  </BrowserRouter>
  </div>,
  document.getElementById("root")
);
