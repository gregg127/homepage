import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;

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

const Menu = styled.nav`
  ul {
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
    margin-bottom: 25px;
    font-size: 1.2em;

    ul {
      flex-direction: column;
      align-items: center;
    }

    li {
      margin-top: 25px;
    }
  }
`;

const Header = () => (
  <Wrapper>
    <Menu>
      <ul>
        {[
          { path: "/", label: "HOME" },
          { path: "/about", label: "ABOUT" },
          { path: "/contact", label: "CONTACT" },
          { path: "/photography", label: "PHOTOGRAPHY" },
        ].map(({ path, label }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </Menu>
  </Wrapper>
);

export default Header;
