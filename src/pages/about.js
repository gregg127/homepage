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
    <ImagePanel title="experience" imageName="java.png" childrenDirection="left">
      <span>
        I landed my first real job as a junior developer because of some projects done at uni and blah blah blah. Then quite quickly I got promoted to a tech lead of a team consisting of bla bla blah
        Add here description like a motivational letter. Dont do any specifis because you got linkedid
      </span>
    </ImagePanel>
    <ImagePanel title="interests" imageName="java.png" childrenDirection="right">
      <span>
        Bacon ipsum dolor amet tenderloin jowl chislic filet mignon drumstick chuck, cupim cow kevin fatback ham bresaola meatball. Short ribs meatloaf shoulder ribeye tail pancetta jerky short loin filet mignon. Strip steak pancetta jerky spare ribs. Kevin fatback shankle meatloaf landjaeger.
      </span>
    </ImagePanel>
  </Page>
);

export default AboutPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>About</title>
    </>
  )
}