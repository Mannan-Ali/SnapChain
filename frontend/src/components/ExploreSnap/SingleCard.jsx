/* eslint-disable react/prop-types */
import React from 'react'
import close from "../../assets/img/close.svg";
const SingleCard = (props) => {
  return (
    <div>
       <div className="product">
            <div className="product__details">
              <div className="product__image">
                <img src={props.item.image} alt="Product" />
              </div>
              <div className="product__overview">
                <hr />
                <p>{props.item.title}</p>
                <hr />
                <h2>Overview</h2>
                <p>
                  {props.item.description}
                </p>
              </div>
      
              <button onClick={props.togglePop} className="product__close">
                <img src={close} alt="Close" />
              </button>
            </div>
          </div>
    </div>
  )
}

export default SingleCard;
