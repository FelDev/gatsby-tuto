import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for the page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over pizzas and create pages for them
  data.pizzas.nodes.forEach((pizza) => {
    // console.log(`@creating a page for ${pizza.name}`);
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // console.log('@turnToppingsIntoPages');
  // 1. Get a template for the page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // slug {
  //   current
  // }
  // console.log('@toppingTemplate: ', toppingTemplate);
  // console.log('@data: ', data);

  // 3. Loop over pizzas and create pages for them
  data.toppings.nodes.forEach((topping) => {
    // console.log(`@creating a page for ${topping.name}`);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // console.log('@🍺🍺🍺🍺🍺🍺🍺Turn beers into nodes!');
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  // 1. Fetch list of beers
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
  // 2. Loop over them
  // 3. Create a node for each beer
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. Query all Slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Make individual pages for each slicemaster
  data.slicemasters.nodes.forEach((slicemaster) => {
    // console.log(`@creating a page for ${slicemaster.name}`);
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });

  // 3. Figure out how many slicmasters and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4. Loop from 1 to n and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  // create pages dynamically
  // 1. Pizzas
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
  // 2. Toppings
  // 3. Slicemasters
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);

  // fetch a list of beers and source them into the Gatsby API
}
