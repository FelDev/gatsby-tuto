import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    mapleSyrup: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas,
    values,
  });

  // if (message) {
  // return <p>{message}</p>;
  // }

  return (
    <>
      <SEO title="order pizza!!" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            name="mapleSyrup"
            id="mapleSyrup"
            className="mapleSyrup"
            type="text"
            value={values.mapleSyrup}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="100"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset disabled={loading}>
          <legend>Order</legend>
          {/* <label htmlFor="" /> */}
          {/* <input name="" type="text" /> */}
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error:{error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Place your order'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
