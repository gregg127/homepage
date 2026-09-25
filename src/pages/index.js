import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Seo from "../components/common/Seo";
import useSiteMetadata from "../hooks/useSiteMetadata";

const Intro = styled.div`
  font-size: 1.2em;
  .introContent {
    text-align: center;
  }
  .video {
    margin-top: 30px;
    video {
      border-radius: 8px;
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
    }
  }
  @media only screen and (max-width: 576px) {
    .introContent {
      text-align: left;
    }
    .title {
      display: block;
    }
    .divider {
      display: none;
    }
  }
`;

const IndexPage = () => (
  <Page>
    <Intro>
      <Panel title="GRZEGORZ GOŁĘBIOWSKI" as="h1">
        <div className="introContent">
          <span className="title">computer science graduate</span>
          <span className="divider"> | </span>
          <span className="title">software engineer</span>
          <span className="divider"> | </span>
          <span className="title">tech lead</span>
          <div className="video">
            <video
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
              playsInline="playsinline"
            >
              <source src="jin_yang_handshake.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Panel>
    </Intro>
  </Page>
);

export default IndexPage;

export function Head() {
  const { author, jobTitle, email, siteUrl, social } = useSiteMetadata();
  const [firstName, lastName] = author.split(" ");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    url: `${siteUrl}/`,
    jobTitle,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Polish-Japanese Academy of Information Technology",
    },
    sameAs: [social.github, social.linkedin],
    email,
  };

  return (
    <Seo pathname="/" ogType="profile">
      <meta property="profile:first_name" content={firstName} />
      <meta property="profile:last_name" content={lastName} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
    </Seo>
  );
}
