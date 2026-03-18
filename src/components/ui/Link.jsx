import React from "react";
import PropTypes from "prop-types";
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

Link.propTypes = {
  href: PropTypes.string.isRequired,
  openInNewTab: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Link;

