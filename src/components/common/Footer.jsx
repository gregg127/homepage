import React from "react";
import styled from "styled-components";
import Link from "../ui/Link";
import useSiteMetadata from "../../hooks/useSiteMetadata";

const StyledFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px 16px;
  padding: 24px 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 16px;
`;

const Footer = () => {
  const { author, social } = useSiteMetadata();

  return (
    <StyledFooter>
      <span>
        © {new Date().getFullYear()} {author}
      </span>
      <Links>
        <Link href={social.github} openInNewTab>
          GitHub
        </Link>
        <Link href={social.linkedin} openInNewTab>
          LinkedIn
        </Link>
        <Link href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf">CV</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </Links>
    </StyledFooter>
  );
};

export default Footer;
