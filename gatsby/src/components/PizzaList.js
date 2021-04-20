import { Link, navigate } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-row: span 3;
  h2,
  p {
    margin: 0;
  }
  /* gap: 4rem; */
  /* grid-auto-rows: auto auto 500px; */
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        {/* <Img fixed={pizza.image.asset.fixed} alt={pizza.name} /> */}
      </Link>
    </PizzaStyles>
  );
}

export default function PizzasList({ pizzas }) {
  // const pizzas = data.pizzas.nodes;
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
      <p>Hey! There are {pizzas.length} pizzas!</p>
    </PizzaGridStyles>
  );
}
