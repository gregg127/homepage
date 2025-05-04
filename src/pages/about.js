import React from "react";
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";

const About = styled.div`
  .skills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .skills-section {
    flex: 1 1 calc(33.333%);
    box-sizing: border-box;
    text-align: center;
    margin: 0;
  }

  .skills-title {
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 10px;
  }

  .skills-list {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
  }

  @media only screen and (max-width: 576px) {
    .skills {
      flex-direction: column;
    }

    .skills-section {
      text-align: left;
      flex: 1 1 100%;
    }

    .skills-list {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
      list-style-type: disc;
    }
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
              items: [
                "Content Management Systems",
                "Custom software development",
                "Backend development",
                "Requirements analysis",
                "Project estimation",
                "System design",
              ],
            },
            {
              title: "Languages",
              items: [
                "Java",
                "Clojure",
                "SQL",
                "Python",
                "JavaScript",
                "Typescript"
              ],
            },
            {
              title: "Technologies",
              items: [
                "Spring",
                "Spring Boot",
                "PostgreSQL",
                "jOOQ",
                "Flyway",
                "Varnish Cache",
                "Consul",
                "Apache Kafka",
                "Apache Zookeeper",
                "Hazelcast",
                "React JS",
              ],
            },
            {
              title: "Architecture",
              items: [
                "Microservices",
                "C4",
                "Onion architecture",
                "Anemic model"],
            },
            {
              title: "DevOps",
              items: [
                "Docker",
                "Kubernetes",
                "k3s",
                "OKD",
                "Openshift",
                "Kustomize",
                "Jenkins",
                "Grafana",
              ],
            },
            {
              title: "Tools",
              items: [
                "Linux",
                "macOS",
                "Intellij IDEA",
                "Visual Studio Code",
                "Git",
                "Gradle"
              ],
            },
          ].map((section, index) => (
            <div key={index} className="skills-section">
              <span className="skills-title">{section.title}</span>
              <ul className="skills-list">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
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