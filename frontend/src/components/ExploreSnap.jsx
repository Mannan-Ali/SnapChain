/* eslint-disable react/prop-types */
import { useState,} from "react";
import { useOutletContext } from "react-router-dom";

const ExploreSnap = () => {
    const { dApp } = useOutletContext();
  const [lastSnapLoaded, setLastSnapLoaded] = useState(1);
  const [snaps, setSnaps] = useState([]);

  const callSnapDisplay = async () => {
    // const test = await props.dApp.snapCount();
    // console.log(test);

    try {
      const count = Number(await dApp.snapCount()); // get total snaps
      const snapArray = [];

      for (let i = count; i >= lastSnapLoaded; i--) {
        const snap = await dApp.snaps(i); // fetch each snap

        const metaURL = `https://gateway.pinata.cloud/ipfs/${snap.ipfsHash}`;
        const response = await fetch(metaURL);
        const meta = await response.json();

        snapArray.push({
          snapId: i,
          uploader: snap.uploader,
          title: meta.title,
          image: meta.image,
          description: meta.description,
          likes: snap.likes.toString(),
          timestamp: new Date(Number(snap.timestamp) * 1000).toLocaleString(),
          hideVisibility: snap.hideVisibility,
        });
      }

      setSnaps((prev) => [...prev, ...snapArray]); 
      setLastSnapLoaded(count+1); // update index
    } catch (error) {
      console.error("Error fetching snaps:", error);
    }
  };
  return (
    <section className="desc section" id="desc">
      <h2 className="section__title">Snaps here Enjoy</h2>
      <button className="button" onClick={callSnapDisplay}>
        Click
      </button>
      <div className="snap-list">
        {snaps.length === 0 ? (
          <p>No snaps found.</p>
        ) : (
          snaps.map((snap) => (
            <div key={snap.snapId} className="snap-card">
              <img
                src={snap.image}
                alt={`Snap ${snap.snapId}`}
                className="snap-image"
              />
              <p>
                <strong>Uploader:</strong> {snap.uploader}
              </p>
              <p>
                <strong>Title:</strong> {snap.title}
              </p>
              <p>
                <strong>Description:</strong> {snap.description}
              </p>
              <p>
                <strong>Likes:</strong> {snap.likes}
              </p>
              <p>
                <strong>Timestamp:</strong> {snap.timestamp}
              </p>
              <p>
                <strong>Visibility:</strong>{" "}
                {snap.hideVisibility ? "Hidden" : "Visible"}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ExploreSnap;
