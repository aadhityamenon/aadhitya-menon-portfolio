import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ApiDemo from "./pages/ApiDemo";
import Footer from "./components/Footer"


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/api-demo" element={<ApiDemo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;