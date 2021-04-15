import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  return (
    <div>
      <Img fluid={slicemaster.image.asset.fluid} />
      <div>
        <h2 className="mark">{slicemaster.name}</h2>
        <p>{slicemaster.description}</p>
      </div>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
