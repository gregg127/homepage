import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Icon from "../components/ui/Icon";
import SectionedList from "../components/layout/SectionedList";
import Link from "../components/ui/Link";

const About = styled.div`
  .experience-company {
    margin-bottom: 10px;
  }

  .experience-entries {
    margin-left: 10px;
  }

  .technologies-list {
    text-align: center;
  }

  .technologies-more {
    margin-top: 15px;
  }

  @media only screen and (max-width: 576px) {
    .technologies-more {
      text-align: center;
    }
  }
`;

const AboutPage = () => (
  <Page>
    <About>
      <Panel title="about me">
        <div>
          Software Engineer with a Master's degree in Computer Science and
          hands-on experience in Java-based tech stack. Led a team of 10+
          members in building software for the banking sector. Experienced in
          guiding the transformation of a system from monolithic architecture to
          microservices, addressing challenges related to latency, throughput
          and scalability. Gained deep, practical knowledge through real-world
          problem-solving and system optimization. Collaborated closely with
          clients and across multiple teams to deliver solutions.
        </div>
      </Panel>

      <Panel title="experience">
        <div className="experience-company">
          <Link href="https://www.e-point.com/">
            <strong>e-point SA</strong>
          </Link>
        </div>
        <div className="experience-entries">
          {[
            {
              header: "Senior Java Developer, Tech Lead",
              date: "Jan 2023 – Sep 2025",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ],
            },
            {
              header: "Senior Java Developer",
              date: "May 2022 – Dec 2022",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ],
            },
            {
              header: "Java Developer",
              date: "Sep 2020 – Apr 2022",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ],
            },
            {
              header: "Junior Java Developer",
              date: "Aug 2019 – Aug 2020",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ],
            },
          ].map((entry, index) => (
            <SectionedList
              key={index}
              header={entry.header}
              date={entry.date}
              list={entry.list}
            />
          ))}
        </div>
      </Panel>

      <Panel title="technologies">
        <div className="technologies-list">
          {[
            { iconName: "java", label: "Java" },
            { iconName: "python", label: "Python" },
            { iconName: "clojure", label: "Clojure" },
            { iconName: "spring", label: "Spring" },
            { iconName: "postgresql", label: "PostgreSQL" },
            { iconName: "kafka", label: "Kafka" },
            { iconName: "docker", label: "Docker" },
            { iconName: "kubernetes", label: "Kubernetes" },
            { iconName: "openshift", label: "OpenShift" },
            { iconName: "jenkins", label: "Jenkins" },
            { iconName: "grafana", label: "Grafana" },
            { iconName: "javascript", label: "JavaScript" },
            { iconName: "typescript", label: "TypeScript" },
            { iconName: "react", label: "React" },
            { iconName: "linux", label: "Linux" },
            { iconName: "apple", label: "macOS" },
          ].map((tech, index) => (
            <Icon key={index} iconName={tech.iconName} label={tech.label} />
          ))}
        </div>
        <div className="technologies-more">
          ... and many, many more:{" "}
          <Link href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf">
            see resume
          </Link>
          .
        </div>
      </Panel>

      <Panel title="education">
        {[
          {
            header:
              "Polish-Japanese Academy of Information Technology, MS in Computer Science",
            date: "Sep 2020 – Jul 2023",
            list: [
              "Specialization: Mobile device network and cloud computing technologies",
              "Thesis: Neural autoencoders as support of cluster analysis of graphic data",
            ],
          },
          {
            header:
              "Polish-Japanese Academy of Information Technology, BS in Computer Science",
            date: "Sep 2016 – Jun 2020",
            list: [
              "Specialization: Robotics",
              "Thesis: Educational robotic platform",
            ],
          },
        ].map((entry, index) => (
          <SectionedList
            key={index}
            header={entry.header}
            date={entry.date}
            list={entry.list}
          />
        ))}
      </Panel>

      {/* <Panel title="interests">
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
