import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

const LG = LoadingGrid({ count: 4 });
console.log('@LG: ', LG);

function CurrentlySlicing({ slicemasters }) {
  console.log('@slicemasters: ', slicemasters);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters on</span>
      </h2>
      <p>Standing by, ready to slice you! 🩸</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {/* {!slicemasters && <LG count={4} />} */}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  console.log('@hotSlices: ', hotSlices);
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot Slices!</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}{' '}
      {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The best Pizza downtown!</h1>
      <p>Open 11:00 to 23:00 everyday</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
