const Grabber = () => {
  return (
    <p className="black-text bree-serif">
      Attention<br></br>
      <span className="mustard-text">Grabber</span>
      <br></br>Here
    </p>
  );
};

const button = () => {
  return <button>Learn More</button>;
};

function Landing() {
  return (
    <section>
      <Grabber />
      <div className="line"></div>
    </section>
  );
}

export default Landing;
