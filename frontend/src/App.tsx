import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import UserDetails from "@/pages/UserDetails";
import CreateService from "./pages/CreateService";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<UserDetails />} />
      <Route path="/services" element={<CreateService />} />
      <Route path="/user" element={<CreateUser />} />
    </Routes>
  );
}

export default App;
