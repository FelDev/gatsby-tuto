import useLatestData from '../utils/useLatestData';

function CurrentlySlicing(slicemasters) {
  return (
    <div>
      <p>CurrentlySlicing</p>
    </div>
  );
}
function HotSlices(hotSlices) {
  return (
    <div>
      <p>HotSlices</p>
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The best Pizza downtown!</h1>
      <p>Open 11:00 to 23:00 everyday</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
