import { NavLink } from "react-router-dom";
import UploadSnap from "../components/UploadSnap.jsx"

const Main = () => {
  return (
    <main className="main">
      {/* <!--==================== HOME ====================--> */}
      <section className="home section" id="home">
        <div className="home__container container grid">
          <div className="home__data">
            <h1 className="home__title">
              Home for  
              <span> Memories </span>
              That
              <br />
              Last Forever. 
              <br />
            </h1>
            <p className="home__description">
              <p className="home__description">
                SnapChain uses Blockchain Technology to protect what matters most - memories.
                <br/> A space where happiness never fades.
              </p>
            </p>
          </div>
        </div>
      </section>
      <UploadSnap/>
    </main>
  );
};

export default Main;
