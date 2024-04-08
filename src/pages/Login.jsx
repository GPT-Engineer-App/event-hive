import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt", data.jwt);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
