import myImage from "../assets/img/currency.png";
import descImg from "../assets/img/coins.png";
import { NavLink } from "react-router-dom";


const Main = () => {
  return (
    <main className="main">
      {/* <!--==================== HOME ====================--> */}
      <section className="home section" id="home">
        <div className="home__container container grid">
          <img src={myImage} alt="image" className="home__img" />

          <div className="home__data">
            <h1 className="home__title">
              SNAPS THAT LAST <br />
              <span>FOREVER</span> IN
              <br />
              EXPRESS. CONNECT. IMMORTALIZE.
              <br />
            </h1>
            <p className="home__description">
              <p className="home__description">
                Take control of your investments with a token that&apos;s built
                for the future. Offering fast, secure, and seamless transactions
                that empower your financial goals.
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
