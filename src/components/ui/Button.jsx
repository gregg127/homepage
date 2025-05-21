import React from "react";
import styled from "styled-components";

const StyledButton = styled.a`
  color: white;
  text-decoration: none;
  font-weight: normal;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  background-color: var(--accent-color);
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const Button = ({ href, children }) => (
    <StyledButton href={href}>
        {children}
    </StyledButton>
);

export default Button;