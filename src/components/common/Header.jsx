import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const StyledHeader = styled.div`
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: black;
    padding: 10px 15px;
    border-radius: 5px;
    transition: 0.6s;

    &:hover {
      background: rgba(100, 100, 100, 0.3);
    }
  }

  div {
    display: inline-block;
  }
`;

const StyledMenu = styled.nav`
  ul {
    font-family: "Courier Prime", monospace;
    font-weight: 400;
    font-style: normal;
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  li {
    font-size: 1.1em;
  }

  @media (max-width: 576px) {
    margin-bottom: 0;
    font-size: 1em;

    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      text-align: center;
    }

    li {
      margin: 10px;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <StyledMenu>
      <ul>
        {[
          { path: "/", label: "HOME" },
          { path: "/about", label: "ABOUT" },
          // { path: "/resume", label: "RESUME" },
          { path: "/contact", label: "CONTACT" },
        ].map(({ path, label }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </StyledMenu>
  </StyledHeader>
);

export default Header;
