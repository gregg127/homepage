import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";

const About = styled.div`
  .skills-title {
    font-weight: bold;
    margin-bottom: 7px;
  }
`;

const AboutPage = () => (
  <Page>
    <About>
      <Panel title="about me">
        <div>
          I am a software engineer with a Master’s degree in Computer Science, experienced in the Java-based tech stack.
          Currently, I serve as the tech lead of a team of around 10 people developing software for the banking sector.
        </div>
      </Panel>
      <Panel title="experience">
        <div>
          Bacon ipsum dolor amet tenderloin jowl chislic filet mignon drumstick chuck, cupim cow
          kevin fatback ham bresaola meatball. Short ribs meatloaf shoulder ribeye tail pancetta
          jerky short loin filet mignon. Strip steak pancetta jerky spare ribs. Kevin fatback
          shankle meatloaf landjaeger.
        </div>
      </Panel>
      <Panel title="key skills">
        <div className="skills">
          {[
            {
              title: "Areas of expertise",
              content: "Content Management Systems, Custom software development, Backend development, Requirements analysis, Project estimation, System design"
            },
            {
              title: "Languages",
              content: "Java, Clojure, SQL, Python, JavaScript, Typescript"
            },
            {
              title: "Technologies",
              content: "Spring, Spring Boot, PostgreSQL, jOOQ, Flyway, Varnish Cache, Consul, Apache Kafka, Apache Zookeeper, Hazelcast, React JS"
            },
            {
              title: "Architecture",
              content: "Microservices, C4, Onion architecture, Anemic model"
            },
            {
              title: "DevOps",
              content: "Docker, Kubernetes, k3s, OKD, Openshift, Kustomize, Jenkins, Grafana"
            },
            {
              title: "Tools",
              content: "Linux, macOS, Intellij IDEA, Visual Studio Code, Git, Gradle"
            },
          ].map((section, index) => (
            <p key={index}>
              <div class="skills-title">{section.title}</div>
              <div>{section.content}</div>
            </p>
          ))}
        </div>
      </Panel>

      <Panel title="education">
        <div>
          Bacon ipsum dolor amet tenderloin jowl chislic filet mignon drumstick chuck, cupim cow
          kevin fatback ham bresaola meatball. Short ribs meatloaf shoulder ribeye tail pancetta
          jerky short loin filet mignon. Strip steak pancetta jerky spare ribs. Kevin fatback
          shankle meatloaf landjaeger.
        </div>
      </Panel>
      <Panel title="interests">
        <div>
          Bacon ipsum dolor amet tenderloin jowl chislic filet mignon drumstick chuck, cupim cow
          kevin fatback ham bresaola meatball. Short ribs meatloaf shoulder ribeye tail pancetta
          jerky short loin filet mignon. Strip steak pancetta jerky spare ribs. Kevin fatback
          shankle meatloaf landjaeger.
        </div>
      </Panel>
    </About>
  </Page>
);

export default AboutPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>About</title>
    </>
  );
}