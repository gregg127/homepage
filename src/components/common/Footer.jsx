import React from "react";
import styled from "styled-components";
import Link from "../ui/Link";

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

const Footer = () => (
  <StyledFooter>
    <span>© {new Date().getFullYear()} Grzegorz Gołębiowski</span>
    <Links>
      <Link href="https://github.com/gregg127" openInNewTab>
        GitHub
      </Link>
      <Link
        href="https://www.linkedin.com/in/grzegorz-golebiowski"
        openInNewTab
      >
        LinkedIn
      </Link>
      <Link href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf" download>
        CV
      </Link>
      <Link href="/privacy">Privacy Policy</Link>
    </Links>
  </StyledFooter>
);

export default Footer;
