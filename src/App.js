import "./App.css";
import { Create } from "./Components/Create";
import { Navbar } from "./Components/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Read } from "./Components/Read";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Update } from "./Components/Update";

// import { NotFound } from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Conditionally render Navbar, not shown on Login and Signup pages */}
      {location.pathname !== "/" && location.pathname !== "/Signup" && (
        <Navbar />
      )}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Update/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />

        <Route
          path="/read"
          element={
            <ProtectedRoute>
              <Read />
            </ProtectedRoute>
          }
        />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
