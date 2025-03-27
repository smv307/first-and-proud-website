function Lander() {
  return (
      <article className="flex-parent">
          <section className="med-padding">
              <p className="black-text bree-serif xlarge-font">
                  Attention<br />
                  <span className="mustard-text">Grabber</span>
                  <br />Here
              </p>
              <div className="line rose-bg"></div>
              <button className="inria-sans small-font">LEARN MORE</button>
          </section>
          <figure>
              <img src="/images/placeholder1.png" alt="Placeholder Image" className="lander-img" />
          </figure>
      </article>
  );
}

function Information() {
  return (
      <article className="flex-parent">
          <figure className="med-padding">
              <img src="/images/images.png" alt="Information Image" />
          </figure>
      </article>
  );
}

export { Information, Lander };
