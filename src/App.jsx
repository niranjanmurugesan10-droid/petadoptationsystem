import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Pets from "./pages/Pets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddPet from "./pages/AddPet";
import ManagePets from "./pages/ManagePets";
import MyRequests from "./pages/MyRequests";
import ReceivedRequests from "./pages/ReceivedRequests";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route path="/pets" element={<Pets />} />
<Route path="/add-pet" element={<AddPet />} />

<Route path="/my-pets" element={<ManagePets />} />
<Route path="/manage-pets" element={<ManagePets />} />

<Route path="/my-requests" element={<MyRequests />} />
<Route path="/received-requests" element={<ReceivedRequests />} />


      </Routes>
    </>
  );
}

export default App;