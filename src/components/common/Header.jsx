import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import ThemeButton from "../ui/ThemeButton.jsx";

const StyledHeader = styled.div`
  a {
    display: inline-block;
    text-decoration: none;
    color: var(--color-text);
    padding: 3px 5px;
    margin: 0px 10px;
    background-image: linear-gradient(var(--color-text-link-hover) 0 0);
    background-position: bottom left;
    background-size: 0% 1px;
    background-repeat: no-repeat;
    transition:
      background-size 0.3s,
      background-position 0s 0.3s;

    &:hover {
      color: var(--color-text-link-hover);
      background-position: bottom right;
      background-size: 100% 1px;
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
    background-size: 100% 1px;
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
      margin: 5px 20px;
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
          { path: "/contact", label: "CONTACT" },
        ].map(({ path, label }) => (
          <li key={path}>
            <Link className="link" activeClassName="active" to={path}>
              {label}
            </Link>
          </li>
        ))}
        <li>
          <a
            className="link"
            href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </li>
      </ul>
    </StyledMenu>
    <div className="theme-button">
      <ThemeButton />
    </div>
  </StyledHeader>
);

export default Header;
