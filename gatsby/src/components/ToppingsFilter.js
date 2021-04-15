import { graphql, useStaticQuery, Link, navigate } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 5px;
      /* 5px: ; */
    }
    /* &.active { */
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  console.log('@pizzas: ', pizzas);

  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if it exists.
      // if yes, +1 else new entry at 1
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        acc[topping.id].count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  return Object.values(counts).sort();
}

export default function ToppingsFilter({ activeTopping }) {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      # toppings: allSanityTopping {
      #   nodes {
      #     name
      #     id
      #     vegetarian
      #   }
      # }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();
  console.log('@toppings : ', toppings);
  // console.log('@pizzas: ', pizzas);

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log('@toppingsWithCounts: ', toppingsWithCounts);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
