/* eslint-disable react/prop-types */
import { useState,useEffect,useRef} from "react";
import { useOutletContext } from "react-router-dom";

//components

import Card from "./Card";
import SingleCard from "./SingleCard";

const ExploreSnap = () => {
  const { dApp } = useOutletContext();
  const [snaps, setSnaps] = useState([]);
  const [lastSnapLoaded, setLastSnapLoaded] = useState(0);
  const hasFetched = useRef(false); 


  const [item, setitem] = useState(null);
  //if true go to the product page
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    // this item is the single product from the section.jsx part
    setitem(item);
    //if we are on the page then go back and if are not then go on the page
    toggle ? setToggle(false) : setToggle(true);
  };
  const callSnapDisplay = async () => {
    try {
      const count = Number(await dApp.snapCount());
      const snapArray = [];

      for (let i = count; i > lastSnapLoaded; i--) {
        const snap = await dApp.snaps(i);
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

      setSnaps((prev) => [...snapArray, ...prev]);
      setLastSnapLoaded(count);
    } catch (error) {
      console.error("Error fetching snaps:", error);
    }
  };

  useEffect(() => {
    if (dApp && !hasFetched.current) {
      hasFetched.current = true;
      callSnapDisplay();
    }
  }, [dApp]);
  return (
    <section className="desc section" id="desc">
      <h2 className="section__title">Snaps here Enjoy</h2>
      <div className="snap-list">
        {snaps.length === 0 ? (
          <p>No snaps found.</p>
        ) : 
        (<div>
          <Card snaps ={snaps} togglePop={togglePop}/>
        </div>)}
      </div>
        {toggle && (<SingleCard item ={item} togglePop={togglePop}/>)
      }
    </section>
  );
};

export default ExploreSnap;
// (
//           snaps.map((snap) => (
//             <div key={snap.snapId} className="snap-card">
//               <img
//                 src={snap.image}
//                 alt={`Snap ${snap.snapId}`}
//                 className="snap-image"
//               />
//               <p>
//                 <strong>Uploader:</strong> {snap.uploader}
//               </p>
//               <p>
//                 <strong>Title:</strong> {snap.title}
//               </p>
//               <p>
//                 <strong>Description:</strong> {snap.description}
//               </p>
//               <p>
//                 <strong>Likes:</strong> {snap.likes}
//               </p>
//               <p>
//                 <strong>Timestamp:</strong> {snap.timestamp}
//               </p>
//               <p>
//                 <strong>Visibility:</strong>{" "}
//                 {snap.hideVisibility ? "Hidden" : "Visible"}
//               </p>
//             </div>
//           ))
//         )