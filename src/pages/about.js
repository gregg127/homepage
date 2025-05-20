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
      {/* <Panel title="experience">
        <div>
          Bacon ipsum dolor amet tenderloin jowl chislic filet mignon drumstick chuck, cupim cow
          kevin fatback ham bresaola meatball. Short ribs meatloaf shoulder ribeye tail pancetta
          jerky short loin filet mignon. Strip steak pancetta jerky spare ribs. Kevin fatback
          shankle meatloaf landjaeger.
        </div>
      </Panel> */}
      <Panel title="key skills">
        <div className="skills">
          {[
            {
              title: "Areas of expertise",
              content: "Content management systems, custom software development, requirements analysis, project estimation, system design and architecture, backend development"
            },
            {
              title: "Programming languages",
              content: "Java, Clojure, SQL, Python, JavaScript, Typescript"
            },
            {
              title: "Technologies",
              content: "Spring, Spring Boot, Jakarta EE, WildFly, JBoss EAP, Hazelcast, PostgreSQL, jOOQ, Flyway, Varnish Cache, Consul, Apache Kafka, Apache Zookeeper, Solr, Quartz, Swagger, React JS, Gatsby SSR"
            },
            {
              title: "Architecture",
              content: "Microservices, C4 model, onion architecture, anemic and rich domain models"
            },
            {
              title: "DevOps",
              content: "Docker, Kubernetes, k3s, OKD, Openshift, Kustomize, Jenkins, Grafana, Sonatype Nexus Repository"
            },
            {
              title: "Tools",
              content: "Linux, macOS, Intellij IDEA, Visual Studio Code, Git, Gradle, SonarQube, OWASP Dependency-Check"
            },
            {
              title: "Leadership",
              content: "Blake and Mouton Managerial Grid Model, Blanchard Situational Leadership Model, Start-Stop-Continue feedback"
            },
            {
              title: "Languages",
              content: "Polish (native), English (C1)"
            }
          ].map((section, index) => (
            <p key={index}>
              <div class="skills-title">{section.title}</div>
              <div>{section.content}</div>
            </p>
          ))}
        </div>
      </Panel>

      {/* <Panel title="education">
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
      </Panel> */}
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