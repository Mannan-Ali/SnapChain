/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const ExploreSnap = (props) => {
  const [signer, setSigner] = useState(null);
  const [snaps, setSnaps] = useState([]);

  const callSnapDisplay = async () => {
    // const test = await props.dApp.snapCount();
    // console.log(test);
    try {
      const count = await props.dApp.snapCount(); // get total snaps
      const snapArray = [];

      for (let i = 1; i < count; i++) {
        const snap = await props.dApp.snaps(i); // fetch each snap
        snapArray.push({
          snapId: i,
          uploader: snap.uploader,
          ipfsHash: snap.ipfsHash,
          likes: snap.likes.toString(),
          timestamp: new Date(Number(snap.timestamp) * 1000).toLocaleString(),
          hideVisibility: snap.hideVisibility,
        });
      }

      setSnaps(snapArray); // update state with all fetched snaps
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
                src={`https://gateway.pinata.cloud/ipfs/${snap.ipfsHash}`}
                alt={`Snap ${snap.snapId}`}
                className="snap-image"
              />
              <p>
                <strong>Uploader:</strong> {snap.uploader}
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
