import { graphql } from 'gatsby';
import PizzasList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All Pizzas'
        }
        image={pizzas.image?.asset?.fluid?.src}
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzasList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  # query PizzaQuery($topping: [String]) {
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      # filter: { toppings: { elemMatch: { name: { in: $topping } } } }
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
    allSanityPerson {
      nodes {
        name
      }
    }
  }
`;
