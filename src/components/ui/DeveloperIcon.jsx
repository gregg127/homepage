import React from "react";
import styled from "styled-components";
import * as Icons from "developer-icons";

const StyledIcon = styled.div`
  display: inline-block;
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  padding: 10px;
  margin: 2px;
  width: 80px;
  text-align: center;

  .icon {
    display: block;
    margin: 0 auto;
    transition: all 0.2s linear;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  .iconLabel {
    display: block;
    margin-top: 5px;
  }
`;

const DeveloperIcon = ({ iconName, label }) => {
  const Icon = Icons[iconName];
  return (
    <StyledIcon>
      <Icon size={40} className="icon" />
      <div className="iconLabel">{label}</div>
    </StyledIcon>
  );
};

export default DeveloperIcon;