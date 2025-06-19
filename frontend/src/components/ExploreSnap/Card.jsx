/* eslint-disable react/prop-types */

function Card(props) {
  return (
    <div className="cards__section">
      <div className="cards">
        {props.snaps.map((snap) => {
          return (
            <div key={snap.snapId} className="card" onClick={()=>{ props.togglePop(snap)}}> 
              <div className="card__image">
              <img
                src={snap.image}
                alt={`Snap ${snap.snapId}`}
                className="snap-image"
              />
              </div>
              <div className="card__info">
                <h4>{snap.title}</h4>
                {/*In Ethereum, values like Ether are often represented in Wei (the smallest unit of Ether). For example, 1 ETH = 10^18 Wei.
                 To make the numbers readable for humans, the ethers.formatUnits function is used to format these values into more conventional units like Ether   */}
                <p>{snap.description.slice(0, 35) + "......"}</p>
                <p><i className="ri-heart-fill"></i>{snap.likes}</p>
                <p><strong>UploadTime : </strong>{snap.timestamp}</p>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
