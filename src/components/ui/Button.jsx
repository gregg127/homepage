import React from "react";
import styled from "styled-components";

const StyledButton = styled.a`
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid var(--color-secondary);
  border-radius: 8px;
  color: var(--color-text);
  text-decoration: none;
  transition:
    color 0.3s,
    border-color 0.3s;

  &:hover {
    color: var(--color-text-link-hover);
    border-color: var(--color-text-link-hover);
  }
`;

const Button = ({ href, openInNewTab = false, download = false, children }) => (
  <StyledButton
    href={href}
    target={openInNewTab ? "_blank" : undefined}
    rel={openInNewTab ? "noopener noreferrer" : undefined}
    download={download || undefined}
  >
    {children}
  </StyledButton>
);

export default Button;
