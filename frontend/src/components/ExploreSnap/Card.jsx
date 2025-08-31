/* eslint-disable react/prop-types */

function Card(props) {
  const shorten = (addr = "") =>
    addr?.length > 10 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;

  const onlyDate = (ts = "") => ts.split(",")[0] || ts;

  return (
    <div className="cards__section">
      <div className="cards">
        {props.snaps.map((snap) => (
          <div
            key={snap.snapId}
            className="card"
            onClick={() => props.togglePop(snap)}
          >
            <div className="card__image">
              <img src={snap.image} alt={`Snap ${snap.snapId}`} className="snap-image" />
            </div>

            <div className="card__info">
              <h4 className="card__title">{snap.title}</h4>
              <p className="card__desc">{snap.description}</p>

              <div className="card__footer">
                <div className="card__author">
                  <div className="card__avatar">
                    <i className="ri-user-3-line" />
                  </div>
                  <div className="card__author-text">
                    <span className="card__author-name">{shorten(snap.uploader)}</span>
                    <span className="card__date">{onlyDate(snap.timestamp)}</span>
                  </div>
                </div>

                <div className="card__likes">
                  <i className="ri-heart-fill" />
                  <span>{snap.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
