import { Link, graphql } from 'gatsby';

import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';

const SlicemastersGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemastersStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin-top: -6rem;
    position: relative;
    transform: rotate(1deg);
    z-index: 2;
    text-align: center;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <SEO title={`slicemasters - Page ${pageContext.currentPage}`} />

      <Pagination
        pageSize={process.env.GATSBY_PAGE_SIZE}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemastersGrid>
        {slicemasters.map((person) => (
          <SlicemastersStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SlicemastersStyles>
        ))}
      </SlicemastersGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
