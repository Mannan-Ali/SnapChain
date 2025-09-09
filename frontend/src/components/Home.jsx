import { NavLink } from "react-router-dom";


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
            <div className="home__buttons">
              <NavLink
                to="/transectMcoins"
                onClick={() => {
                  alert(
                    "\u2139 The functions Buy, Sell and Check Details are not available as it hasn't been deployed on the live test network due to insufficient test Sepolia Ether.😢"
                  );
                }}
                className="button"
              >
                <span>
                  <i className="ri-arrow-right-line"></i>
                </span>
                BUY TOKEN
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
