import React from "react";
import styled from "styled-components";

const StyledSectionedList = styled.div`
  margin-bottom: 15px;

  .section-date {
    font-style: italic;
    color: var(--color-text-light);
  }

  .section-list {
    list-style-type: disc;
    margin-top: 8px;
  }
`;

const SectionedList = ({ header, date, list }) => (
    <StyledSectionedList>
        <div>
            <strong>{header}</strong>
        </div>
        <div className="section-date">{date}</div>
        <ul className="section-list">
            {list.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </StyledSectionedList>
);

export default SectionedList;