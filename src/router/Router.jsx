import { Route, Routes } from "react-router-dom";
import CreatePass from "../components/CreatePass";
import ForgotPass from "../components/ForgotPass";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import HomePage from "../components/HomePage";
import Search from "../components/Search";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot" element={<ForgotPass />} />
      <Route path="/create" element={<CreatePass />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
