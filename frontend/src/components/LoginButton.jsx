import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBolt } from "react-icons/fa";
import styled from "styled-components";

// Styled Button
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: rgb(117, 171, 104);
  color: black;
  font-weight: bold;
  font-size: 1.125rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255, 172, 78, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgb(218, 179, 40);
    box-shadow: 0 6px 10px rgba(255, 159, 23, 0.5);
  }

  &:focus-visible {
    outline: 2px solid yellow;
    outline-offset: 2px;
  }
`;

const PulseIcon = styled(FaBolt)`
  font-size: 2rem;
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Button onClick={handleLogin}>
      <PulseIcon />
    </Button>
  );
};

export default LoginButton;
