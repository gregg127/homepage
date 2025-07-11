import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import ThemeButton from "../ui/ThemeButton.jsx";

const StyledHeader = styled.div`
  a {
    text-decoration: none;
    color: var(--color-text);
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.5s;

    &:hover {
      background: var(--secondary-color);
    }
  }

  .theme-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const StyledMenu = styled.nav`
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;

  ul {
    font-family: "Courier Prime", monospace;
    font-weight: 400;
    font-style: normal;
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .active {
    background-color: var(--secondary-color);
  }

  li {
    font-size: 1.1em;
  }

  .link:focus {
    outline-offset: 0px;
  }

  @media (max-width: 576px) {
    margin-bottom: 0;
    font-size: 1em;

    ul {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 5px;
      text-align: left;
    }

    li {
      margin: 10px;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <StyledMenu>
      <nav>
        <ul>
          {[
            { path: "/", label: "HOME" },
            { path: "/about", label: "ABOUT" },
            { path: "/resume", label: "RESUME" },
            { path: "/contact", label: "CONTACT" },
          ].map(({ path, label }) => (
            <li key={path}>
              <Link class="link" activeClassName="active" to={path}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledMenu>
    <div className="theme-button">
      <ThemeButton />
    </div>
  </StyledHeader>
);

export default Header;
