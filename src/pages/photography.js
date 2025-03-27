import React from "react";
import { graphql } from 'gatsby'
import styled from "styled-components";
import Page from "../components/Page";
import Panel from "../components/Panel";
import Gallery from '@browniebroke/gatsby-image-gallery'

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .ril-toolbar.ril__toolbar {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .ril__toolbarRightSide {
    padding-left: 12px !important;
    padding-right: 12px !important;
    background-color: rgba(0, 0, 0, 0.2) !important;
  }
`;

const GalleryWrapper = styled.div`
  max-width: 80%;
  margin: auto;
`;

const PhotographyPage = ({ data }) => (
  <Page>
    <GlobalStyle />
    <Panel title="photography gallery">
      <span>some photos I took with my analog camera</span>
    </Panel>
    <GalleryWrapper>
      <Gallery images={data.allFile.edges.map(({ node }) => node.childImageSharp)} />
    </GalleryWrapper>
  </Page>
);

export default PhotographyPage;

export const photographyQuery = graphql`
{
  allFile(
    filter: {extension: {regex: "/(jpg)|(jpeg)/"}, relativeDirectory: {eq: "photos"}}
  ) {
    edges {
      node {
        childImageSharp {
          thumb: gatsbyImageData(width: 400, height: 265, placeholder: BLURRED)
          full: gatsbyImageData(layout: FULL_WIDTH, quality: 100)
        }
      }
    }
  }
}
`

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>Photography</title>
    </>
  )
}
