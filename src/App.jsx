import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
return (
<> <Navbar />


  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pets" element={<Pets />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</>


);
}

export default App;
