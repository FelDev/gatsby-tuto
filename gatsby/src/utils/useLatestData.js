import { useEffect, useState } from 'react';

const gql = String.raw;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // use a side effect to fetch the data from the graphql endpoint
  useEffect(function () {
    // when the component loads, fetch the data
    console.log('@useEffect');
    console.log(
      '@process.env.GATSBY_GRAPHQL_ENDPOINT,: ',
      process.env.GATSBY_GRAPHQL_ENDPOINT
    );

    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
              }
              hotSlices {
                name
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const storeSettings = res.data.StoreSettings;
        // check for errors
        setHotSlices(storeSettings.hotSlices);
        setSlicemasters(storeSettings.slicemaster);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
