import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBolt } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

// Keyframe for flipping like a coin + growing/shrinking
const flipAndPulse = keyframes`
0% { transform: rotateY(0deg) scale(1); }  
0% { transform: rotateY(0deg) scale(1); }  
  5% { transform: rotateY(45deg) scale(1.1); }  
  10% { transform: rotateY(90deg) scale(1.2); }  
  15% { transform: rotateY(135deg) scale(1.3); }  
  20% { transform: rotateY(180deg) scale(1.4); }  
  25% { transform: rotateY(225deg) scale(1.5); }  
  30% { transform: rotateY(270deg) scale(1.6); }  
  35% { transform: rotateY(315deg) scale(1.7); }  
  40% { transform: rotateY(360deg) scale(1.8); }  /* First full flip */
  45% { transform: rotateY(405deg) scale(1.9); }  
  50% { transform: rotateY(450deg) scale(2.1); }  
  55% { transform: rotateY(495deg) scale(1.9); }  
  60% { transform: rotateY(540deg) scale(1.8); }  
  65% { transform: rotateY(585deg) scale(1.7); }  
  70% { transform: rotateY(630deg) scale(1.6); }  
  75% { transform: rotateY(675deg) scale(1.3); }  
  80% { transform: rotateY(720deg) scale(1); }  /* Second full flip */  
  85% { transform: rotateY(300deg) scale(1.4); }  
  90% { transform: rotateY(324deg) scale(1.2); }  
  95% { transform: rotateY(342deg) scale(1.1); }  
  100% { transform: rotateY(360deg) scale(1); }  
`;

// Styled button with coin flipping + growing/shrinking effect on hover
const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 80px;
  height: 80px;
  background-color: rgb(117, 171, 104);
  color: black;
  font-weight: bold;
  font-size: 1.125rem;
  text-transform: uppercase;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255, 172, 78, 0.1);
  transition: all 0.3s ease-in-out;
  transform-style: preserve-3d;
  perspective: 1000px;

  /* On hover: continuously flip + grow/shrink */
  &:hover {
    animation: ${flipAndPulse} 1.5s;
    border-radius: 50%; /* Make it a circle */
    background-color: rgb(218, 179, 40);
    box-shadow: 0 6px 10px rgba(255, 159, 23, 0.5);
  }

  &:focus-visible {
    outline: 2px solid yellow;
    outline-offset: 2px;
  }
`;

// Styled icon
const PulseIcon = styled(FaBolt)`
  font-size: 2rem;
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()}>
      <PulseIcon />
    </Button>
  );
};

export default LoginButton;
