import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  color: inherit;
  text-decoration: underline;

  &:hover {
    color: var(--color-text-link-hover);
  }
`;

const Link = ({ href, openInNewTab = false, children }) => (
  <StyledLink
    href={href}
    target={openInNewTab ? "_blank" : undefined}
    rel={openInNewTab ? "noopener noreferrer" : undefined}
  >
    {children}
  </StyledLink>
);

export default Link;
