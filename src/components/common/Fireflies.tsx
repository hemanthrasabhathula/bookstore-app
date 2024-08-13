import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

// Quantity of fireflies
const quantity: number = 15;

// Keyframes for animations
const drift = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const flash = keyframes`
  0%, 30%, 100% {
    opacity: 0;
    box-shadow: 0 0 0vw 0vw yellow;
  }
  5% {
    opacity: 1;
    box-shadow: 0 0 2vw 0.4vw yellow;
  }
`;

// Function to create random move animations
const createMoveAnimation = (index: number) => keyframes`
  ${Array.from({ length: 30 }, (_, step) => (step * 100) / 30)
    .map(
      (percent) => `
    ${percent}% {
      transform: translateX(${Math.random() * 100 - 50}vw) translateY(${
        Math.random() * 100 - 50
      }vh) scale(${Math.random() * 0.75 + 0.25});
    }
  `
    )
    .join("")}
`;

// Styled component for Firefly
const FireflyStyled = styled.div<{ index: number }>`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 0.4vw;
  height: 0.4vw;
  margin: -0.2vw 0 0 9.8vw;
  animation: ${(props) => createMoveAnimation(props.index)} ease 200s alternate
    infinite;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform-origin: -10vw;
  }

  &::before {
    background: black;
    opacity: 0.4;
    animation: ${drift} ease alternate infinite;
  }

  &::after {
    background: white;
    opacity: 0;
    box-shadow: 0 0 0vw 0vw yellow;
    animation: ${drift} ease alternate infinite, ${flash} ease infinite;
    animation-duration: ${(props) => Math.random() * 10 + 8}s,
      ${(props) => Math.random() * 6000 + 5000}ms;
    animation-delay: 0ms, ${(props) => Math.random() * 8000 + 500}ms;
  }
`;

const FirefliesContainer = styled.div`
  height: 100vh;
  background: url("https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg");
  background-size: cover;
`;

interface FirefliesProps {
  children?: ReactNode;
}

const Fireflies: React.FC<FirefliesProps> = ({ children }) => {
  return (
    <FirefliesContainer>
      {Array.from({ length: quantity }).map((_, index) => (
        <FireflyStyled key={index} index={index + 1} />
      ))}
      {children}
    </FirefliesContainer>
  );
};

export default Fireflies;
