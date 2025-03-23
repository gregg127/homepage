import React from "react";
import Page from "../components/Page";
import ImagePanel from "../components/ImagePanel";

const AboutPage = () => (
  <Page>
    <ImagePanel title="education" imageName="pjatk.png" childrenDirection="left">
      <span>
        I am a graduate of <a href="https://pja.edu.pl/en/">Polish-Japanese Academy of Information Technology</a> currently doing my Master's degree also in PJAIT.
      </span>
    </ImagePanel>
    <ImagePanel title="technology" imageName="java.png" childrenDirection="right">
      <span>
        Technologies that I mostly enjoy working with are Java, Kotlin, Spring Boot, PostgreSQL and Docker. I'm a fan of containerization and truly scalable microservices architecture.
      </span>
    </ImagePanel>
  </Page>
);

export default AboutPage;

export const Head = () => <title>About</title>;
