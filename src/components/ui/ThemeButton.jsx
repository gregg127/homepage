import React from "react";
import styled from "styled-components";

const StyledThemeButton = styled.div`
  display: flex;
  max-height: 50px;
  max-width: 50px;

  button {
    background: none;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;

    &:hover {
      transition: background 0.5s;
      background: var(--secondary-color);
    }
  }

  img {
    height: 100%;
    width: 100%;
  }

  .moon {
    filter: invert(100%) sepia(23%) saturate(1%) hue-rotate(8deg)
      brightness(102%) contrast(102%);
  }
`;

const THEME_KEY = "theme";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const THEME_PROPERTIES = {
  [LIGHT_THEME]: {
    "--color-text": "var(--light-color-text)",
    "--color-text-accent": "var(--light-color-text-accent)",
    "--color-background": "var(--light-color-background)",
    "--secondary-color": "var(--light-secondary-color)",
  },
  [DARK_THEME]: {
    "--color-text": "var(--dark-color-text)",
    "--color-text-accent": "var(--dark-color-text-accent)",
    "--color-background": "var(--dark-color-background)",
    "--secondary-color": "var(--dark-secondary-color)",
  },
};

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return LIGHT_THEME;
  }
  return window.localStorage.getItem(THEME_KEY) ?? LIGHT_THEME;
};

const ThemeButton = () => {
  const [isClient, setClient] = React.useState(false);
  const [theme, setTheme] = React.useState(getStoredTheme());

  React.useEffect(() => {
    setClient(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((current) => (current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  }, []);

  React.useEffect(() => {
    const properties = THEME_PROPERTIES[theme];
    Object.entries(properties).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const isDark = theme === DARK_THEME;

  if (!isClient) return null;
  return (
    <StyledThemeButton>
      <button onClick={toggleTheme}>
        <img
          className={isDark ? "moon" : "sun"}
          src={
            isDark
              ? "/icons/moon-svgrepo-com.svg"
              : "/icons/sun-svgrepo-com.svg"
          }
          alt={isDark ? "switch to light theme" : "switch to dark theme"}
        />
      </button>
    </StyledThemeButton>
  );
};

export default ThemeButton;
