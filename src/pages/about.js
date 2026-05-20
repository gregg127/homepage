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

  .cv-download {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid var(--color-text);
    border-radius: 4px;
    color: var(--color-text);
    text-decoration: none;
    transition:
      color 0.3s,
      border-color 0.3s;

    &:hover {
      color: var(--color-text-link-hover);
      border-color: var(--color-text-link-hover);
    }
  }

  .cv-download-wrapper {
    text-align: center;
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
          microservices, while continuously delivering new features and
          developing solutions to address challenges related to latency,
          throughput and scalability. Collaborated closely with clients and
          across multiple teams to deliver solutions.
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
              header: "Tech Lead, Senior Java Developer",
              date: "Jan 2023 – Sep 2025",
              list: [
                "Led development of a CMS web platform with 15+ deployed services, serving traffic for millions of users for one of the leading banks in Poland",
                "Delivered features across multiple projects in both time-and-material and fixed-price contracts, working across Waterfall and Agile methodologies",
                "Redesigned release and deployment processes, reducing error rate and developer's manual effort",
                "Drove continued decomposition of monolithic architecture into a modular monolith, with a long-term goal of microservices migration",
                "Coordinated cross-team collaboration and acted as technical point of contact for clients",
                "Led major version migrations of PostgreSQL 9.6 to 16, OKD 3 to 4 and Java 8 to 11 across multiple applications",
                "Maintained and enhanced a throttling mechanism using Apache Kafka as a message broker",
                "Analysed DDoS incidents, investigated logs, implemented traffic protection measures and fixed corresponding bugs",
                "Implemented periodic vulnerability scanning procedure with OWASP Dependency-Check and Docker image scanning with Trivy",
                "Configured SonarQube 9 quality profiles to enforce code standards across services",
              ],
            },
            {
              header: "Senior Java Developer",
              date: "May 2022 – Dec 2022",
              list: [
                "Implemented new features and contributed to decomposition of monolithic architecture into more modular components",
                "Diagnosed and resolved JVM memory leaks; performed JVM, cache and database query tuning and resolved performance bottlenecks in application code",
                "Designed SSE-based communication with frontend for parallel session handling and session count control",
                "Planned and executed load and performance tests using Gatling",
                "Configured and maintained Kubernetes environments in OKD",
                "Coordinated application releases and production deployments in collaboration with a client",
                "Participated in architecture design and technology selection",
              ],
            },
            {
              header: "Java Developer",
              date: "Sep 2020 – Apr 2022",
              list: [
                "Remediated security vulnerabilities identified in external audits and tuned circuit breaker and rate limiting mechanisms",
                "Implemented new features and contributed to client requirements analysis and refinement within an Agile team",
                "Contributed to architecture design, technology selection and solution evaluation",
                "Maintained and improved Jenkins pipelines",
                "Improved system observability with Grafana dashboards and alerts",
                "Developed and maintained automated UI test suites using Selenium",
              ],
            },
            {
              header: "Junior Java Developer",
              date: "Aug 2019 – Aug 2020",
              list: [
                "Developed and maintained the e-point CMS platform for the banking and insurance sector",
                "Implemented new CMS modules and components tailored to client requirements",
                "Worked on integrations with external systems and third-party APIs",
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
        <div className="technologies-more">... and many, many more.</div>
        <div className="cv-download-wrapper">
          <a
            href="/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf"
            className="cv-download"
            download
          >
            Download CV (PDF)
          </a>
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
    </About>
  </Page>
);

export default AboutPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>About</title>
      <meta
        name="description"
        content="About Grzegorz Gołębiowski - software engineer, tech lead, and computer science graduate."
      />
    </>
  );
}
