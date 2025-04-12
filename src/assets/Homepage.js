function Lander() {
    return (
        <article className="flex-parent" id="lander-section">
            <section className="med-padding">
                <h2 className="bree-serif black-text xlarge-font">
                    Supporting<br />
                    <span className="mustard-text">First Gen</span>
                    <br />Students
                </h2>
                <div className="line rose-bg"></div>
                <button className="inria-sans small-font">LEARN MORE</button>
            </section>
            <figure>
                <img src="./images/gradcap.png" id="lander-image" alt="Graduation cap" className="lander-img" width="100%" />
            </figure>
        </article>
    );
}

function Information() {
    return (
        <article className="flex-parent" id="info-section">
            <div className="bg-square peach-bg" style={{ top: "950px" }}></div>
            <figure>
                <img className="small-img" src="./images/members.jpg" alt="Members of First and Proud club" width="100%" height="500" />
            </figure>
            <section>
                <h3 className="bree-serif yellow-text large-font">ABOUT US</h3>
                <p className="inria-sans black-text small-font" id="information-text">We are a student-led group dedicated to uplifting and supporting first-generation college students throughout their high school journey and college application process. We host panels, workshops, and information sessions at Lick-Wilmerding High School for first-gen students and collaborate with groups like First Graduate to provide resources and guidance to students beyond Lick-Wilmerding.</p>
            </section>
        </article>
    );
}

function Contact() {
    return (
        <article className="flex-parent yellow-bg" id="contact-section">
            <section>
                <h3 className="bree-serif rose-text large-font">GET IN TOUCH</h3>
            </section>
            <section>
                <ul className="inria-sans mustard-text large-font">
                    <li className="flex-parent contact-item">
                        <img src="./images/icons/email.png" alt="Gmail logo" width="80" height="60" />
                        <p>PLACEHOLDER@GMAIL.COM</p>
                    </li>
                    <li className="flex-parent contact-item">
                        <img src="./images/icons/insta.png" alt="Instagram logo" width="80" height="80" />
                        <p>@LWHSFIRSTANDPROUD</p>
                    </li>
                </ul>
            </section>
        </article>
    );
}

const Homepage = () => {
    return(
        <main>
            <Lander />
            <Information />
            <Contact />
        </main>
    )
}

export default Homepage;

