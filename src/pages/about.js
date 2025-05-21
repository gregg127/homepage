import React from "react";
import styled from "styled-components";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";
import Button from "../components/ui/Button";
import DeveloperIcon from "../components/ui/DeveloperIcon";
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
          Software Engineer with a Master's degree in Computer Science and hands-on experience
          in Java-based tech stack. Leading a team of 10 in building software
          for banking sector. Actively guiding the transformation of a monolithic architecture
          into microservices, addressing challenges related to latency, throughput and system
          scaling. Gained deep, practical knowledge through real-world problem-solving and system
          optimization.
        </div>
      </Panel>

      <Panel title="experience">
        <div className="experience-company">
          <Link href="https://www.e-point.com/"><strong>e-point SA</strong></Link>
        </div>
        <div className="experience-entries">
          {[
            {
              header: "Senior Java Developer, Tech Lead",
              date: "Jan 2023 – Present",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ]
            },
            {
              header: "Senior Java Developer",
              date: "May 2022 – Dec 2022",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ]
            },
            {
              header: "Java Developer",
              date: "Sep 2020 – Apr 2022",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ]
            },
            {
              header: "Junior Java Developer",
              date: "Aug 2019 – Aug 2020",
              list: [
                // "TODO",
                // "TODO",
                // "TODO"
              ]
            }
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
            { iconName: "Java", label: "Java" },
            { iconName: "Spring", label: "Spring" },
            { iconName: "PostgreSQL", label: "PostgreSQL" },
            { iconName: "Docker", label: "Docker" },
            { iconName: "Kubernetes", label: "Kubernetes" },
            { iconName: "Jenkins", label: "Jenkins" },
            { iconName: "Grafana", label: "Grafana" },
            { iconName: "Apache", label: "Kafka" },
            { iconName: "JavaScript", label: "JavaScript" },
            { iconName: "TypeScript", label: "TypeScript" },
            { iconName: "React", label: "React" },
            { iconName: "Gatsby", label: "Gatsby" },
            { iconName: "Linux", label: "Linux" },
            { iconName: "AppleDark", label: "iOS" },
            { iconName: "Python", label: "Python" },
            { iconName: "Bash", label: "Bash" }
          ].map((tech, index) => (
            <DeveloperIcon key={index} iconName={tech.iconName} label={tech.label} />
          ))}
        </div>
        <div className="technologies-more">
          ... and many, many more: <Button href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf">Resume</Button>
        </div>
      </Panel>

      <Panel title="education">
        {[
          {
            header: "Polish-Japanese Academy of Information Technology, MS in Computer Science",
            date: "Sep 2020 – Jul 2023",
            list: [
              "Specialization: Mobile device network and cloud computing technologies",
              "Thesis: Neural autoencoders as support of cluster analysis of graphic data"
            ]
          },
          {
            header: "Polish-Japanese Academy of Information Technology, BS in Computer Science",
            date: "Sep 2016 – Jun 2020",
            list: [
              "Specialization: Robotics",
              "Thesis: Educational robotic platform"
            ]
          }
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
  </Page >
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