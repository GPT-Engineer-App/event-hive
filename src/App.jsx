import React from "react";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Flex bg="gray.100" p={4} alignItems="center">
        <Box>
          <Link to="/">Home</Link>
        </Box>
        <Spacer />
        <Box>
          <Link to="/register" mr={4}>
            Register
          </Link>
          <Link to="/login">Login</Link>
        </Box>
      </Flex>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
