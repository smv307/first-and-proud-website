import { NavLink } from "react-router-dom";

const Logo = () => {
    return(
        <h1 className="black-text bree-serif"><span className="rose-text">First</span> and <span className="mustard-text">Proud</span></h1>
    );
}

// update links in navbar once you have finished other parts

const Navbar = () => {
    return (
        <nav className="flex-parent istok-web">
            <ul>
                <li><NavLink to="/" className="black-text small-font">Home</NavLink></li>
                <li><NavLink to="/" className="black-text small-font">College Match</NavLink></li>
                <li><NavLink to="/" className="black-text small-font">Contact</NavLink></li>
            </ul>
        </nav>
    );
}

function Header() {
    return(
        <header className="flex-parent">
            <Logo />
            <Navbar />
        </header>
    );
}

export default Header;