/* eslint-disable react/prop-types */
import React from "react";
import close from "../../assets/img/close.svg";
// keep your existing CSS imports if you want
// import "./Masonry.css";

const SingleCard = ({ item, togglePop }) => {
  const shorten = (addr = "") =>
    addr?.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;

  return (
    <div className="product" onClick={togglePop}>
      <div className="product__details" onClick={(e) => e.stopPropagation()}>
        <div className="product__image">
          <img src={item.image} alt={item.title} />
        </div>

        <div className="product__overview">
          <button onClick={togglePop} className="product__close" aria-label="Close">
            <img src={close} alt="Close" />
          </button>

          <div className="product__meta">
            <div className="card__avatar">
              <i className="ri-user-3-line" />
            </div>
            <div className="product__who">
              <div className="product__uploader">{shorten(item.uploader)}</div>
              <div className="product__time">{item.timestamp}</div>
            </div>
          </div>

          <h2 className="product__title">{item.title}</h2>
          <p className="product__desc">{item.description}</p>

          <div className="product__actions">
            <span className="product__likes">
              <i className="ri-heart-line" />
              <span>{item.likes}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
